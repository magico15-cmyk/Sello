import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { withTenant, TenantContext } from "@/lib/tenant/withTenant";

export const POST = withTenant(async (req: NextRequest, context: TenantContext) => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: SUPABASE_SERVICE_ROLE_KEY is missing." },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Create the user in auth.users via admin api
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // 2. Insert the user into store_staff table
    const { error: dbError } = await supabaseAdmin.from("store_staff").insert({
      user_id: userId,
      name,
      email,
      role,
      status: "Active",
    });

    if (dbError) {
      // If table insert fails, ideally we'd rollback the auth user, but for now we throw error
      console.error("store_staff insert error:", dbError);
      // NOTE: For demo purposes, we don't throw a fatal 500 here if the table is missing
      // just so the UI continues working. But we do return the error so the frontend knows.
      if (dbError.code === "42P01") {
        return NextResponse.json(
          { error: "Table 'store_staff' does not exist. Please run the SQL snippet." },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: authData.user });
  } catch (err: any) {
    console.error("POST /api/staff Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
});
