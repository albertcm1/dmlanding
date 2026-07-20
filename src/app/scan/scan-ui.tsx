"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cleanDomain } from "../../lib/data";
import { MarketingShell } from "../launch-ui";

const phases = ["Checking crawl access", "Mapping priority pages", "Comparing AI visibility", "Scoring revenue pages", "Building your action plan"];

export function ScanExperience() {
  const [domain, setDomain] = useState("yourbusiness.com");
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const value = cleanDomain(new URLSearchParams(window.location.search).get("site") || "yourbusiness.com");
    setDomain(value);
    const timers = phases.map((_, index) => window.setTimeout(() => setPhase(index), index * 900));
    const redirect = window.setTimeout(() => { window.location.href = `/report?site=${encodeURIComponent(value)}`; }, 5600);
    return () => { timers.forEach(window.clearTimeout); window.clearTimeout(redirect); };
  }, []);
  const progress = Math.min(96, (phase + 1) * 20);
  return <MarketingShell><main><section className="scan-page scan-experience"><div className="neon-wrap scan-center"><div className="scan-copy"><span className="eyebrow teal-text">Website audit</span><h1>Reading <span>{domain}</span>.</h1><p>Growth Workspace is building a clear view of the work behind your next result.</p><div className="scan-progress"><div><span>Audit progress</span><b>{progress}%</b></div><i><s style={{ width: `${progress}%` }} /></i></div><div className="scan-list" aria-live="polite">{phases.map((item, index) => <div className={index <= phase ? "complete" : ""} key={item}><span>{index < phase ? <Check size={15} /> : index === phase ? <i className="pulse" /> : <i />}</span>{item}<em>{index < phase ? "Complete" : index === phase ? "Working" : "Queued"}</em></div>)}</div></div></div></section></main></MarketingShell>;
}
