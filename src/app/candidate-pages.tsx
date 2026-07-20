import NextLink from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, ChevronRight, Wrench } from "lucide-react";
import { audienceRoutes, integrationDetails, toolGroups, toolMeta } from "../lib/data";
import { MarketingShell } from "./launch-ui";

const PLATFORM_URL = "https://example.com/";
import { DecorativeVideo } from "./polished-home";

const platformSections = [
  ["Site Health", "See what is preventing your priority pages from being found, understood, and trusted.", "Crawl access, metadata, page structure, links, and conversion paths in one evidence-led review.", "audit"],
  ["Tools", "Give each growth question the right depth.", "Move from fast checks to deeper analysis across search, AI visibility, content, technical health, and strategy.", "tools"],
  ["Guide", "Turn findings into work your team can finish.", "Guide explains the signal, identifies the page to change, and keeps the next action clear.", ""],
  ["Projects", "Keep every site and priority in context.", "Group tool runs, tracked keywords, and connected data around the website your team is improving.", "projects"],
  ["Monitoring", "See whether the work is moving the site.", "Track search movement, recurring checks, and the changes your team has completed.", "tracking"],
  ["Schedules", "Make useful checks arrive on time.", "Run the workflows your team repeats so the next decision is not waiting on a manual audit.", "schedules"],
] as const;

const audienceToolMap: Record<keyof typeof audienceRoutes, string[]> = {
  "business-owners": ["Technical SEO Crawler", "Landing Page Audit", "AI Discovery Audit"],
  "independent-marketers": ["Site Health Check", "Keyword Analysis", "AI Content Optimiser", "Landing Page Audit", "AI Discovery Audit"],
  "marketing-teams": ["Keyword Analysis", "Content Pillar Framework", "AI Mentions Tracker"],
  agencies: ["Page Technical & Domain Analysis", "Competitors Identifier", "Performance Marketing Audit"],
  ecommerce: ["On-Page Optimisation", "Schema Generator", "Landing Page Audit"],
  "local-services": ["Keyword Analysis", "Rank Checker", "AI Discovery Audit"],
};

const audienceMedia: Record<keyof typeof audienceRoutes, { image: string; alt: string; caption: string }> = {
  "business-owners": { image: "/audience-business-owners.png", alt: "Business owners reviewing a website growth plan", caption: "Keep the next useful decision close to the people running the business." },
  "independent-marketers": { image: "/audience-independent-marketers.png", alt: "Independent marketer reviewing website growth priorities", caption: "One focused workspace. The next useful action stays in view." },
  "marketing-teams": { image: "/audience-marketing-teams.jfif", alt: "Marketing team reviewing a shared growth workspace", caption: "Bring priorities, tasks, and results into one weekly rhythm." },
  agencies: { image: "/audience-agencies.jfif", alt: "Agency team presenting website growth work", caption: "Turn deeper website work into a clearer client conversation." },
  ecommerce: { image: "/audience-ecommerce.png", alt: "Ecommerce owner working on online discovery", caption: "Keep category, product, and conversion work connected." },
  "local-services": { image: "/audience-local-services.png", alt: "Local service owner managing their business", caption: "Focus every useful signal on stronger local demand." },
};

const solutionCapabilities = [
  { number: "01", label: "Get found", title: "Make the site easier to discover.", copy: "Read the search signals behind visibility, opportunity, and technical friction.", items: ["SEO and keywords", "Rankings and competitors", "Technical signals"] },
  { number: "02", label: "Be understood", title: "Give answer engines a clearer picture.", copy: "Audit the pages, structured guidance, and AI-facing signals that help your business be understood.", items: ["AI visibility and GEO", "AI Discovery Audit", "llms.txt and answer-engine readiness"] },
  { number: "03", label: "Publish with purpose", title: "Create content with a defined job.", copy: "Use audience, topic, and page-intent signals to plan, optimise, and distribute useful content.", items: ["Content planning and optimisation", "Captions and social", "Audience insight"] },
  { number: "04", label: "Turn visits into action", title: "Remove the friction around the next decision.", copy: "Review whether the page gives visitors the clarity, trust, and path they need to act.", items: ["Landing-page quality", "Conversion paths", "Trust and page intent"] },
  { number: "05", label: "Connect the context", title: "Put site work next to the signals around it.", copy: "Bring available search, analytics, and paid-media context into the same growth conversation.", items: ["Search Console and GA4", "Google Ads and LinkedIn", "Meta context, coming soon"] },
] as const;

