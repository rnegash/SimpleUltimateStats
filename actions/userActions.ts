"use server";

import { db } from "@/db/server";
import { usersTable } from "@/db/schema";

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
