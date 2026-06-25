import { notFound } from "next/navigation";
import { getTenantFromHost } from "@/lib/tenant";
import AboutClient from "./AboutClient";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function AboutPage({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const store = await getTenantFromHost(resolvedParams.domain);

  if (!store) {
    notFound();
  }

  return <AboutClient store={store} />;
}
