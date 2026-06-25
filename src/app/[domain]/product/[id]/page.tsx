import { supabase } from '@/lib/supabase';
import ProductClient from './ProductClient';
import { notFound } from 'next/navigation';
import { getTenantFromHost } from '@/lib/tenant';

export default async function ProductPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ domain: string; id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const store = await getTenantFromHost(resolvedParams.domain);
  
  if (!store) {
    notFound();
  }

  // Fetch product data on the server
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', resolvedParams.id)
    .eq('store_id', store.id)
    .single();

  if (!product) {
    notFound();
  }

  if (product.visibility !== 'Visible' && resolvedSearchParams.preview !== 'true') {
    notFound();
  }

  // Pass the fetched product data directly to the client component
  // so that it renders instantly without a loading screen
  return <ProductClient initialProduct={product} store={store} />;
}
