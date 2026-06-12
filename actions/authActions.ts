"use server";

import { db } from "@/db/server";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth/server";
import { eq } from "drizzle-orm";

export async function getAuthUser() {
  const { data: session } = await auth.getSession();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
}

export async function ensureAppUser() {
  const authUser = await getAuthUser();

  const [existing] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.externalId, authUser.id))
    .limit(1);

  if (existing) {
    if (existing.name !== authUser.name || existing.email !== authUser.email) {
      const [updated] = await db
        .update(usersTable)
        .set({ name: authUser.name, email: authUser.email })
        .where(eq(usersTable.id, existing.id))
        .returning();
      return updated;
    }
    return existing;
  }

  const [created] = await db
    .insert(usersTable)
    .values({
      name: authUser.name,
      email: authUser.email,
      externalId: authUser.id,
    })
    .returning();

  return created;
}

export async function getAppUserId() {
  const user = await ensureAppUser();
  return user.id;
}

export async function syncAppUser() {
  await ensureAppUser();
}
