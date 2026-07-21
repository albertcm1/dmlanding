export const PLATFORM_URL = "https://platform.digimetrics.ai/";

export type Audience = {
  key: string;
  label: string;
  title: string;
  copy: string;
  actions: string[];
  visual: "owner" | "independent" | "team" | "agency" | "ecommerce" | "local";
  image: string;
  imageAlt: string;
  caption: string;
  objectPosition?: string;
};

export const audiences: Audience[] = [
  { key: "owners", label: "Business owners", title: "Find the work worth doing next.", copy: "See where visibility, trust, and conversion are losing attention, then follow a plain-English plan to improve the site.", actions: ["See what is holding the site back", "Get the next actions in plain English", "Keep every improvement in one plan"], visual: "owner", image: "/audience-business-owners.jfif", imageAlt: "Business owner reviewing a growth plan on a tablet", caption: "Priority plan ready", objectPosition: "center 38%" },
  { key: "independent-marketers", label: "Independent marketers", title: "A full growth toolkit, without a stack of subscriptions.", copy: "Start with the site, choose the next useful check, and keep the evidence and action in one focused workspace.", actions: ["Start with one clear question", "Use specialist tools only when needed", "Keep the next action and result together"], visual: "independent", image: "/audience-independent-marketers.png", imageAlt: "Independent marketer reviewing website growth signals", caption: "Next useful tool ready" },
  { key: "teams", label: "Marketing teams", title: "Turn every signal into an operating rhythm.", copy: "Bring SEO, AI visibility, content, social, conversion, and analytics context into one view your team can act on each week.", actions: ["Prioritize work by business impact", "Turn findings into accountable tasks", "Report progress without spreadsheet drift"], visual: "team", image: "/audience-marketing-teams.jfif", imageAlt: "Marketing team reviewing a shared digital growth plan", caption: "Next action ready" },
  { key: "agencies", label: "Agencies", title: "Make every recommendation easier to prove.", copy: "Create a repeatable audit workflow that turns technical evidence into client-ready priorities and clearer commercial value.", actions: ["Audit more sites with a repeatable method", "Explain the value of each fix", "Keep client work moving between meetings"], visual: "agency", image: "/audience-agencies.jfif", imageAlt: "Agency team working with marketing dashboards", caption: "Client priorities in view" },
  { key: "ecommerce", label: "Ecommerce", title: "Protect discovery all the way to checkout.", copy: "Find the category, product, trust, and performance gaps that make it harder for shoppers to find and choose you.", actions: ["Prioritize revenue pages", "Strengthen product discovery signals", "Reduce friction before the next click"], visual: "ecommerce", image: "/audience-ecommerce.png", imageAlt: "Ecommerce owner reviewing products and orders", caption: "Revenue path in view" },
  { key: "local", label: "Local services", title: "Make high-intent demand easier to capture.", copy: "Improve service pages, local relevance, trust proof, and the paths that turn searches into calls and enquiries.", actions: ["Clarify service and location intent", "Surface trust at the decision point", "Track searches that create calls"], visual: "local", image: "/audience-local-services.png", imageAlt: "Local service owner in a workshop", caption: "Local demand mapped" }
];

export const proof = [
  ["30+", "webmaster tools", "One connected workspace for search, technical, content, strategy, paid-media context, and AI visibility."],
  ["50+", "checks per scan", "Evidence across crawl access, pages, structure, content, trust, and conversion."],
  ["5", "growth categories", "Search, technical health, AI visibility, content, and conversion in one view."],
  ["14", "day action plan", "A practical sequence for what to fix first, what to publish next, and what to track."]
] as const;

export const workflow = [
  ["01", "Diagnose", "Read the signals that shape how people and answer engines find your site.", "Website Audit"],
  ["02", "Prioritize", "Separate urgent blockers from useful opportunities with a clear impact order.", "Action Plan"],
  ["03", "Fix with Monty", "Turn each finding into a plain-English instruction your team can complete.", "AI concierge"],
  ["04", "Track", "Rescan, monitor movement, and keep the next best action visible.", "Monitoring"]
] as const;

export const products = [
  ["Website Audit", "Read crawl access, page structure, content coverage, and conversion paths in one place.", "Crawl", "Access and structure"],
  ["AI Visibility", "Understand whether answer engines can find, trust, and cite the pages that matter.", "AI-ready", "Evidence-led visibility"],
  ["Monty", "Move from a technical finding to a calm, page-level plan your team can complete.", "Next", "Action guidance"],
  ["Monitoring", "Track rankings, site health, visibility signals, and completed work over time.", "Track", "Movement over time"],
  ["Schedules", "Keep recurring checks running so the next useful signal is ready when you need it.", "Run", "Automated cadence"]
] as const;

