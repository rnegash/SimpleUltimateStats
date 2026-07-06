import type { InferSelectModel } from "drizzle-orm";
import type { eventsTable, gamesTable } from "@/db/schema/simpleUltiStats";

export type SavedGame = InferSelectModel<typeof gamesTable>;
export type SavedEvent = InferSelectModel<typeof eventsTable>;

export const mockGame: SavedGame = {
  id: 1,
  name: "Lights vs Darks",
  darksScore: 3,
  lightsScore: 5,
  createdAt: new Date("2026-01-01T00:00:00Z"),
  createdBy: 1,
};

export const mockEvents: SavedEvent[] = [
  {
    id: 1,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    eventType: "pull",
    gameId: 1,
    team: "Lights",
    timestamp: "2026-01-01T14:00:00Z",
    gametime: "00:00:00",
    player: "Anna",
    additionalStats: { outcome: "in" },
  },
  {
    id: 2,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    eventType: "score",
    gameId: 1,
    team: "Darks",
    timestamp: "2026-01-01T14:02:00Z",
    gametime: "00:02:00",
    player: "Ben",
    additionalStats: { assistBy: "Carlos", points: 1 },
  },
  {
    id: 3,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    eventType: "turnover",
    gameId: 1,
    team: "Lights",
    timestamp: "2026-01-01T14:05:00Z",
    gametime: "00:05:00",
    player: "Anna",
    additionalStats: { reason: "thrower error" },
  },
  {
    id: 4,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    eventType: "turnover",
    gameId: 1,
    team: "Darks",
    timestamp: "2026-01-01T14:07:00Z",
    gametime: "00:07:00",
    player: "Dana",
    additionalStats: { reason: "receiver error" },
  },
  {
    id: 5,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    eventType: "score",
    gameId: 1,
    team: "Lights",
    timestamp: "2026-01-01T14:10:00Z",
    gametime: "00:10:00",
    player: "Anna",
    additionalStats: { points: 2 },
  },
];
