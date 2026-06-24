import { supabase } from '@/lib/supabase';
import ProductClient from './ProductClient';
import { notFound } from 'next/navigation';
import { getTenantFromHost } from '@/lib/tenant';

export default async function ProductPage(props: { params: Promise<{ domain: string; id: string }> }) {
  const params = await props.params;
  const store = await getTenantFromHost(params.domain);
  
  if (!store) {
    notFound();
  }

  // Fetch product data on the server
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .eq('store_id', store.id)
    .single();

  if (!product) {
    notFound();
  }

  // Pass the fetched product data directly to the client component
  // so that it renders instantly without a loading screen
  return <ProductClient initialProduct={product} />;
}
