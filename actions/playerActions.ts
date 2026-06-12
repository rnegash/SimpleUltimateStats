"use server";

import { db } from "@/db/server";
import { playersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PlayerPositions } from "@/app/game/types";
import { getAppUserId } from "./authActions";

export const addPlayer = async (name: string, position?: PlayerPositions) => {
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Player name is required.");
  }

  const userId = await getAppUserId();

  await db.insert(playersTable).values({
    name: name.trim(),
    position,
    createdBy: userId,
  });
};

export const getPlayers = async () => {
  const userId = await getAppUserId();

  return await db
    .select()
    .from(playersTable)
    .where(eq(playersTable.createdBy, userId));
};