export const toolGroups = [
  ["SEO and Search", ["Keyword Analysis", "Rank Checker", "Time to Rank", "Anchor Text Cleaner", "Technical SEO Crawler", "On-Page Optimisation", "Page Technical & Domain Analysis", "Page Speed Check", "Competitors Identifier", "Backlinks Explorer", "Schema Generator", "SEO Strategy", "SEO Diagnostics"]],
  ["Content and Social", ["Caption Generator", "AI Content Optimiser", "Content Checker", "Content Pillar Framework"]],
  ["AI Visibility and GEO", ["AI Discovery Audit", "AI Mentions Tracker", "llms.txt Generator", "GEO On-Page Optimisation", "GEO+SEO Forensic Audit"]],
  ["Strategy and Paid Media", ["Persona Generator", "Media Plan Generator", "Landing Page Audit", "SEM Ad Copy Generator", "Performance Marketing Audit", "Social Media Audit"]],
  ["Connected Data", ["Search Console", "Google Analytics (GA4)", "Google Ads", "Meta Ads", "LinkedIn Ads"]]
] as const;

export const platformToolUrls: Record<string, string> = {
  "Keyword Analysis": "/tool/keyword-analysis", "Rank Checker": "/tool/rank-checker", "Time to Rank": "/tool/time-to-rank", "Anchor Text Cleaner": "/tool/anchor-cleaner", "Technical SEO Crawler": "/tool/technical-seo", "On-Page Optimisation": "/tool/onpage", "Page Technical & Domain Analysis": "/tool/page-analysis", "Page Speed Check": "/tool/page-speed", "Competitors Identifier": "/tool/competitors", "Backlinks Explorer": "/tool/backlinks", "Schema Generator": "/tool/schema", "SEO Strategy": "/tool/strategy-engine", "SEO Diagnostics": "/seo-diagnostics",
  "Caption Generator": "/tool/caption", "AI Content Optimiser": "/tool/content-writer", "Content Checker": "/tool/content-check", "Content Pillar Framework": "/tool/pillars",
  "AI Discovery Audit": "/tool/ai-discovery", "AI Mentions Tracker": "/tool/ai-mentions", "llms.txt Generator": "/tool/llms-txt", "GEO On-Page Optimisation": "/tool/geo-onpage", "GEO+SEO Forensic Audit": "/tool/forensic-audit",
  "Persona Generator": "/tool/persona", "Media Plan Generator": "/tool/media-plan", "Landing Page Audit": "/tool/landing-audit", "SEM Ad Copy Generator": "/tool/sem-copy", "Performance Marketing Audit": "/performance-audit", "Social Media Audit": "/social-audit",
  "Search Console": "/tool/gsc", "Google Analytics (GA4)": "/tool/ga4", "Google Ads": "/tool/google-ads", "Meta Ads": "/tool/meta-ads", "LinkedIn Ads": "/tool/linkedin-ads"
};

