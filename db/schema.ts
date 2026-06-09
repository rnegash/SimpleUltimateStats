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

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const gamesTable = pgTable("games", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  finalScore: varchar("final_score", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: integer("created_by")
    .references(() => usersTable.id)
    .notNull(),
});

export const players = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  position: text({ enum: ["handler", "cutter", "hybrid"] }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: integer("created_by")
    .references(() => usersTable.id)
    .notNull(),
});

export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  eventType: text("event_type", { enum: eventType }),
  gameId: integer("game_id")
    .references(() => gamesTable.id)
    .notNull(),
  team: varchar({ length: 255 }).notNull(),
  timestamp: varchar({ length: 255 }).notNull(),
  gametime: varchar({ length: 255 }).notNull(),
  player: varchar({ length: 255 }),
  additionalStats: json("additional_stats"),
});

export const relations = defineRelations(
  { usersTable, gamesTable, players, eventsTable },
  (r) => ({
    usersTable: {
      games: r.many.gamesTable({
        from: r.usersTable.id,
        to: r.gamesTable.createdBy,
      }),
      players: r.many.players({
        from: r.usersTable.id,
        to: r.players.createdBy,
      }),
    },
    gamesTable: {
      createdByUser: r.one.usersTable({
        from: r.gamesTable.createdBy,
        to: r.usersTable.id,
      }),
      events: r.many.eventsTable({
        from: r.gamesTable.id,
        to: r.eventsTable.gameId,
      }),
    },
    players: {
      createdByUser: r.one.usersTable({
        from: r.players.createdBy,
        to: r.usersTable.id,
      }),
    },
    eventsTable: {
      game: r.one.gamesTable({
        from: r.eventsTable.gameId,
        to: r.gamesTable.id,
      }),
    },
  }),
);
