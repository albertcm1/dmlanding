"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "error-callback": () => void; }) => void };
  }
}

export function ContactForm() {
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const [token, setToken] = useState("");
  const [siteKey, setSiteKey] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/contact/config", { cache: "no-store" })
      .then((response) => response.ok ? response.json() as Promise<{ siteKey?: string }> : null)
      .then((payload) => {
        if (active) setSiteKey(payload?.siteKey || "");
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!siteKey || !turnstileRef.current) return;
    const render = () => window.turnstile?.render(turnstileRef.current!, { sitekey: siteKey, callback: setToken, "error-callback": () => setToken("") });
    if (window.turnstile) { render(); return; }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = render;
    document.head.appendChild(script);
    return () => script.remove();
  }, [siteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    setState("sending"); setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, turnstileToken: token }) });
      const result = await response.json() as { error?: string; message?: string };
      if (!response.ok) throw new Error(result.error || "We could not send your message right now.");
      form.reset(); setToken(""); setState("success"); setMessage(result.message || "Thanks - the MediaOne team will be in touch shortly.");
    } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "We could not send your message right now."); }
  }

  return <form className="contact-production-form" onSubmit={submit} noValidate>
    <div className="contact-form-grid"><label>Name<input name="name" required placeholder="Your name" autoComplete="name" /></label><label>Work email<input name="email" required type="email" placeholder="you@company.com" autoComplete="email" /></label><label>Phone<input name="phone" required type="tel" placeholder="Your phone number" autoComplete="tel" /></label><label>Company<input name="company" required placeholder="Company name" autoComplete="organization" /></label></div>
    <label>How can we help?<textarea name="message" required rows={5} placeholder="Tell us what you are trying to improve." /></label>
    <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    {siteKey && <div ref={turnstileRef} className="turnstile-slot" />}
    <p className="contact-consent">By sending this form, you agree that MediaOne may use your details to respond to your enquiry. See our <a href="/privacy">Privacy Policy</a>.</p>
    <button className="candidate-primary-link" disabled={state === "sending"} type="submit">{state === "sending" ? "Sending message" : "Send message"} <ArrowRight size={16} /></button>
    {state === "success" && <p className="contact-status success" role="status"><CheckCircle2 size={18} />{message}</p>}
    {state === "error" && <p className="contact-status error" role="alert">{message}</p>}
  </form>;
}
