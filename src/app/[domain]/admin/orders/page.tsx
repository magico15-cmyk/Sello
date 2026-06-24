import { getTenantFromHost } from "@/lib/tenant";
import OrdersClient from "./OrdersClient";

export default async function OrdersPage(props: { params: Promise<{ domain: string }> }) {
  const params = await props.params;
  const store = await getTenantFromHost(params.domain);

  return <OrdersClient storeId={store?.id} />;
}
