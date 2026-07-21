"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { audienceRoutes, integrationDetails, PLATFORM_URL, platformToolUrls, toolGroups, toolMeta } from "../lib/data";
import { MarketingShell } from "./launch-ui";

type AudienceSlug = keyof typeof audienceRoutes;

const media: Record<AudienceSlug, { image: string; alt: string; caption: string; position?: string }> = {
  "business-owners": { image: "/audience-business-owners.jfif", alt: "Business owner reviewing a growth plan on a tablet", caption: "Keep the next useful decision close to the people running the business.", position: "center 38%" },
  "independent-marketers": { image: "/audience-independent-marketers.png", alt: "Independent marketer reviewing website growth priorities", caption: "One focused workspace. The next useful action stays in view." },
  "marketing-teams": { image: "/audience-marketing-teams.jfif", alt: "Marketing team reviewing a shared digital growth plan", caption: "Bring priorities, tasks, and results into one weekly rhythm." },
  agencies: { image: "/audience-agencies.jfif", alt: "Agency team working with marketing dashboards", caption: "Turn deeper website work into a clearer client conversation." },
  ecommerce: { image: "/audience-ecommerce.png", alt: "Ecommerce owner reviewing products and orders", caption: "Keep category, product, and conversion work connected." },
  "local-services": { image: "/audience-local-services.png", alt: "Local service owner in a workshop", caption: "Focus every useful signal on stronger local demand." },
};

const capabilityLanes = [
  ["01", "Get found", "SEO, rankings, competitors, and technical signals", "Read the signals behind discoverability and identify the pages that deserve attention first.", ["Keyword opportunity", "Rankings and competitors", "Technical health"]],
  ["02", "Be understood", "AI visibility, GEO, answer engines, and llms.txt", "Make it easier for answer engines to understand the facts, pages, and expertise that set your business apart.", ["AI Discovery Audit", "AI mentions", "GEO optimisation"]],
  ["03", "Publish with purpose", "Content, social, captions, and audience insight", "Give every piece of content a clear job: answer a question, support a page, or build a useful topic path.", ["Content optimisation", "Pillar planning", "Social captions"]],
  ["04", "Turn visits into action", "Landing pages, conversion paths, trust, and page intent", "Find where a customer has to work too hard to understand the offer, trust the page, or take the next step.", ["Landing-page audit", "Page intent", "Trust signals"]],
  ["05", "Connect the context", "Search Console, GA4, Google Ads, LinkedIn, and Meta context", "Keep website work close to the search, analytics, and paid-media context that helps explain why it matters.", ["Google data layer", "Paid-media context", "Connected projects"]],
] as const;

const audienceTools: Record<AudienceSlug, string[]> = {
  "business-owners": ["Technical SEO Crawler", "Landing Page Audit", "AI Discovery Audit"],
  "independent-marketers": ["Site Health Check", "Keyword Analysis", "AI Content Optimiser", "Landing Page Audit", "AI Discovery Audit"],
  "marketing-teams": ["Keyword Analysis", "Content Pillar Framework", "AI Mentions Tracker"],
  agencies: ["Page Technical & Domain Analysis", "Competitors Identifier", "Performance Marketing Audit"],
  ecommerce: ["On-Page Optimisation", "Schema Generator", "Landing Page Audit"],
  "local-services": ["Keyword Analysis", "Rank Checker", "AI Discovery Audit"],
};

const quickStart = ["Site Health Check", "Keyword Analysis", "Rank Checker", "AI Discovery Audit"];

function toolUrl(name: string) {
  const path = platformToolUrls[name] || "/tools";
  return new URL(path, PLATFORM_URL).toString();
}

function PlatformLink({ children, className }: { children: ReactNode; className?: string }) {
  return <a className={className} href={PLATFORM_URL}>{children}<ArrowRight size={16} /></a>;
}

export function CandidatePlatformPage() {
  return <MarketingShell><main className="platform-handoff"><div><span className="micro-label">DIGIMETRICS PLATFORM</span><h1>Opening your digital growth workspace.</h1><p>Digimetrics.ai is the home for your audits, tools, projects, schedules, and Monty guidance.</p><PlatformLink className="candidate-primary-link">Open Digimetrics.ai</PlatformLink></div></main></MarketingShell>;
}

