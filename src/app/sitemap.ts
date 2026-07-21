import type { MetadataRoute } from "next";

const routes = ["", "platform", "tools", "solutions", "solutions/business-owners", "solutions/independent-marketers", "solutions/marketing-teams", "solutions/agencies", "solutions/ecommerce", "solutions/local-services", "industries", "integrations", "pricing", "security", "contact", "onboarding", "scan", "report", "privacy", "terms"];
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((route) => ({ url: `https://digimetrics-search-atlas-3.pages.dev/${route}`, lastModified: new Date("2026-07-21"), changeFrequency: "monthly", priority: route === "" ? 1 : .7 })); }
