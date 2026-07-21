import type { Metadata } from "next";
import "./globals.css";
import "./neon-polish.css";
import "./candidate.css";
import "./roboto-system.css";
import "./pricing.css";
import { ThemeProvider, themeInitScript } from "./theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://digimetrics-search-atlas-3.pages.dev"),
  title: { default: "Digimetrics.ai | Marketing made simple for everyone.", template: "%s | Digimetrics.ai" },
  description: "Digimetrics.ai is an AI-powered audit, strategy, and action workspace for SEO, AI visibility, content, technical health, conversion, analytics, and paid-media context.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Digimetrics.ai", title: "Marketing made simple for everyone.", description: "Everything you need to market and grow, with an AI concierge to guide you.", images: [{ url: "/audience-marketing-teams.jfif", width: 1536, height: 1024, alt: "A Digimetrics.ai marketing team workspace" }] },
  twitter: { card: "summary_large_image", title: "Digimetrics.ai | Marketing made simple for everyone.", description: "Everything you need to market and grow, with an AI concierge to guide you.", images: ["/audience-marketing-teams.jfif"] }
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><link rel="icon" href="/icon.svg" type="image/svg+xml" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" /><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head><body><ThemeProvider>{children}</ThemeProvider></body></html>;
}
