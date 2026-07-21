"use client";

import { useEffect } from "react";

const PLATFORM_URL = "https://platform.digimetrics.ai/";

export default function Page() {
  useEffect(() => {
    window.location.replace(PLATFORM_URL);
  }, []);

  return <main className="platform-handoff"><p>Opening the Digimetrics.ai platform.</p><a href={PLATFORM_URL}>Open platform</a></main>;
}
