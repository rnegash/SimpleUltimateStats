export const EventType = {
  score: "score",
  turnover: "turnover",
  pull: "pull",
} as const;

export type GameEvent =
  | {
      type: "score";
      teamId: string;
      timestamp: string;
      playerId?: string;
      data?: {
        assistBy?: string;
        points?: number;
      };
    }
  | {
      type: "turnover";
      teamId: string;
      timestamp: string;
      playerId?: string;
      data?: {
        reason?: string;
      };
    }
  | {
      type: "pull";
      teamId: string;
      timestamp: string;
      playerId?: string;
      data: {
        outcome: "in" | "out" | "caught";
      };
    };