const quickStartTools = ["Site Health Check", "Keyword Analysis", "Rank Checker", "AI Discovery Audit"];

function PlatformComposition({ title, index }: { title: string; index: number }) {
  const states: Record<string, ReactNode> = {
    "Site Health": <><div className="platform-runner"><span>https://</span><b>example.com</b><button>Run audit</button></div><div className="platform-health-grid"><strong>78<small>/100</small></strong><div><b>2 critical</b><span>Review crawl blockers</span></div><div><b>5 warnings</b><span>Improve page quality</span></div></div><div className="platform-issue-list"><span><i /> AI crawler access <b>Ready</b></span><span><i /> Page descriptions <b>Review</b></span><span><i /> Internal links <b>Review</b></span></div></>,
    Tools: <><div className="platform-tool-tabs"><span>SEO</span><span>Content</span><span>AI visibility</span></div><div className="platform-tool-list"><span><b>Site Health Check</b><em>9 credits</em></span><span><b>Keyword Analysis</b><em>1 credit</em></span><span><b>AI Discovery Audit</b><em>10 credits</em></span></div><div className="platform-next-tool"><small>Recommended next tool</small><b>Technical SEO Crawler</b></div></>,
    Guide: <><div className="platform-guide-message"><img src="/guide-support.gif" alt="Guide" /><div><span>Guide</span><b>Start with the page closest to a customer decision.</b><p>I have grouped the highest-impact changes into a short, usable action list.</p></div></div><div className="platform-action-check"><i /> Publish a clearer service guide <b>+8 points</b></div></>,
    Projects: <><div className="platform-project-card"><div><span>Active project</span><b>example.com</b><em>Runs, keywords and data in one place.</em></div><button>Open</button></div><div className="platform-project-stats"><span><b>4</b> recent runs</span><span><b>25</b> keywords</span><span><b>1</b> data source</span></div><div className="platform-project-list"><span>Site Health Check <b>Ready</b></span><span>Keyword Analysis <b>Completed</b></span></div></>,
    Monitoring: <><div className="platform-monitor-head"><b>Website health</b><span>Clear view</span></div><svg className="platform-monitor-chart" viewBox="0 0 420 90" aria-hidden="true"><path d="M4 73 C43 62 67 67 98 46 S150 52 184 35 S238 46 268 22 S330 31 362 13 S390 17 416 5" /></svg><div className="platform-project-stats"><span><b>25</b> tracked keywords</span><span><b>3</b> scheduled runs</span><span><b>+6</b> since last scan</span></div></>,
    Schedules: <><div className="platform-schedule-feature"><span>Next scheduled run</span><b>Monday, 9:00 AM</b><em>Site Health Check</em></div><div className="platform-schedule-list"><span>Rank tracking <b>Every Monday</b><em>Active</em></span><span>AI Discovery Audit <b>Monthly</b><em>Active</em></span><span>Last completed run <b>Today</b><em>Ready</em></span></div></>,
  };
  return <div className="platform-composition"><div className="platform-composition-head"><span>{String(index + 1).padStart(2, "0")} / {title}</span><i /> Ready</div><div className="platform-composition-main">{states[title]}</div></div>;
}

export function CandidatePlatformPage() {
  const platformHandoffs: Record<string, string> = Object.fromEntries(platformSections.map(([title]) => [title, PLATFORM_URL]));
  return <MarketingShell><main className="candidate-public candidate-platform-page"><section className="candidate-page-hero"><div className="candidate-container"><span className="micro-label">THE GROWTH WORKSPACE PLATFORM</span><h1>A clearer operating system for website growth.</h1><p>Move from evidence to action across the work that makes a website easier to find, understand, and choose.</p><a className="candidate-primary-link" href={PLATFORM_URL}>Open the platform <ArrowRight size={16} /></a></div></section><section className="candidate-platform-story"><div className="candidate-container">{platformSections.map(([title, headline, copy], index) => <article key={title} className={index % 2 ? "platform-story-row reverse" : "platform-story-row"}><div><span className="micro-label">{String(index + 1).padStart(2, "0")} / {title}</span><h2>{headline}</h2><p>{copy}</p><a href={platformHandoffs[title] || PLATFORM_URL}>Explore {title} <ArrowRight size={16} /></a></div><PlatformComposition title={title} index={index} /></article>)}</div></section><section className="candidate-public-final candidate-public-final--video"><DecorativeVideo className="candidate-bg-video candidate-bg-video--final" /><div className="candidate-container"><span className="micro-label">START WITH THE SITE</span><h2>Find the next useful move.</h2><p>Run a free website audit before you decide how deep to go.</p><NextLink className="candidate-primary-link" href="/scan">Start free website audit <ArrowRight size={16} /></NextLink></div></section></main></MarketingShell>;
}

