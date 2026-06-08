import {
  integer,
  pgTable,
  text,
  varchar,
  timestamp,
  json,
} from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm";
import { eventType } from "@/app/game/types";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const games = pgTable("games", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const players = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  eventType: text({ enum: eventType }),
  gameId: integer()
    .references(() => games.id)
    .notNull(),
  team: varchar({ length: 255 }).notNull(),
  timestamp: varchar({ length: 255 }).notNull(),
  gametime: varchar({ length: 255 }).notNull(),
  player: varchar({ length: 255 }),
  additionalStats: json(),
});

export const relations = defineRelations({ games, eventsTable }, (r) => ({
  eventsTable: {
    game: r.one.games({
      from: r.eventsTable.gameId,
      to: r.games.id,
    }),
  },

  games: {
    turnovers: r.many.eventsTable(),
  },
}));
