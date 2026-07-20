"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { cleanDomain } from "../../lib/data";
import { MarketingShell, PLATFORM_URL } from "../launch-ui";

function useInViewOnce() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, visible] as const;
}

function CountUp({ value }: { value: number }) {
  const [ref, visible] = useInViewOnce();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 700);
      setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value, visible]);
  return <span ref={ref}>{current}</span>;
}

const findings = [
  ["Make the site easier for AI crawlers to read", "High", "Publish site guide"],
  ["Strengthen priority page summaries", "High", "Rewrite metadata"],
  ["Bring trust closer to decisions", "Medium", "Add proof and policies"],
  ["Expand pages with buyer questions", "Medium", "Build content brief"]
] as const;

const plan = [
  "Fix the highest-impact crawl blocker",
  "Publish an AI-readable guide to priority pages",
  "Rewrite two revenue page summaries",
  "Connect search data and schedule a rescan"
];

export function ReportExperience() {
  const [domain, setDomain] = useState("yourbusiness.com");
  const [gateVisible, setGateVisible] = useState(false);
  const reportSectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => setDomain(cleanDomain(new URLSearchParams(window.location.search).get("site") || "yourbusiness.com")), []);
  useEffect(() => {
    const node = reportSectionRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setGateVisible(entry.isIntersecting), { threshold: 0.02 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const onboardingHref = `/onboarding?site=${encodeURIComponent(domain)}&from=report`;

  return <MarketingShell>
    <main>
      <section className="report-page-head"><div className="neon-wrap"><span className="eyebrow teal-text">Website audit report</span><h1>{domain}</h1><p>A clear view of the signals behind your next result.</p></div></section>
      <section ref={reportSectionRef} className="report-section report-experience">
        <div className="neon-wrap report-stage">
          <div className="report-layout">
            <div className="report-teaser report-main">
              <div className="report-metrics">
                {[["Overall health", 78, "Good base"], ["Search visibility", 72, "4 opportunities"], ["AI visibility", 41, "Needs attention"], ["Conversion", 68, "3 improvements"]].map(([label, value, helper]) => <div key={label as string}><span>{label}</span><strong><CountUp value={value as number} /><small>/100</small></strong><em>{helper}</em></div>)}
              </div>
              <article className="report-panel"><span className="eyebrow purple">Executive view</span><h2>Start with the signals closest to growth.</h2><p>{domain} has a clear path to stronger search, AI visibility, content, technical health, and conversion. The highest-impact work is already ordered for review.</p><div className="finding-table"><div className="finding-head"><span>Finding</span><span>Impact</span><span>Next move</span></div>{findings.map(([title, impact, next]) => <div className="finding-row" key={title}><strong>{title}</strong><span className={`severity ${impact.toLowerCase()}`}>{impact}</span><em>{next}</em></div>)}</div></article>
              <article className="report-panel"><span className="eyebrow purple">14-day action plan</span><h2>Make progress in the right order.</h2>{plan.map((item, index) => <div className="plan-row" key={item}><b>0{index + 1}</b><div><strong>{item}</strong><p>{index < 2 ? "Start here" : "Next up"}</p></div><Check size={17} /></div>)}</article>
              <article className="report-panel report-detail-grid"><div><span className="eyebrow teal-text">Search opportunities</span><strong>20+ terms worth tracking</strong><p>Prioritize terms with clear intent across your service, category, and product pages.</p></div><div><span className="eyebrow teal-text">AI visibility</span><strong>3 answer-engine gaps</strong><p>Make your core offers, policies, and proof easier for AI systems to understand.</p></div><div><span className="eyebrow teal-text">Conversion</span><strong>2 page-level improvements</strong><p>Reduce uncertainty on the pages closest to a call, enquiry, or purchase.</p></div></article>
            </div>
          </div>
          <div className="report-gate-overlay">
            <div className="report-gate-scrim" />
            <div className={`report-gate-floating ${gateVisible ? "is-floating" : ""}`}>
              <div className="report-gate-card"><div className="gate-badge"><Sparkles size={17} /> Report ready</div><h2>Your growth plan is ready.</h2><p>Create your workspace to save this report, keep the action plan with your team, and track what changes next.</p><a className="google-button" href={onboardingHref}><span>G</span> Continue with Google</a><a className="pill-button teal" href={onboardingHref}>Create your workspace <ArrowRight size={16} /></a><small>No credit card required.</small><a className="report-platform-link" href={PLATFORM_URL}>Already have a workspace? Log in</a></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </MarketingShell>;
}
