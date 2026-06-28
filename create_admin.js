const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function createFirstAdmin() {
  const email = "admin@sello.com";
  const password = "SelloAdmin123!";
  const name = "Sello Admin";

  console.log(`Creating user: ${email}...`);

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role: "Admin" },
  });

  if (authError) {
    if (authError.message.includes('already exists')) {
      console.log("User already exists! Getting user info...");
      // Fetch user to insert into store_staff just in case
      const { data: users } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = users.users.find(u => u.email === email);
      if (existingUser) {
        await insertStaff(existingUser.id, name, email);
      }
      return;
    }
    console.error("Auth error:", authError.message);
    return;
  }

  const userId = authData.user.id;
  await insertStaff(userId, name, email);
}

async function insertStaff(userId, name, email) {
  console.log("Inserting into store_staff...");
  const { error: dbError } = await supabaseAdmin.from("store_staff").upsert({
    user_id: userId,
    name,
    email,
    role: "Admin",
    status: "Active"
  }, { onConflict: 'email' });

  if (dbError) {
    console.error("Database error:", dbError.message);
  } else {
    console.log("Success! Admin user created.");
    console.log("----------------------------------------");
    console.log("Email: admin@sello.com");
    console.log("Password: SelloAdmin123!");
    console.log("----------------------------------------");
  }
}

createFirstAdmin();
