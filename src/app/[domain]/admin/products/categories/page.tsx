import CategoriesClient from "./CategoriesClient";
import { getTenantFromHost } from "@/lib/tenant";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Categories | Admin",
  description: "Manage your product categories",
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function CategoriesPage({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const store = await getTenantFromHost(resolvedParams.domain);

  if (!store) {
    notFound();
  }

  return (
    <div className="p-4 md:p-6 flex-1 min-w-0 flex flex-col min-h-[calc(100vh-80px)]">
      <CategoriesClient storeId={store.id} />
    </div>
  );
}
