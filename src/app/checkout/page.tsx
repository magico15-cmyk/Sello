import { supabase } from '@/lib/supabase';
import CheckoutClient from './CheckoutClient';
import { notFound, redirect } from 'next/navigation';

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ productId?: string, package?: string }> }) {
  const resolvedParams = await searchParams;
  const productId = resolvedParams.productId;
  const packageIdStr = resolvedParams.package || '1';
  
  if (!productId) {
    redirect('/');
  }

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (!product) {
    notFound();
  }

  // extract the packages
  let pkgs = [];
  const bundlesBlock = product.content_blocks?.find((b: any) => b.type === 'bundles');
  
  let mainImage = '';
  try {
    const imgs = JSON.parse(product.image);
    if (Array.isArray(imgs) && imgs.length > 0) mainImage = imgs[0];
  } catch(e) {}
  
  if (bundlesBlock && bundlesBlock.content && bundlesBlock.content.length > 0) {
    pkgs = bundlesBlock.content.map((pkg: any) => ({
      ...pkg,
      price: pkg.price ? (String(pkg.price).startsWith('$') ? pkg.price : `$${pkg.price}`) : ''
    }));
  } else {
    pkgs = [{ id: 1, title: 'Single', price: `$${product.price}`, image: mainImage }];
  }
  
  const pkgIdNum = parseInt(packageIdStr) || 1;
  let foundPkg = pkgs.find((p: any) => p.id === pkgIdNum) || pkgs.find((p: any) => p.id === packageIdStr);
  if (!foundPkg) foundPkg = pkgs[0];
  
  const selectedPkg = {
    ...foundPkg,
    image: foundPkg.image || mainImage // fallback to main image if bundle doesn't have one
  };

  return <CheckoutClient product={product} selectedPkg={selectedPkg} />;
}
