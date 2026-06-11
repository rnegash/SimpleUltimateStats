"use server";

import { db } from "@/db/server";
import { players, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PlayerPositions } from "@/app/game/types";
import { getCurrentUserId } from "./userActions";

export const addPlayer = async (name: string, position?: PlayerPositions) => {
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Player name is required.");
  }

  await db
    .insert(players)
    .values({ name: name.trim(), position, createdBy: 1 });
};

export const getPlayers = async () => {
  const userId = await getCurrentUserId();

  return await db.select().from(players).where(eq(players.createdBy, userId));
};
