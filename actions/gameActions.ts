"use server";

import { db } from "@/db/server";
import { gamesTable } from "@/db/schema/simpleUltiStats";
import { GameEvent } from "@/app/game/types";
import { eq } from "drizzle-orm";
import { getAppUserId } from "./authActions";
import { addEventsWithGameId, deleteEventsByGameId } from "./eventActions";

export const getGamesData = async () => {
  const userId = await getAppUserId();

  const data = await db
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.createdBy, userId));

  return data;
};

export const getGameById = async (pastGameId: number) => {
  const userId = await getAppUserId();
  const data = await db
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.createdBy, userId) && eq(gamesTable.id, pastGameId));

  return data[0];
};

export const addGame = async (
  gameEvents: GameEvent[],
  darksScore: number,
  lightsScore: number,
) => {
  const userId = await getAppUserId();

  const newGame = await db
    .insert(gamesTable)
    .values({
      createdBy: userId,
      name: `Game on ${new Date().toLocaleString()}`,
      darksScore,
      lightsScore,
    })
    .returning();

  await addEventsWithGameId(gameEvents, newGame[0].id);
};

export const deleteGame = async (gameId: number) => {
  await deleteEventsByGameId(gameId);
  await db.delete(gamesTable).where(eq(gamesTable.id, gameId));
};
