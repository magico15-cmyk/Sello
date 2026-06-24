import { supabase } from "./supabase";

export async function getTenantFromHost(hostname: string) {
  // If we are on localhost:3000, we might want a default fallback store
  // For production, the hostname will be something like "mystore.sello.com" or a custom domain
  
  // Clean hostname (e.g., remove port in local dev if needed, though middleware handles some of this)
  const cleanHostname = hostname.split(':')[0];

  let query = supabase
    .from('stores')
    .select('id, store_name, subdomain, custom_domain')
    .or(`subdomain.eq.${cleanHostname},custom_domain.eq.${cleanHostname}`)
    .single();

  const { data: store, error } = await query;

  if (error || !store) {
    return null;
  }

  return store;
}