export function CandidateToolsPage() {
  return <MarketingShell><main className="candidate-public candidate-tools-page">
    <section className="candidate-page-hero"><div className="candidate-container tools-hero-copy"><span className="micro-label">THE EASY WAY TO GROW ONLINE</span><h1>Digital marketing made simple.</h1><p>Everything you need to improve your online presence, brought together in one easy-to-use workspace. No expertise needed - we help you figure out what to do next.</p><PlatformLink className="candidate-primary-link">Start for free</PlatformLink></div></section>
    <section className="candidate-tool-start"><div className="candidate-container"><span className="micro-label">START HERE</span><h2>Build a clear first read.</h2><p>Start with one focused answer, then use only the depth your next decision needs.</p><div>{quickStart.map((tool, index) => <a href={toolUrl(tool)} key={tool}><b>0{index + 1}</b><span>{tool}</span><ChevronRight size={18} /></a>)}</div></div></section>
    <section className="candidate-tool-catalog"><div className="candidate-container">{toolGroups.map(([group, names]) => <section key={group} id={group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}><div className="tool-catalog-heading"><span className="micro-label">{group}</span><h2>{names.length} tools for {group.toLowerCase()}.</h2></div><div className="tool-catalog-list">{names.map((name, index) => <a href={toolUrl(name)} key={name} className="candidate-tool-row"><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{name}</h3><p>{toolMeta[name]?.copy || "Bring this signal into the workspace and use it to choose the next action."}</p></div><ChevronRight size={18} /></a>)}</div></section>)}</div></section>
  </main></MarketingShell>;
}