export const toolMeta: Record<string, { copy: string; credits?: string; runtime?: string }> = {
  "Keyword Analysis": { copy: "Find terms worth pursuing by intent, difficulty, and opportunity." }, "Rank Checker": { copy: "Check search positions by location and keep the ranking context with the project." }, "Time to Rank": { copy: "Estimate the work and momentum needed to reach a stronger position." }, "Anchor Text Cleaner": { copy: "Audit anchor text so links explain the next page to people and search engines." }, "Technical SEO Crawler": { copy: "Find crawl, metadata, internal-link, and indexability issues across priority pages." }, "On-Page Optimisation": { copy: "Improve a page's structure, relevance, and chance of outranking the competition." }, "Page Technical & Domain Analysis": { copy: "Review authority, backlinks, organic traffic, SSL, and page-level signals in one read." }, "Page Speed Check": { copy: "See where page performance could make visitors or search engines wait." }, "Competitors Identifier": { copy: "Find who appears for priority terms and understand how their pages are built." }, "Backlinks Explorer": { copy: "Review referring domains and authority signals around competing pages." }, "Schema Generator": { copy: "Create structured data for richer search results without starting from code." }, "SEO Strategy": { copy: "Turn keyword opportunities into an ordered search plan the team can execute." }, "SEO Diagnostics": { copy: "Bring the highest-impact SEO signals into one focused health check." },
  "Caption Generator": { copy: "Create channel-ready captions for LinkedIn, Instagram, Facebook, and TikTok." }, "AI Content Optimiser": { copy: "Improve a draft against search intent, structure, and audience expectations." }, "Content Checker": { copy: "Review readability, keyword coverage, compliance, and brand guidance before publishing." }, "Content Pillar Framework": { copy: "Turn a topic into a connected pillar, subtopic, and angle map for sustained publishing." },
  "AI Discovery Audit": { copy: "See whether answer engines can understand and surface your business." }, "AI Mentions Tracker": { copy: "Track brand mentions across AI answers and watch visibility change over time." }, "llms.txt Generator": { copy: "Generate an AI-readable site guide from the pages and facts you want understood." }, "GEO On-Page Optimisation": { copy: "Improve the pages most likely to be read, cited, and recommended by answer engines." }, "GEO+SEO Forensic Audit": { copy: "Combine SEO, AI visibility, speed, authority, and structured data into a prioritized diagnosis." },
  "Persona Generator": { copy: "Build useful audience profiles from the market, offer, and customer context you provide." }, "Media Plan Generator": { copy: "Map channels, budget, audiences, and campaign roles into a practical media plan." }, "Landing Page Audit": { copy: "Review conversion clarity, speed, search intent, and the next decision a visitor should take." }, "SEM Ad Copy Generator": { copy: "Create concise search-ad variations grounded in the offer and intent you want to win." }, "Performance Marketing Audit": { copy: "Review channel mix, budget allocation, and the opportunities behind paid-media performance." }, "Social Media Audit": { copy: "Assess profiles, content opportunities, and competitor signals across key social channels." },
  "Search Console": { copy: "Bring clicks, impressions, CTR, and position into the workspace." }, "Google Analytics (GA4)": { copy: "Add engagement and conversion context to website decisions." }, "Google Ads": { copy: "Connect campaign spend, clicks, conversions, and CPA." }, "Meta Ads": { copy: "Prepare paid-social context as the integration becomes available." }, "LinkedIn Ads": { copy: "Connect LinkedIn campaign performance to the wider growth view." }
};

export const plans = [
  { name: "Free", price: "S$0", annualPrice: "S$0", detail: "Kick the tyres. Real tools, capped results.", features: ["30 credits / month (about 30 caption or keyword runs)", "1 project", "Caption Generator", "Capped keyword and rank results"] },
  { name: "Starter", price: "S$39", annualPrice: "S$31.20", detail: "For solo marketers shipping content and SEO.", features: ["500 credits / month (about 100 AI articles or 500 keyword checks)", "3 projects", "Full SEO Toolkit", "Full AI Content Studio", "25 tracked keywords", "3 scheduled runs"] },
  { name: "Pro", price: "S$109", annualPrice: "S$87.20", detail: "The serious operator plan for AI visibility and ad integrations.", features: ["2,000 credits / month (about 400 AI articles or 40 deep site audits)", "10 projects", "AI Visibility (GEO) suite", "Google, Meta, and GA4 integrations", "250 tracked keywords", "15 scheduled runs (daily)"] },
  { name: "Expert", price: "S$199", annualPrice: "S$159.20", detail: "For agencies-of-one and power users.", features: ["6,000 credits / month (about 1,200 AI articles or 120 deep site audits)", "25 projects", "White-label PDF export", "API access", "1,000 tracked keywords", "50 scheduled runs (daily)"] }
] as const;

export const integrationDetails = [
  { name: "Google account", logo: "/integrations/google.svg", state: "Available in platform", copy: "One sign-in connects Search Console, Analytics, and Ads." },
  { name: "Google Search Console", logo: "/integrations/google-search-console.svg", state: "Connected through Google", copy: "Bring clicks, impressions, CTR, and position into the growth view." },
  { name: "Google Analytics 4", logo: "/integrations/google-analytics.svg", state: "Connected through Google", copy: "Add sessions, users, engagement, and conversion context." },
  { name: "Google Ads", logo: "/integrations/google-ads.svg", state: "Connected through Google", copy: "Compare spend, clicks, conversions, and CPA with landing-page quality." },
  { name: "Meta", logo: "/integrations/meta.svg", state: "Coming soon", copy: "Facebook and Instagram ad performance is in platform development." },
  { name: "LinkedIn", logo: "/integrations/linkedin.svg", state: "Connect in platform", copy: "Bring LinkedIn campaign performance into your wider growth view." }
];
export const integrations = integrationDetails.map((integration) => integration.name);

export const credibility = {
  clientNames: ["SHATEC", "China Telecom", "Guardian", "SEIKO", "Travelodge", "JLL"],
  markers: ["Google Partner", "Meta Partner", "Independent Agency of the Year", "Company of Good"],
  relationship: "Digimetrics.ai is a product by MediaOne."
} as const;