function LegacyCandidateToolsPage() {
  return <MarketingShell><main className="candidate-public candidate-tools-page"><section className="candidate-page-hero"><div className="candidate-container"><span className="micro-label">THE TOOL WORKSPACE</span><h1>Every webmaster tool, one connected workflow.</h1><p>Run the check that answers the question, then keep the result, next action, and project context in the same place.</p><a className="candidate-primary-link" href={`${PLATFORM_URL}tools`}>Open the tool workspace <ArrowRight size={16} /></a></div></section><section className="candidate-tool-start"><div className="candidate-container"><span className="micro-label">START HERE</span><h2>Build a clear first read.</h2><div>{["Site Health Check", "Keyword Analysis", "Rank Checker", "AI Discovery Audit"].map((tool, index) => <a href={`${PLATFORM_URL}tools`} key={tool}><b>0{index + 1}</b><span>{tool}</span><ChevronRight size={18} /></a>)}</div></div></section><section className="candidate-tool-catalog"><div className="candidate-container">{toolGroups.map(([group, names]) => <section key={group} id={group.toLowerCase().replace(/\s/g, "-")}><div className="tool-catalog-heading"><span className="micro-label">{group}</span><h2>{names.length} tools for {group.toLowerCase()} work.</h2><a href={`${PLATFORM_URL}tools`}>Open {group} <ArrowRight size={16} /></a></div><div className="tool-catalog-list">{names.map((name, index) => { const meta = toolMeta[name] || { copy: "Bring this signal into the workspace and use it to choose the next action." }; return <a href={`${PLATFORM_URL}tools`} key={name} className="candidate-tool-row"><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{name}</h3><p>{meta.copy}</p></div><span>{meta.credits || "Available"}</span><ChevronRight size={18} /></a>; })}</div></section>)}</div></section></main></MarketingShell>;
}

export function CandidateToolsPage() {
  return <MarketingShell>
    <main className="candidate-public candidate-tools-page">
      <section className="candidate-page-hero">
        <div className="candidate-container">
          <span className="micro-label">THE EASY WAY TO GROW ONLINE</span>
          <h1>Digital marketing made simple.</h1>
          <p>Everything you need to improve your online presence, brought together in one easy-to-use workspace. No expertise needed - we help you figure out what to do next.</p>
          <a className="candidate-primary-link" href={PLATFORM_URL}>Start for free <ArrowRight size={16} /></a>
        </div>
      </section>
      <section className="candidate-tool-start">
        <div className="candidate-container">
          <span className="micro-label">START HERE</span>
          <h2>Build a clear first read.</h2>
          <div>{["Site Health Check", "Keyword Analysis", "Rank Checker", "AI Discovery Audit"].map((tool, index) => <a href={`${PLATFORM_URL}tools`} key={tool}><b>0{index + 1}</b><span>{tool}</span><ChevronRight size={18} /></a>)}</div>
        </div>
      </section>
      <section className="candidate-tool-catalog">
        <div className="candidate-container">
          {toolGroups.map(([group, names]) => <section key={group} id={group.toLowerCase().replace(/\s/g, "-")}>
            <div className="tool-catalog-heading"><span className="micro-label">{group}</span><h2>{names.length} tools for {group.toLowerCase()} work.</h2><a href={`${PLATFORM_URL}tools`}>Open {group} <ArrowRight size={16} /></a></div>
            <div className="tool-catalog-list">{names.map((name, index) => { const meta = toolMeta[name] || { copy: "Bring this signal into the workspace and use it to choose the next action." }; return <a href={`${PLATFORM_URL}tools`} key={name} className="candidate-tool-row"><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{name}</h3><p>{meta.copy}</p></div><span>{meta.credits || "Available"}</span><ChevronRight size={18} /></a>; })}</div>
          </section>)}
        </div>
      </section>
    </main>
  </MarketingShell>;
}

