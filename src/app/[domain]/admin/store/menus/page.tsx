import { notFound } from "next/navigation";
import { getTenantFromHost } from "@/lib/tenant";
import MenusClient from "./MenusClient";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function StoreMenusPage({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const store = await getTenantFromHost(resolvedParams.domain);

  if (!store) {
    notFound();
  }

  return (
    <div className="p-4 md:p-6 flex-1 min-w-0 flex flex-col min-h-[calc(100vh-80px)]">
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menus</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your store's header and footer navigation menus.</p>
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-lg border border-gray-200">
        <MenusClient storeId={store.id} domain={store.domain} />
      </div>
    </div>
  );
}
