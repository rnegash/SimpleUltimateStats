"use server";

import { db } from "@/db/server";
import { eventsTable, gamesTable } from "@/db/schema/simpleUltiStats";
import { GameEvent } from "@/app/game/types";
import { eq } from "drizzle-orm";
import { getAppUserId } from "./authActions";

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

export const addGame = async (gameEvents: GameEvent[], finalScore: string) => {
  const userId = await getAppUserId();

  const newGame = await db
    .insert(gamesTable)
    .values({
      createdBy: userId,
      name: `Game on ${new Date().toLocaleString()}`,
      finalScore,
    })
    .returning();

  const events = gameEvents.map((event) => ({
    eventType: event.type,
    gameId: newGame[0].id,
    team: event.teamId,
    timestamp: event.timestamp,
    gametime: event.gametime,
    player: event.playerId,
    additionalStats: {
      ...event.data,
    },
  }));

  await db.insert(eventsTable).values(events);
};
