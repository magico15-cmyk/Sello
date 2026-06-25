import { notFound } from "next/navigation";
import { getTenantFromHost } from "@/lib/tenant";
import FAQClient from "./FAQClient";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function FAQPage({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const store = await getTenantFromHost(resolvedParams.domain);

  if (!store) {
    notFound();
  }

  return <FAQClient store={store} />;
}
