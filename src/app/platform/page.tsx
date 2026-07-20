"use client";

import { useEffect } from "react";

const PLATFORM_URL = "https://example.com/";

export default function Page() {
  useEffect(() => {
    window.location.replace(PLATFORM_URL);
  }, []);

  return <main className="platform-handoff"><p>Opening the Growth Workspace platform.</p><a href={PLATFORM_URL}>Open platform</a></main>;
}