export const contactDetails = {
  address: "1 Neil Road #03-02, Singapore 088804",
  email: "contact@mediaone.co",
  phone: "+65 6965 7008",
  hours: "Monday to Friday, 9:00 AM to 6:00 PM. Saturday by appointment."
} as const;

export const faqs = [
  ["What does the free audit include?", "It reviews public crawl, search, AI visibility, content, technical, and conversion signals, then turns the findings into a prioritized action plan."],
  ["Do I need an account to see the report?", "Yes. Create a free workspace to run the audit and view the report. Your workspace keeps findings, tool runs, and next actions together."],
  ["How do credits work?", "Credits are used when you run tools. Every plan includes a monthly allowance, and the workspace shows the cost before you run a deeper analysis."],
  ["Can my team use the same workspace?", "Yes. Plans are organized around projects, credits, tracked keywords, and the workflows your team runs repeatedly."],
  ["Does Digimetrics replace Search Console or GA4?", "No. It brings those signals into a clearer operating view alongside technical, content, AI visibility, and conversion work."],
  ["What does Monty do?", "Monty turns evidence-backed findings into specific next steps, plain-English guidance, and a simple way to verify the improvement."]
] as const;

export const audienceRoutes = {
  "business-owners": { label: "Business Owners", title: "A clear growth plan, without the marketing jargon.", copy: "Digimetrics shows you what is holding your website back, what to fix first, and how to know the work helped.", problem: "You need to know which website work is worth funding or finishing before another month goes by.", channels: ["SEO and local discovery", "AI/GEO readiness", "Conversion and trust"], output: "A short, plain-English action plan that keeps the next useful improvement visible.", workflow: ["Run a focused audit", "Follow the highest-impact actions", "Track the progress that matters"] },
  "independent-marketers": { label: "Independent Marketers", title: "A full growth toolkit, without a stack of subscriptions.", copy: "Start with the site, choose only the next useful check, and keep the evidence and action in one focused workspace.", problem: "You need specialist depth without buying, learning, and stitching together a different subscription for every question.", channels: ["SEO and rankings", "AI visibility and GEO", "Content and landing pages"], output: "A focused workflow that gives you the right depth without another disconnected tool.", workflow: ["Audit the site to find the clearest starting point", "Choose the next useful specialist tool", "Use Monty to act, then monitor what changed"] },
  "marketing-teams": { label: "Marketing Teams", title: "Every signal, priority, and result in one operating view.", copy: "Replace scattered checks and competing priorities with one evidence-led growth cadence.", problem: "You need one shared view of what to improve across search, content, AI visibility, analytics, and conversion work.", channels: ["Search, analytics, and paid context", "Content, social, and AI visibility", "Conversion and technical health"], output: "A shared operating view that turns recurring signals into work the team can prioritize every week.", workflow: ["Bring search and site signals together", "Assign work by impact and effort", "Report progress with confidence"] },
  agencies: { label: "Agencies", title: "Turn deeper audits into clearer client value.", copy: "Create a consistent way to discover issues, explain their value, and keep client work moving.", problem: "You need a repeatable way to turn technical evidence into priorities clients can understand and approve.", channels: ["Technical and search evidence", "AI visibility and content", "Client-ready priorities"], output: "A repeatable audit-to-action process that makes each recommendation easier to explain and carry forward.", workflow: ["Run a repeatable audit", "Turn findings into client-ready actions", "Keep recommendations tied to outcomes"] },
  ecommerce: { label: "Ecommerce", title: "Protect product discovery from search to checkout.", copy: "Find category, product, trust, and performance issues before they become lost demand.", problem: "You need product and category pages to stay easy to find, credible to choose, and simple to buy from.", channels: ["Category and product discovery", "Trust and page intent", "Conversion paths"], output: "A connected view of the revenue pages, discovery signals, and friction points that deserve attention.", workflow: ["Protect priority product paths", "Strengthen discovery and trust", "Track movement across revenue pages"] },
  "local-services": { label: "Local Services", title: "Win more high-intent demand in every market you serve.", copy: "Improve service pages, local relevance, trust proof, and the paths that turn searches into calls.", problem: "You need the services people search for to be easy to find, credible to choose, and simple to contact.", channels: ["Service and location intent", "Trust and local relevance", "Calls and enquiries"], output: "A practical plan for making needed services easier to find, understand, and contact.", workflow: ["Clarify every service and market", "Make proof easy to find", "Measure the searches that create action"] }
} as const;

export const cleanDomain = (value: string) => {
  const candidate = value.trim().replace(/^https?:\/\//i, "").split("/")[0].split("?")[0].split("#")[0].replace(/^www\./i, "");
  return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(candidate) ? candidate.toLowerCase() : "yourbusiness.com";
};
