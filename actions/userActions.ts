"use server";

import { db } from "@/db/server";
import { players, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const addUser = async (name: string) => {
  try {
    const newUser = await db.insert(usersTable).values({ name }).returning();
    console.log("newUser", newUser[0]);
    return newUser[0];
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
  }
};

export const addPlayer = async (formData: FormData) => {
  const name = formData.get("name");

  if (typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Player name is required.");
  }

  await db.insert(players).values({ name: name.trim(), createdBy: 1 });
};

export const getPlayers = async () => {
  return await db.select().from(players).where(eq(players.createdBy, 1));
};
