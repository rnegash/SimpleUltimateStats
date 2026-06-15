import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { relations as authRelations } from "./schema/auth";
import { relations as simpleUltiStatsRelations } from "./schema/simpleUltiStats";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({
  client: sql,
  relations: { ...authRelations, ...simpleUltiStatsRelations },
});
