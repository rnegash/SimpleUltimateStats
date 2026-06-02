import { GameEvent } from "../app/game/types";

export const sampleEvents: GameEvent[] = [
  {
    type: "pull",
    teamId: "Lights",
    timestamp: "2026-05-31T14:02:15Z",
    playerId: "player12",
    data: {
      outcome: "in",
    },
  },
  {
    type: "score",
    teamId: "Lights",
    timestamp: "2026-05-31T14:04:03Z",
    playerId: "Maya Johnson",
    data: {
      assistBy: "player12",
      points: 1,
    },
  },
  {
    type: "pull",
    teamId: "Darks",
    timestamp: "2026-05-31T14:06:22Z",
    playerId: "player21",
    data: {
      outcome: "out",
    },
  },
  {
    type: "turnover",
    teamId: "Darks",
    timestamp: "2026-05-31T14:06:40Z",
    playerId: "player21",
    data: {
      reason: "throwaway",
    },
  },
  {
    type: "score",
    teamId: "Darks",
    timestamp: "2026-05-31T14:09:11Z",
    playerId: "Ethan Park",
    data: {
      points: 1,
    },
  },
  {
    type: "turnover",
    teamId: "Lights",
    timestamp: "2026-05-31T14:11:30Z",
    playerId: "player07",
    data: {
      reason: "stall",
    },
  },
  {
    type: "pull",
    teamId: "Lights",
    timestamp: "2026-05-31T14:13:08Z",
    playerId: "player05",
    data: {
      outcome: "caught",
    },
  },
  {
    type: "score",
    teamId: "Darks",
    timestamp: "2026-05-31T14:19:11Z",
    playerId: "Ethan Park",
    data: {
      assistBy: "player12",
      points: 2,
    },
  },
];
