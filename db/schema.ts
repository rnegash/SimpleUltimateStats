import {
  integer,
  pgTable,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm";

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

const sharedEventFields = {
  gameId: integer()
    .references(() => games.id)
    .notNull(),
  team: varchar({ length: 255 }).notNull(),
  timestamp: varchar({ length: 255 }).notNull(),
  gametime: varchar({ length: 255 }).notNull(),
  player: varchar({ length: 255 }),
};

export const scoreEvents = pgTable("score_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  assistBy: varchar({ length: 255 }),
  points: integer(),
  ...sharedEventFields,
});

export const turnoverEvents = pgTable("turnover_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  reason: text({ enum: ["thrower error", "receiver error"] }),
  ...sharedEventFields,
});

export const pullEvents = pgTable("pull_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  outcome: text({ enum: ["in", "out", "caught"] }),
  ...sharedEventFields,
});

export const relations = defineRelations(
  { games, scoreEvents, turnoverEvents, pullEvents },
  (r) => ({
    turnoverEvents: {
      game: r.one.games({
        from: r.turnoverEvents.gameId,
        to: r.games.id,
      }),
    },
    scoreEvents: {
      game: r.one.games({
        from: r.scoreEvents.gameId,
        to: r.games.id,
      }),
    },
    pullEvents: {
      game: r.one.games({
        from: r.pullEvents.gameId,
        to: r.games.id,
      }),
    },
    games: {
      turnovers: r.many.turnoverEvents(),
      scores: r.many.scoreEvents(),
      pulls: r.many.pullEvents(),
    },
  }),
);
