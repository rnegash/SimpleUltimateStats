"use server";

import { db } from "@/db/server";
import { eventsTable, gamesTable } from "@/db/schema";
import { GameEvent } from "@/app/game/types";

export const getGamesData = async () => {
  const data = await db.select().from(gamesTable);
  return data;
};

export const addGame = async (gameEvents: GameEvent[]) => {
  const newGame = await db
    .insert(gamesTable)
    .values({ createdBy: 0, name: "Coach R" })
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
