type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type ContactContext = { request: Request; env: ContactEnv };

const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const json = (data: object, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] || character);

export async function onRequestPost({ request, env }: ContactContext) {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM || !env.TURNSTILE_SECRET_KEY) return json({ error: "Contact submissions are not configured yet. Please email contact@mediaone.co." }, 503);
  let payload: Record<string, unknown>;
  try { payload = await request.json() as Record<string, unknown>; } catch { return json({ error: "Please submit the form again." }, 400); }
  const name = clean(payload.name, 120), workEmail = clean(payload.email, 254), phone = clean(payload.phone, 60), company = clean(payload.company, 160), message = clean(payload.message, 4000), honeypot = clean(payload.website, 200), turnstileToken = clean(payload.turnstileToken, 2048);
  if (honeypot) return json({ error: "We could not send your message." }, 400);
  if (!name || !email.test(workEmail) || !phone || !company || !message) return json({ error: "Please complete every required field with a valid work email." }, 400);
  if (!turnstileToken) return json({ error: "Please complete the security check before sending." }, 400);
  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: turnstileToken }) });
  const turnstile = await verification.json() as { success?: boolean };
  if (!turnstile.success) return json({ error: "The security check did not pass. Please try again." }, 400);
  const text = `New Digimetrics.ai enquiry\n\nName: ${name}\nEmail: ${workEmail}\nPhone: ${phone}\nCompany: ${company}\n\nMessage:\n${message}`;
  const resend = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: workEmail, subject: `Digimetrics.ai enquiry from ${name}`, text, html: `<h2>New Digimetrics.ai enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(workEmail)}<br><strong>Phone:</strong> ${escapeHtml(phone)}<br><strong>Company:</strong> ${escapeHtml(company)}</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>` }) });
  if (!resend.ok) return json({ error: "We could not send your message right now. Please try again or email contact@mediaone.co." }, 502);
  return json({ message: "Thanks - the MediaOne team will be in touch shortly." });
}
