import { NextRequest, NextResponse } from "next/server";
import { withTenant, TenantContext } from "@/lib/tenant/withTenant";

export const GET = withTenant(async (req: NextRequest, context: TenantContext) => {
  return NextResponse.json({ store: context.tenant });
});

export const PATCH = withTenant(async (req: NextRequest, context: TenantContext) => {
  try {
    const body = await req.json();
    const { store_name } = body;

    if (!store_name) {
      return NextResponse.json({ error: "store_name is required" }, { status: 400 });
    }

    const { data, error } = await context.supabase
      .from("stores")
      .update({ store_name })
      .eq("id", context.tenant.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, store: data });
  } catch (error: any) {
    console.error("Error updating store:", error);
    return NextResponse.json({ error: "Failed to update store" }, { status: 500 });
  }
});
