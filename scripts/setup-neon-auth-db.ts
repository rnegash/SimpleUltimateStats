import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  await sql`GRANT USAGE ON SCHEMA neon_auth TO neon_auth`;
  await sql`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA neon_auth TO neon_auth`;
  await sql`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA neon_auth TO neon_auth`;
  await sql`ALTER DEFAULT PRIVILEGES IN SCHEMA neon_auth GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO neon_auth`;

  const projectConfig = await sql`
    SELECT count(*)::int AS count FROM neon_auth.project_config
  `;
  const count = (projectConfig[0] as { count: number }).count;

  let authStatus: number | null = null;
  let authBody: string | null = null;
  if (process.env.NEON_AUTH_BASE_URL) {
    const response = await fetch(
      `${process.env.NEON_AUTH_BASE_URL}/get-session`,
    );
    authStatus = response.status;
    authBody = await response.text();
  }

  console.log(
    JSON.stringify(
      {
        grantsApplied: true,
        projectConfigCount: count,
        authStatus,
        authBody,
        needsNeonAuthProvisioning: count === 0,
      },
      null,
      2,
    ),
  );

  if (count === 0) {
    console.error(
      "\nNeon Auth project_config is empty. In Neon Console: Project → Branch → Auth → disable and re-enable Auth to provision config.",
    );
    process.exit(1);
  }
}

main();
