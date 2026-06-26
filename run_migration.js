const { Client } = require('pg');
const fs = require('fs');

const connectionString = "postgres://postgres:postgres@localhost:54322/postgres"; // Assuming local supabase DB connection string

async function runMigration() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const sql = fs.readFileSync('supabase/migrations/20260626000000_add_advanced_header_settings.sql', 'utf8');
    await client.query(sql);
    console.log("Migration executed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

runMigration();
