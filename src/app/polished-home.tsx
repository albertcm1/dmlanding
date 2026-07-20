"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronRight, CircleCheck, Clock3, Moon, Play, Search, Sun, X } from "lucide-react";
import { audiences, integrationDetails, workflow } from "../lib/data";
import { ButtonLink, MarketingShell, PLATFORM_URL } from "./launch-ui";

const VIDEO_ID = "4Uih5SxURII";
const VIDEO_POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const platformLinks = [["Overview", PLATFORM_URL], ["Site Health", PLATFORM_URL], ["Tools", PLATFORM_URL], ["Projects", PLATFORM_URL], ["Schedules", PLATFORM_URL]] as const;

function useReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function useVisibilityReplay(threshold = 0.32) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCycle(1); return; }
    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !wasVisible) setCycle((current) => current + 1);
      wasVisible = entry.isIntersecting;
    }, { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, cycle] as const;
}

function Count({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [ref, visible] = useReveal();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(value); return; }
    const start = performance.now();
    let frame = 0;
    const draw = (now: number) => {
      const progress = Math.min((now - start) / 720, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [value, visible]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function DecorativeVideo({ className }: { className: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const start = () => {
    if (window.matchMedia("(hover: hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.play().catch(() => undefined);
  };
  const stop = () => ref.current?.pause();
  return <div className={className} onPointerEnter={start} onPointerLeave={stop} onFocus={start} onBlur={stop}>
    <video ref={ref} muted loop playsInline preload="metadata" poster="/audience-agencies.png" aria-hidden="true"><source src="/candidate-background.mp4" type="video/mp4" /></video>
  </div>;
}

function AuditForm({ compact = false }: { compact?: boolean }) {
  const [site, setSite] = useState("");
  const [placeholder, setPlaceholder] = useState("yourbusiness.com");
  useEffect(() => {
    const names = ["yourbusiness.com", "yourcompany.com", "yourstore.com"];
    let index = 0, length = names[0].length, erasing = true;
    const timer = window.setInterval(() => {
      const name = names[index];
      if (erasing) {
        length = Math.max(length - 1, 0); setPlaceholder(name.slice(0, length));
        if (!length) { erasing = false; index = (index + 1) % names.length; }
      } else {
        length = Math.min(length + 1, names[index].length); setPlaceholder(names[index].slice(0, length));
        if (length === names[index].length) erasing = true;
      }
    }, 90);
    return () => clearInterval(timer);
  }, []);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = PLATFORM_URL;
  };
  return <form className={`candidate-audit-form ${compact ? "candidate-audit-form--compact" : ""}`} onSubmit={submit}>
    <label><Search size={19} /><span>https://</span><input aria-label="Website domain" value={site} onChange={(event) => setSite(event.target.value)} placeholder={placeholder} /></label>
    <button type="submit">Start free website audit <ArrowRight size={17} /></button>
  </form>;
}

function VideoModal({ close }: { close: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [close]);
  return <div className="candidate-video-backdrop" role="dialog" aria-modal="true" aria-label="Growth Workspace product tour" onClick={(event) => event.target === event.currentTarget && close()}>
    <div className="candidate-video-modal"><button type="button" aria-label="Close video" onClick={close}><X size={20} /></button><iframe src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`} title="Growth Workspace product tour" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
  </div>;
}

function AuditWorkspace() {
  const [ref, visible] = useReveal();
  const [activeView, setActiveView] = useState("Overview");
  const [lightPreview, setLightPreview] = useState(false);
  const views = {
    Overview: {
      eyebrow: "WEBSITE AUDIT / EXAMPLE.COM", title: "What matters next.", copy: "One connected view for the pages, priorities, and checks behind better website growth.", action: "Open Site Health", href: PLATFORM_URL,
      signals: [["Crawl access", "Ready"], ["Search visibility", "Review"], ["AI readiness", "Next"], ["Page quality", "Review"], ["Conversion paths", "Next"]],
      queue: "Make priority pages easier to understand.", detail: "Clarify core services, trust pages, and category paths so search engines and answer engines can follow the site.", meta: ["High impact", "Technical + AI visibility"], guide: "Start with the pages closest to a customer decision. The first three actions are ready.",
    },
    "Site Health": {
      eyebrow: "SITE HEALTH / EXAMPLE.COM", title: "Find the checks worth fixing first.", copy: "Keep crawl access, metadata, internal links, and page quality in one clear review.", action: "Open Site Health", href: PLATFORM_URL,
      signals: [["Crawl access", "Ready"], ["Titles", "Review"], ["Internal links", "Review"], ["Page quality", "Next"], ["Trust pages", "Review"]],
      queue: "Tighten the route to your most important pages.", detail: "Start with pages that explain the business, answer buyer questions, and lead into a meaningful action.", meta: ["Site Health", "First review"], guide: "I grouped the first checks by effort so the work can start with a short, useful list.",
    },
    Tools: {
      eyebrow: "TOOLS / EXAMPLE.COM", title: "Choose the question to answer.", copy: "Run the right check for search, AI visibility, content, technical health, or strategy.", action: "Open Tools", href: PLATFORM_URL,
      signals: [["Site Health Check", "Ready"], ["Keyword Analysis", "Next"], ["AI Discovery", "Review"], ["Rank Checker", "Ready"], ["Content plan", "Next"]],
      queue: "Start with a complete Site Health Check.", detail: "It establishes the technical and page-level context before you go deeper into rankings or content.", meta: ["1 credit", "First tool"], guide: "Once the first check is complete, I can point you toward the next tool without making you search the catalog.",
    },
    Projects: {
      eyebrow: "PROJECTS / EXAMPLE.COM", title: "Keep the work connected to the site.", copy: "Group runs, tracked keywords, and connected data around the website your team is improving.", action: "Open Projects", href: PLATFORM_URL,
      signals: [["Active project", "Ready"], ["Tracked keywords", "25"], ["Recent runs", "4"], ["Connected data", "Next"], ["Priority queue", "Review"]],
      queue: "Create a reliable home for each website.", detail: "One project makes it easier to keep the audit, tools, keywords, and recurring work in the same context.", meta: ["Project view", "Team context"], guide: "I will keep the next action attached to the project so it is easy to pick up again later.",
    },
    Schedules: {
      eyebrow: "SCHEDULES / EXAMPLE.COM", title: "Make useful checks arrive on time.", copy: "Repeat the site health and visibility checks that help your team catch changes before they become surprises.", action: "Open Schedules", href: PLATFORM_URL,
      signals: [["Site Health Check", "Monday"], ["Rank tracking", "Weekly"], ["AI Discovery", "Monthly"], ["Last run", "Ready"], ["Next review", "9:00 AM"]],
      queue: "Schedule the checks that keep progress visible.", detail: "Run the work again after important changes, then compare what improved and what should move next.", meta: ["Recurring work", "Clear cadence"], guide: "I will surface the next scheduled review with the context your team needs to act on it.",
    },
  } as const;
  const view = views[activeView as keyof typeof views];
  const viewDetail = activeView === "Overview" ? <div className="workspace-overview-detail"><div className="workspace-kpis"><article><span>Growth streak</span><b>7 days</b><em>3 actions completed</em></article><article><span>Tracked keywords</span><b>25</b><em>4 moved this week</em></article><article><span>Page speed</span><b>Good</b><em>2 pages to review</em></article></div><div className="workspace-bottom"><section><div className="workspace-section-head"><span className="micro-label">PRIORITY QUEUE</span><span>01 of 04</span></div><h4>{view.queue}</h4><p>{view.detail}</p><div className="issue-meta">{view.meta.map((item) => <span key={item}>{item}</span>)}</div></section><aside><div className="guide-inline"><img src="/guide-support.gif" alt="Guide" /><div><b>Guide</b><p>{view.guide}</p></div></div><a className="workspace-outline" href={PLATFORM_URL}>Open platform <ChevronRight size={16} /></a></aside></div></div> : activeView === "Site Health" ? <div className="workspace-site-health"><div className="workspace-runner"><span>https://</span><b>example.com</b><button type="button">Run site health</button></div><div className="health-summary"><strong>78</strong><div><b>Website health</b><span>Clear priorities for the next review</span></div><em>9 credits</em></div><div className="health-breakdown"><span><i className="critical" />2 critical</span><span><i className="warning" />5 warnings</span><span><i className="opportunity" />11 opportunities</span></div><div className="workspace-checklist"><span>AI crawler access <b>Ready</b></span><span>Missing page descriptions <b>Review</b></span><span>Internal-link path <b>Review</b></span></div></div> : activeView === "Tools" ? <div className="workspace-tools-detail"><div className="tool-category-pills"><span>SEO</span><span>Content</span><span>AI visibility</span><span>Strategy</span></div><div className="workspace-tool-row"><div><b>Site Health Check</b><span>Complete page, technical and AI readiness review.</span></div><em>9 credits</em><button type="button">Run</button></div><div className="workspace-tool-row"><div><b>Keyword Analysis</b><span>Find terms worth tracking by intent and opportunity.</span></div><em>1 credit</em><button type="button">Run</button></div><div className="workspace-tool-recommendation"><span>Recommended next tool</span><b>AI Discovery Audit</b><em>See how answer engines understand your site.</em></div></div> : activeView === "Projects" ? <div className="workspace-projects-detail"><div className="project-primary"><div><span>Active project</span><b>example.com</b><em>Runs, keywords and connected data in one place.</em></div><button type="button">Open project</button></div><div className="project-stats"><span><b>4</b> recent runs</span><span><b>25</b> tracked keywords</span><span><b>1</b> connected source</span></div><div className="run-history"><span>Site Health Check <em>Ready</em></span><span>Keyword Analysis <em>Completed</em></span><span>AI Discovery Audit <em>Queued</em></span></div></div> : <div className="workspace-schedules-detail"><div className="schedule-banner"><span>Next scheduled check</span><b>Monday, 9:00 AM</b><em>Site Health Check for example.com</em></div><div className="schedule-row"><span>Rank tracking</span><b>Every Monday</b><em>Active</em></div><div className="schedule-row"><span>AI Discovery Audit</span><b>1st of each month</b><em>Active</em></div><div className="schedule-row"><span>Last completed run</span><b>Today, 10:24 AM</b><em>Ready to review</em></div></div>;
  return <figure ref={ref} className={`candidate-workspace ${visible ? "is-revealed" : ""} ${lightPreview ? "is-light-preview" : ""}`}>
    <div className="workspace-app"><aside className="workspace-side"><span className="workspace-brand">GROWTH WORKSPACE</span>{platformLinks.map(([label]) => <button type="button" key={label} onClick={() => setActiveView(label)} className={`workspace-nav ${activeView === label ? "active" : ""}`}>{label}</button>)}<div className="workspace-theme-switcher"><button type="button" aria-pressed={lightPreview} onClick={() => setLightPreview((value) => !value)} title={lightPreview ? "Theme: Light. Switch to Dark." : "Theme: Dark. Switch to Light."} aria-label={lightPreview ? "Theme: Light. Switch to Dark." : "Theme: Dark. Switch to Light."}>{lightPreview ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}</button></div></aside>
    <div className="workspace-main"><div className="workspace-app-chrome"><select aria-label="Selected project" defaultValue="example.com"><option>example.com</option></select><span className="workspace-credit">AI credits <b>5,957</b></span><a className="workspace-goal-link" href={PLATFORM_URL}>Set a goal</a><span className="workspace-avatar">C</span></div><div className="workspace-top"><div><span className="micro-label">{view.eyebrow}</span><h3>{view.title}</h3><p>{view.copy}</p></div><a className="workspace-primary" href={view.href}>{view.action} <ArrowRight size={15} /></a></div><div className="workspace-signals">{view.signals.map(([label, state]) => <div key={label}><span>{label}</span><strong>{state}</strong></div>)}</div>{viewDetail}</div></div>
  </figure>;
}

function WorkflowSurface({ step }: { step: number }) {
  const titles = ["Inspect the site", "Choose the work", "Fix with Guide", "Measure movement"];
  const copy = ["Crawl priority pages and collect the signals that shape discovery.", "Put blockers, opportunities, and quick wins in a practical order.", "Translate technical work into clear actions your team can complete.", "Re-run checks, watch rankings, and keep the next priority visible."];
  return <div className="workflow-surface"><div className="workflow-surface-head"><span>{String(step + 1).padStart(2, "0")}</span><b>{titles[step]}</b><em>{step === 0 ? "Site Health" : step === 1 ? "Action Plan" : step === 2 ? "Guide" : "Schedules"}</em></div><p>{copy[step]}</p><div className={`workflow-preview preview-${step}`}>{step === 0 && <><i /><i /><i /></>}{step === 1 && <><div><b>High</b><span>Improve crawl path</span></div><div><b>Next</b><span>Strengthen page proof</span></div></>}{step === 2 && <><img src="/guide-support.gif" alt="" /><span>Here is the safest first move.</span></>}{step === 3 && <><svg viewBox="0 0 240 60" aria-hidden="true"><path d="M0 48 C42 44 52 35 82 39 S126 46 150 25 S198 32 240 8" /></svg><span>Next scan: Monday, 9:00 AM</span></>}</div></div>;
}

function MonitoringPanel() {
  const [ref, cycle] = useVisibilityReplay();
  return <div ref={ref} className={`monitor-panel ${cycle ? "is-revealed" : ""}`}><div className="monitor-top"><span>example.com</span><span><i /> Active</span></div><div className="monitor-chart"><div><b>Website health</b><strong>Clear view</strong></div><svg key={cycle} viewBox="0 0 480 145" aria-hidden="true"><path d="M5 123 C50 108 80 112 115 85 S174 91 211 64 S269 76 304 44 S362 54 396 29 S441 32 475 10" /></svg></div><div className="monitor-grid"><article><span>Tracked keywords</span><b><Count key={`keywords-${cycle}`} value={25} /></b><em>Ready to review</em></article><article><span>Scheduled runs</span><b><Count key={`schedules-${cycle}`} value={3} /></b><em>This month</em></article><article><span>Last run</span><b><Clock3 size={20} /></b><em>Site Health Check</em></article></div><a key={cycle} className="monitor-next" href={PLATFORM_URL}><CalendarDays size={18} /><div><span>Next scheduled run</span><b>Monday, 9:00 AM</b></div><ArrowRight size={18} /></a></div>;
}

export function PolishedHomePage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [audienceKey, setAudienceKey] = useState("owners");
  const audience = audiences.find((item) => item.key === audienceKey) || audiences[0];
  const audienceSlug = audience.key === "owners" ? "business-owners" : audience.key === "teams" ? "marketing-teams" : audience.key === "local" ? "local-services" : audience.key;
  return <MarketingShell><main className="candidate-home">
    <section className="candidate-hero"><DecorativeVideo className="candidate-bg-video candidate-bg-video--hero" /><div className="candidate-container"><div className="candidate-hero-copy"><span className="micro-label">AI FOR WEBMASTERS</span><h1>Know what to fix.<br /><strong>Know what to do next.</strong></h1><p>Growth Workspace turns search, AI visibility, technical health, content, and conversion signals into a practical growth plan.</p><AuditForm /><div className="candidate-hero-note"><i /> No credit card required. Free users get 30 credits per month.</div><a className="candidate-login-link" href={PLATFORM_URL}>Already have a workspace? Log in <ArrowRight size={15} /></a></div>
      <button type="button" className="candidate-video-preview" onClick={() => setVideoOpen(true)} aria-label="Watch Growth Workspace product tour"><img src={VIDEO_POSTER} alt="Growth Workspace product tour" /><span><Play size={20} fill="currentColor" /> Watch how Growth Workspace works</span></button>
    </div></section>

    <section className="candidate-workspace-section">
      <div className="candidate-container">
        <div className="candidate-workspace-intro"><span className="micro-label">THE WORKSPACE</span><h2>See the work in one place.</h2><p>Turn site signals into priorities, actions, and repeatable checks without losing the page context.</p></div>
        <div className="workspace-caption"><span><i className="workspace-ready-dot" /> Workspace preview</span><small>Explore platform patterns with safe example data.</small></div>
        <AuditWorkspace />
      </div>
    </section>

    <section className="candidate-proof"><div className="candidate-container candidate-proof-grid">{[[30,"webmaster tools","Move from site health to content, rankings, AI visibility, and strategy without leaving the same workspace.", "+"],[50,"checks per scan","Review the site paths, structure, content signals, trust markers, and decision points that deserve attention.", "+"],[5,"growth categories","Keep search, technical health, AI visibility, content, and conversion work connected to the same site plan.", ""],[14,"day action plan","Know what to fix first, what to publish next, and what to measure after the change.", ""]].map(([number, label, copy, suffix]) => <article key={label as string}><strong><Count value={number as number} suffix={suffix as string} /></strong><h2>{label}</h2><p>{copy}</p></article>)}</div></section>

    <section className="candidate-section candidate-workflow"><div className="candidate-container"><div className="candidate-section-intro"><span className="micro-label">ONE OPERATING RHYTHM</span><h2>From signal to progress.</h2><p>Growth Workspace keeps each stage of website growth connected, so the work never stops at a report.</p></div><div className="candidate-workflow-grid">{workflow.map(([number, title, copy, tag], index) => <article key={number}><div className="workflow-number">{number}</div><h3>{title}</h3><p>{copy}</p><span>{tag}</span><WorkflowSurface step={index} /></article>)}</div></div></section>

    <section className="candidate-section candidate-guide"><div className="candidate-container candidate-guide-grid"><div className="candidate-guide-media"><img src="/guide-support.gif" alt="Guide, the Growth Workspace guidance assistant" /></div><div><span className="micro-label">MEET GUIDE</span><h2>Clear guidance when the work gets specific.</h2><p>Guide turns a finding into page-level instructions, explains why it matters, and keeps the next action manageable.</p><div className="candidate-chat"><div className="chat-line guide"><img src="/guide-support.gif" alt="" /><p>I found a clear first move for AI visibility. Start with the pages customers rely on most.</p></div><div className="chat-line user"><p>What should we change first?</p></div><div className="chat-line guide delayed"><img src="/guide-support.gif" alt="" /><p>Publish a complete site guide, then link it from core service or category pages. The checklist is ready.</p></div><div className="chat-complete"><CircleCheck size={16} /> Action completed <b>Next review scheduled</b></div></div><a href={PLATFORM_URL} className="candidate-text-link">See Guide in the platform <ArrowRight size={16} /></a></div></div></section>

    <section className="candidate-section candidate-monitoring"><div className="candidate-container candidate-monitoring-grid"><div><span className="micro-label">KEEP THE SITE MOVING</span><h2>Monitor what changed. Schedule what comes next.</h2><p>Projects, ranking movement, tool runs, and recurring checks stay in one operating view.</p><ul><li><Check size={16} /> Keep each site in a project.</li><li><Check size={16} /> Track priority keywords and site health.</li><li><Check size={16} /> Schedule the checks your team repeats.</li></ul><a className="candidate-primary-link" href={PLATFORM_URL}>Explore the platform <ArrowRight size={16} /></a></div><MonitoringPanel /></div></section>

    <section className="candidate-section candidate-audiences"><div className="candidate-container"><div className="candidate-section-intro center"><span className="micro-label">BUILT FOR YOUR ROLE</span><h2>One system. Different growth paths.</h2><p>Start with the work that matters to your role, then keep every next action in view.</p></div><div className="candidate-audience-tabs" role="tablist">{audiences.map((item) => <button role="tab" aria-selected={item.key === audienceKey} className={item.key === audienceKey ? "active" : ""} onClick={() => setAudienceKey(item.key)} key={item.key}>{item.label}</button>)}</div><div className="candidate-audience-stage" key={audience.key}><div><span className="micro-label">{audience.label}</span><h3>{audience.title}</h3><p>{audience.copy}</p><ul>{audience.actions.map((action) => <li key={action}><Check size={16} />{action}</li>)}</ul><NextLink href={`/solutions/${audienceSlug}`}>Explore this path <ArrowRight size={16} /></NextLink></div><figure><img src={audience.image} alt={audience.imageAlt} /><figcaption><i /> {audience.caption}</figcaption></figure></div></div></section>

    <section className="candidate-section candidate-integrations"><div className="candidate-container"><div className="candidate-section-intro"><span className="micro-label">BRING THE SIGNALS TOGETHER</span><h2>Useful data, in the same operating view.</h2><p>Connect the platforms that show how people find, use, and buy from your website.</p></div><div className="candidate-integration-list">{integrationDetails.map((item) => <article key={item.name}><img className={item.name === "LinkedIn" ? "linkedin-logo" : ""} src={item.logo} alt={`${item.name} logo`} /><div><b>{item.name}</b><span>{item.copy}</span></div><em>{item.state}</em></article>)}</div><ButtonLink href="/integrations" kind="outline">Explore integrations</ButtonLink></div></section>

    <section className="candidate-final"><DecorativeVideo className="candidate-bg-video candidate-bg-video--final" /><div className="candidate-container"><span className="micro-label">START WITH THE SITE</span><h2>Turn uncertainty into the next useful move.</h2><p>Run a free website audit, understand what matters, and start a better growth rhythm.</p><AuditForm compact /></div></section>
  </main>{videoOpen && <VideoModal close={() => setVideoOpen(false)} />}</MarketingShell>;
}
