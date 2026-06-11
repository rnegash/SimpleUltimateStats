"use server";

import { db } from "@/db/server";
import { players, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PlayerPositions } from "@/app/game/types";

export const addUser = async (name: string, email: string) => {
  try {
    const newUser = await db
      .insert(usersTable)
      .values({ name, email, externalId: "" })
      .returning();
    console.log("newUser", newUser[0]);
    return newUser[0];
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
  }
};

export const getCurrentUserId = async () => {
  return 1;
};