export function CandidateSolutionsPage() {
  return <MarketingShell>
    <main className="candidate-public candidate-solutions-page">
      <section className="candidate-page-hero candidate-solutions-hero">
        <div className="candidate-container">
          <span className="micro-label">DIGITAL GROWTH, MADE CLEAR</span>
          <h1>Audit, plan, and improve every way people find you.</h1>
          <p>Growth Workspace brings SEO, AI visibility, content, technical health, conversion, analytics, and paid-media context into one practical growth system.</p>
          <a className="candidate-primary-link" href={PLATFORM_URL}>Get started free <ArrowRight size={16} /></a>
          <small className="audience-free-note">No credit card required. Free members receive 30 credits every month.</small>
        </div>
      </section>

      <section className="solution-capabilities">
        <div className="candidate-container">
          <div className="solution-section-heading">
            <span className="micro-label">ONE SYSTEM, FIVE GROWTH AREAS</span>
            <h2>Ask one question. Get the next useful action.</h2>
            <p>Use a focused check when you need an answer now, or connect the dots across the channels that shape your website’s growth.</p>
          </div>
          <div className="capability-rail">
            {solutionCapabilities.map((capability, index) => (
              <details className="growth-capability" key={capability.label} open={index === 0}>
                <summary>
                  <span>{capability.number}</span>
                  <div><b>{capability.label}</b><small>{capability.title}</small></div>
                  <ChevronRight size={18} />
                </summary>
                <div className="growth-capability-body">
                  <p>{capability.copy}</p>
                  <ul>{capability.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
                  <a href={`${PLATFORM_URL}tools`}>Explore the tool workspace <ArrowRight size={15} /></a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-depth-section">
        <div className="candidate-container">
          <div className="solution-section-heading solution-section-heading--split">
            <div><span className="micro-label">CHOOSE YOUR DEPTH</span><h2>Start simple. Go deeper when needed.</h2></div>
            <p>Growth Workspace is an audit and strategy workspace, not an agency service or a single-purpose plugin. Begin with the question in front of you, then add depth only when the work earns it.</p>
          </div>
          <div className="solution-depth-grid">
            <article>
              <span className="micro-label">QUICK START</span>
              <h3>Get a clear first read.</h3>
              <p>Use four focused checks to see what deserves attention before you invest in a larger programme of work.</p>
              <ul>{quickStartTools.map((tool, index) => <li key={tool}><b>0{index + 1}</b><span>{tool}</span><ChevronRight size={16} /></li>)}</ul>
              <a href={`${PLATFORM_URL}tools`}>Open the quick-start tools <ArrowRight size={15} /></a>
            </article>
            <article>
              <span className="micro-label">GO DEEPER</span>
              <h3>Keep the power in reserve.</h3>
              <p>Choose from 30+ specialist tools across Search, Technical, AI Visibility, Content, Strategy, and Integrations when the evidence calls for it.</p>
              <div className="solution-group-tags">{toolGroups.map(([group]) => <span key={group}>{group}</span>)}</div>
              <p className="solution-credit-note">Start free, spend capacity on the checks you choose, then add plan capacity or top-ups only as your workflow grows.</p>
              <a href={`${PLATFORM_URL}tools`}>See all tools <ArrowRight size={15} /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="candidate-solution-overview solution-audiences">
        <div className="candidate-container">
          <div className="solution-section-heading">
            <span className="micro-label">BUILT FOR HOW YOU WORK</span>
            <h2>One growth system. Six ways to use it.</h2>
            <p>Whether you are just starting or running a mature marketing operation, the workspace keeps the next decision clear without hiding the specialist depth behind it.</p>
          </div>
          <div className="candidate-solution-grid">
            {Object.entries(audienceRoutes).map(([slug, route], index) => {
              const media = audienceMedia[slug as keyof typeof audienceRoutes];
              return <article className="audience-route-card" key={slug}>
                <figure className="solution-card-media"><img src={media.image} alt={media.alt} /><figcaption>{media.caption}</figcaption></figure>
                <span className="micro-label">0{index + 1} / {route.label}</span>
                <h2>{route.title}</h2>
                <p>{route.copy}</p>
                <NextLink href={`/solutions/${slug}`}>Explore the workflow <ArrowRight size={16} /></NextLink>
              </article>;
            })}
          </div>
        </div>
      </section>
    </main>
  </MarketingShell>;
}

export function CandidateAudiencePage({ data, slug }: { data: (typeof audienceRoutes)[keyof typeof audienceRoutes]; slug: keyof typeof audienceRoutes }) {
  const tools = audienceToolMap[slug];
  const media = audienceMedia[slug];
  return <MarketingShell>
    <main className="candidate-public candidate-audience-page">
      <section className="candidate-page-hero candidate-audience-hero">
        <div className="candidate-container">
          <span className="micro-label">FOR {data.label.toUpperCase()}</span>
          <h1>{data.title}</h1>
          <p>{data.copy}</p>
          <a className="candidate-primary-link" href={PLATFORM_URL}>Get started free <ArrowRight size={16} /></a>
          <small className="audience-free-note">No credit card required. Free members receive 30 credits every month.</small>
        </div>
      </section>

      <section className="candidate-audience-detail">
        <div className="candidate-container">
          <div className="audience-problem-grid">
            <div>
              <span className="micro-label">THE PROBLEM TO SOLVE</span>
              <h2>Make the right marketing decision before doing more work.</h2>
              <p>{data.problem}</p>
              <div className="audience-channel-list"><span className="micro-label">THE SIGNALS THAT MATTER</span>{data.channels.map((channel) => <div key={channel}><Check size={15} />{channel}</div>)}</div>
            </div>
            <figure className="solution-media-card large"><img src={media.image} alt={media.alt} /><figcaption><b>{data.label}</b><span>{media.caption}</span></figcaption></figure>
          </div>

          <div className="audience-workflow-grid">
            <div>
              <span className="micro-label">THE WORKFLOW</span>
              <h2>Three steps. One connected workspace.</h2>
              <ol>{data.workflow.map((item, index) => <li key={item}><b>0{index + 1}</b><span>{item}</span></li>)}</ol>
            </div>
            <aside className="audience-guide-panel">
              <img src="/guide-support.gif" alt="Guide, the Growth Workspace AI growth concierge" />
              <div><span className="micro-label">GUIDE, YOUR AI GROWTH CONCIERGE</span><h3>Keep the next action approachable.</h3><p>Guide explains what the signal means, points to the page or tool to use, and keeps the next step clear enough to finish.</p></div>
              <blockquote>“Start with the evidence closest to the decision you want customers to make. I’ll keep the follow-up work in order.”</blockquote>
            </aside>
          </div>

          <div className="audience-tools">
            <span className="micro-label">RECOMMENDED TOOLS</span>
            <div>{tools.map((tool) => <a href={`${PLATFORM_URL}tools`} key={tool}><Wrench size={17} /><span>{tool}</span><ArrowRight size={16} /></a>)}</div>
          </div>

          <div className="audience-outcome">
            <span className="micro-label">THE OPERATIONAL OUTPUT</span>
            <h2>{data.output}</h2>
            <p>Keep the audit, the specialist analysis, the action guidance, and the next check connected to the same website in one audit-and-strategy workspace.</p>
            <div><NextLink className="candidate-secondary-link" href="/scan">See the audit path <ArrowRight size={16} /></NextLink><a className="candidate-primary-link" href={`${PLATFORM_URL}tools`}>Explore the tool workspace <ArrowRight size={16} /></a></div>
          </div>
        </div>
      </section>
    </main>
  </MarketingShell>;
}

export function CandidateIntegrationsPage() {
  const googleItems = integrationDetails.filter((item) => item.name !== "Meta" && item.name !== "LinkedIn");
  const extensionItems = integrationDetails.filter((item) => item.name === "Meta" || item.name === "LinkedIn");
  const IntegrationRows = ({ items }: { items: typeof integrationDetails }) => <div className="candidate-data-layer-list">{items.map((item) => <article key={item.name}><img className={item.name === "LinkedIn" ? "linkedin-logo" : ""} src={item.logo} alt={`${item.name} logo`} /><div><b>{item.name}</b><p>{item.copy}</p></div><em>{item.state}</em></article>)}</div>;
  return <MarketingShell><main className="candidate-public candidate-integrations-page"><section className="candidate-page-hero"><div className="candidate-container"><span className="micro-label">CONNECTED DATA</span><h1>Bring the signals behind your website together.</h1><p>Start with the Google account your team already uses, then keep search, analytics, and campaign context next to site quality.</p><a className="candidate-primary-link" href={PLATFORM_URL}>Connect in platform <ArrowRight size={16} /></a></div></section><section className="candidate-integration-story"><div className="candidate-container"><div className="data-layer-lead"><img src="/integrations/google.svg" alt="Google logo" /><div><span className="micro-label">THE GOOGLE DATA LAYER</span><h2>One account. The context behind better website decisions.</h2><p>Connect Google once in the platform to bring the signals that show how people discover, engage with, and convert through your website.</p></div></div><IntegrationRows items={googleItems} /><div className="data-layer-extension"><span className="micro-label">EXTEND THE VIEW</span><h2>Advertising context when it is ready to connect.</h2><IntegrationRows items={extensionItems} /></div><div className="integration-action"><a className="candidate-primary-link" href={PLATFORM_URL}>Explore integrations in platform <ArrowRight size={16} /></a></div></div></section></main></MarketingShell>;
}