export function CandidateSolutionsPage() {
  const [activeCapability, setActiveCapability] = useState(0);
  return <MarketingShell><main className="candidate-public candidate-solutions-page">
    <section className="candidate-page-hero candidate-solutions-hero"><div className="candidate-container"><span className="micro-label">DIGITAL GROWTH, MADE CLEAR</span><h1>Audit, plan, and improve every way people find you.</h1><p>Digimetrics.ai is an AI-powered audit, strategy, and action workspace for SEO, AI/GEO, content, social, paid-media context, technical health, conversion, and analytics.</p><PlatformLink className="candidate-primary-link">Get started free</PlatformLink><small className="audience-free-note">No credit card required. Free members receive 30 credits every month.</small></div></section>
    <section className="solution-capabilities"><div className="candidate-container"><div className="solution-section-heading"><span className="micro-label">ONE SYSTEM, FIVE GROWTH AREAS</span><h2>Choose one question. Get one useful next action.</h2><p>Start with a focused check now. Bring more connected signals into view only when the work calls for it.</p></div><div className="capability-editorial-rail">{capabilityLanes.map(([number, label, channels, copy, items], index) => <article className={index === activeCapability ? "active" : ""} key={label}><button type="button" onClick={() => setActiveCapability(index)} aria-expanded={index === activeCapability}><span>{number}</span><div><b>{label}</b><small>{channels}</small></div><ChevronRight size={18} /></button>{index === activeCapability && <div className="capability-expanded"><p>{copy}</p><ul>{items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><a href={`${PLATFORM_URL}tools`}>Explore related tools <ArrowRight size={15} /></a></div>}</article>)}</div></div></section>
    <section className="solution-depth-section"><div className="candidate-container"><div className="solution-section-heading solution-section-heading--split"><div><span className="micro-label">CHOOSE YOUR DEPTH</span><h2>Start simple. Go deeper when needed.</h2></div><p>Begin with a focused check and one next action. Monty, your AI growth concierge, explains the finding in plain English. Specialist depth remains ready when the evidence earns it.</p></div><div className="solution-depth-grid"><article><span className="micro-label">QUICK START</span><h3>Get a clear first read.</h3><p>Use four focused checks before committing time or capacity to a larger workflow.</p><ul>{quickStart.map((tool, index) => <li key={tool}><a href={toolUrl(tool)}><b>0{index + 1}</b><span>{tool}</span><ChevronRight size={16} /></a></li>)}</ul></article><article><span className="micro-label">SPECIALIST DEPTH</span><h3>Keep power in reserve.</h3><p>Use 30+ specialist tools across SEO, content, AI visibility, strategy, paid-media context, and connected data when you need them.</p><div className="solution-group-tags">{toolGroups.map(([group]) => <span key={group}>{group}</span>)}</div><p className="solution-credit-note">Start free, choose the checks you need, then add plan capacity or top-ups only as your workflow grows.</p><a href={`${PLATFORM_URL}tools`}>See all tools <ArrowRight size={15} /></a></article></div></div></section>
    <section className="candidate-solution-overview solution-audiences"><div className="candidate-container"><div className="solution-section-heading"><span className="micro-label">BUILT FOR HOW YOU WORK</span><h2>One growth system. Six ways to use it.</h2><p>Every role gets a clear starting point without losing the specialist depth behind it.</p></div><div className="candidate-solution-grid">{Object.entries(audienceRoutes).map(([slug, route], index) => { const item = media[slug as AudienceSlug]; return <article className="audience-route-card" key={slug}><figure className="solution-card-media"><img src={item.image} alt={item.alt} style={{ objectPosition: item.position }} /><figcaption>{item.caption}</figcaption></figure><span className="micro-label">0{index + 1} / {route.label}</span><h2>{route.title}</h2><p>{route.copy}</p><NextLink href={`/solutions/${slug}`}>Explore the workflow <ArrowRight size={16} /></NextLink></article>; })}</div></div></section>
  </main></MarketingShell>;
}

export function CandidateAudiencePage({ data, slug }: { data: (typeof audienceRoutes)[AudienceSlug]; slug: AudienceSlug }) {
  const image = media[slug];
  return <MarketingShell><main className="candidate-public candidate-audience-page">
    <section className="candidate-page-hero candidate-audience-hero"><div className="candidate-container"><span className="micro-label">FOR {data.label.toUpperCase()}</span><h1>{data.title}</h1><p>{data.copy}</p><PlatformLink className="candidate-primary-link">Get started free</PlatformLink><small className="audience-free-note">No credit card required. Free members receive 30 credits every month.</small></div></section>
    <section className="candidate-audience-detail"><div className="candidate-container"><div className="audience-detail-grid"><div className="audience-detail-copy"><span className="micro-label">THE CHALLENGE</span><h2>{data.problem}</h2><p>Digimetrics.ai is an AI-powered audit, strategy, and action workspace - not an agency service or a single-purpose plugin.</p><div className="audience-channel-list"><span className="micro-label">CHANNELS AND SIGNALS</span>{data.channels.map((channel) => <span key={channel}><Check size={15} />{channel}</span>)}</div></div><figure className="solution-media-card large"><img src={image.image} alt={image.alt} style={{ objectPosition: image.position }} /><figcaption><b>{data.label}</b><span>{image.caption}</span></figcaption></figure></div><div className="audience-workflow"><div><span className="micro-label">A SIMPLE THREE-STEP WORKFLOW</span><h2>Start with the signal. Keep every next move in view.</h2></div>{data.workflow.map((step, index) => <article key={step}><b>0{index + 1}</b><span>{step}</span></article>)}</div><div className="audience-tools"><span className="micro-label">RECOMMENDED TOOLS</span>{audienceTools[slug].map((tool) => <a href={toolUrl(tool)} key={tool}>{tool}<ArrowRight size={16} /></a>)}</div><div className="audience-monty"><img src="/guide-support.gif" alt="Monty, the Digimetrics AI growth concierge" /><div><span className="micro-label">MONTY, YOUR AI GROWTH CONCIERGE</span><h3>Keep specialist work approachable.</h3><p>Monty explains what the evidence means, shows the safest first move, and helps your team decide whether it is time to go deeper.</p></div><PlatformLink>Open Digimetrics.ai</PlatformLink></div></div></section>
  </main></MarketingShell>;
}

export function CandidateIntegrationsPage() {
  return <MarketingShell><main className="candidate-public candidate-integrations-page"><section className="candidate-page-hero"><div className="candidate-container"><span className="micro-label">CONNECTED DATA</span><h1>Put the context behind growth in one place.</h1><p>Connect the data sources that explain how people find, use, and respond to your website - then bring the signals into a clearer next decision.</p><PlatformLink className="candidate-primary-link">Connect data in Digimetrics.ai</PlatformLink></div></section><section className="candidate-integration-story"><div className="candidate-container"><div className="integration-story-heading"><span className="micro-label">ONE CONNECTED VIEW</span><h2>Start with Google. Extend the context when it is ready.</h2><p>Search, analytics, and advertising signals become more useful when they can sit beside the pages and actions they affect.</p></div><div className="candidate-integration-list">{integrationDetails.map((item) => <article key={item.name}><img className={item.name === "LinkedIn" ? "linkedin-logo" : ""} src={item.logo} alt={`${item.name} logo`} /><div><b>{item.name}</b><span>{item.copy}</span></div><em>{item.state}</em></article>)}</div><div className="integration-action"><PlatformLink className="candidate-primary-link">Explore integrations in platform</PlatformLink></div></div></section></main></MarketingShell>;
}
