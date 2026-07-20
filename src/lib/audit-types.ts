export type AudiencePath = "owner" | "marketer" | "agency" | "ecommerce" | "local";

export type OnboardingProfile = {
  businessType: string;
  role: string;
  teamSize: string;
  priorities: string[];
  market: string;
  path: AudiencePath;
};

export type CrawledPage = {
  url: string;
  status: number;
  title: string;
  description: string;
  canonical: string;
  headings: string[];
  h1Count: number;
  wordCount: number;
  internalLinks: number;
  externalLinks: number;
  imageCount: number;
  missingAltCount: number;
  scriptCount: number;
  schemaTypes: string[];
  hasCta: boolean;
  hasTrustSignals: boolean;
  hasPolicySignals: boolean;
};

export type CrawlEvidence = {
  id: string;
  site: string;
  origin: string;
  createdAt: string;
  robotsFound: boolean;
  robotsBlocked: boolean;
  robotsText: string;
  sitemapFound: boolean;
  llmsTxtFound: boolean;
  pages: CrawledPage[];
  errors: string[];
};

export type AuditCategory = "Technical Health" | "Search Visibility" | "AI Visibility" | "Content" | "Conversion";
export type AuditSeverity = "Critical" | "High" | "Medium" | "Opportunity";

export type AuditFinding = {
  id: string;
  category: AuditCategory;
  severity: AuditSeverity;
  title: string;
  evidence: string[];
  whyItMatters: string;
  actions: string[];
  expectedLift: "High" | "Medium" | "Foundational";
  effort: "Quick win" | "1-2 hours" | "Half day" | "Multi-day";
  tools: string[];
  sourceUrls: string[];
  points: number;
};

export type AuditReport = {
  id: string;
  site: string;
  createdAt: string;
  expiresAt: string;
  profile: OnboardingProfile;
  siteProfile: {
    pagesInspected: number;
    platformSignals: string[];
    sourceUrls: string[];
  };
  scores: Record<AuditCategory, number> & { Overall: number };
  executiveSummary: string;
  findings: AuditFinding[];
  actionPlan: {
    day7: string[];
    day14: string[];
    day30: string[];
  };
  evidence: {
    robotsFound: boolean;
    robotsBlocked: boolean;
    sitemapFound: boolean;
    llmsTxtFound: boolean;
  };
};

export type CrawlResponse = {
  crawlId?: string;
  cachedReportId?: string;
  status: "crawled" | "cached";
  crawl?: CrawlEvidence;
};
