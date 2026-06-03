export const eventType = ["score", "turnover", "pull"] as const;

export type Event = (typeof eventType)[number];

export const outcomes = ["in", "out", "caught"] as const;

export type Outcome = (typeof eventType)[number];

export type GameEvent =
  | {
      type: "score";
      teamId: string;
      timestamp: string;
      gametime: string;
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
      gametime: string;
      playerId?: string;
      data?: {
        reason?: string;
      };
    }
  | {
      type: "pull";
      teamId: string;
      timestamp: string;
      gametime: string;
      playerId?: string;
      data?: {
        outcome?: "in" | "out" | "caught";
      };
    };
