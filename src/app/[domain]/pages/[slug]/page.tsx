import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getTenantFromHost } from "@/lib/tenant";
import CustomPageClient from "./CustomPageClient";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function CustomStorePage({ params }: { params: Promise<{ domain: string, slug: string }> }) {
  const resolvedParams = await params;
  const store = await getTenantFromHost(resolvedParams.domain);
  
  if (!store) {
    notFound();
  }

  // Fetch the page content
  const { data: page } = await supabase
    .from('store_pages')
    .select('*')
    .eq('store_id', store.id)
    .eq('slug', resolvedParams.slug)
    .eq('is_published', true)
    .single();

  if (!page) {
    notFound();
  }

  return <CustomPageClient store={store} page={page} />;
}
