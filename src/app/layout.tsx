import type { Metadata } from "next";
import "./globals.css";
import "./neon-polish.css";
import "./candidate.css";
import "./roboto-system.css";
import "./pricing.css";
import { ThemeProvider, themeInitScript } from "./theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://growth-workspace-search-atlas-3.pages.dev"),
  title: { default: "Growth Workspace | Website growth, made clear.", template: "%s | Growth Workspace" },
  description: "Growth Workspace helps website owners find the next best move across search, content, technical health, AI visibility, and conversion.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Growth Workspace", title: "Website growth, made clear.", description: "Find the next best move across search, content, technical health, AI visibility, and conversion.", images: [{ url: "/audience-team.png", width: 1536, height: 1024, alt: "Growth Workspace website growth workspace" }] },
  twitter: { card: "summary_large_image", title: "Growth Workspace | Website growth, made clear.", description: "Turn website signals into your next best move.", images: ["/audience-team.png"] }
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><link rel="icon" href="/icon.svg" type="image/svg+xml" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" /><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head><body><ThemeProvider>{children}</ThemeProvider></body></html>;
}
