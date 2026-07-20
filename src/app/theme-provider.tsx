"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type SiteTheme = "neon" | "light" | "midnight";

export type ThemeContextValue = {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
};

const STORAGE_KEY = "growth-workspace-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>("midnight");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setThemeState("midnight");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.theme = "midnight";
    window.localStorage.setItem(STORAGE_KEY, "midnight");
  }, [hydrated, theme]);

  const setTheme = (_nextTheme: SiteTheme) => setThemeState("midnight");

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

export const themeInitScript = `(function(){try{document.documentElement.dataset.theme='midnight';localStorage.setItem('${STORAGE_KEY}','midnight');}catch(e){}})()`;
