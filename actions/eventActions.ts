"use server";

import { db } from "@/db/server";
import { eventsTable } from "@/db/schema/simpleUltiStats";
import { eq, sql } from "drizzle-orm";
import { GameEvent } from "@/app/game/types";

export const getEventsDataByGameId = async (gameId: number) => {
  const data = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.gameId, gameId));

  return data;
};

export const addEventsWithGameId = async (
  gameEvents: GameEvent[],
  gameId: number,
) => {
  const events = gameEvents.map((event) => ({
    eventType: event.type,
    gameId: gameId,
    team: event.teamId,
    timestamp: event.timestamp,
    gametime: event.gametime,
    player: event.playerId,
    additionalStats: sql`${event.data}::json`,
  }));

  await db.insert(eventsTable).values(events);
};

export const deleteEventsByGameId = async (gameId: number) => {
  await db.delete(eventsTable).where(eq(eventsTable.gameId, gameId));
};
