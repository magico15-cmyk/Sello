import { NextRequest, NextResponse } from "next/server";
import { withTenant, TenantContext } from "@/lib/tenant/withTenant";

export const PATCH = withTenant(async (req: NextRequest, context: TenantContext) => {
  try {
    const body = await req.json();
    const { 
      meta_pixels,
      meta_pixel_enabled
    } = body;

    const { data, error } = await context.supabase
      .from("stores")
      .update({ 
        meta_pixels: meta_pixels || [],
        meta_pixel_enabled: !!meta_pixel_enabled
      })
      .eq("id", context.tenant.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, store: data });
  } catch (error: any) {
    console.error("Error updating pixel settings:", error);
    return NextResponse.json({ error: "Failed to update pixel settings" }, { status: 500 });
  }
});
