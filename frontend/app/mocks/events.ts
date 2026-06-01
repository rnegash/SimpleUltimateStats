import { GameEvent } from "../game/types";

export const sampleEvents: GameEvent[] = [
  {
    type: "pull",
    teamId: "lightTeam",
    timestamp: "2026-05-31T14:02:15Z",
    playerId: "player12",
    data: {
      outcome: "in",
    },
  },
  {
    type: "score",
    teamId: "lightTeam",
    timestamp: "2026-05-31T14:04:03Z",
    playerId: "Maya Johnson",
    data: {
      assistBy: "player12",
      points: 1,
    },
  },
  {
    type: "pull",
    teamId: "darkTeam",
    timestamp: "2026-05-31T14:06:22Z",
    playerId: "player21",
    data: {
      outcome: "out",
    },
  },
  {
    type: "turnover",
    teamId: "darkTeam",
    timestamp: "2026-05-31T14:06:40Z",
    playerId: "player21",
    data: {
      reason: "throwaway",
    },
  },
  {
    type: "score",
    teamId: "darkTeam",
    timestamp: "2026-05-31T14:09:11Z",
    playerId: "Ethan Park",
    data: {
      points: 1,
    },
  },
  {
    type: "turnover",
    teamId: "lightTeam",
    timestamp: "2026-05-31T14:11:30Z",
    playerId: "player07",
    data: {
      reason: "stall",
    },
  },
  {
    type: "pull",
    teamId: "lightTeam",
    timestamp: "2026-05-31T14:13:08Z",
    playerId: "player05",
    data: {
      outcome: "caught",
    },
  },
  {
    type: "score",
    teamId: "darkTeam",
    timestamp: "2026-05-31T14:19:11Z",
    playerId: "Ethan Park",
    data: {
      assistBy: "player12",
      points: 2,
    },
  },
];
