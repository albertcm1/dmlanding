import { notFound } from "next/navigation";
import { CandidateAudiencePage } from "../../candidate-pages";
import { audienceRoutes } from "../../../lib/data";

export function generateStaticParams() { return Object.keys(audienceRoutes).map((slug) => ({ slug })); }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = audienceRoutes[slug as keyof typeof audienceRoutes];
  if (!data) notFound();
  return <CandidateAudiencePage data={data} slug={slug as keyof typeof audienceRoutes} />;
}
