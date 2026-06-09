export const eventType = ["score", "turnover", "pull"] as const;

export type Event = (typeof eventType)[number];

export const pullOutcomes = ["in", "out", "caught", ""] as const;

export type PullOutcome = (typeof pullOutcomes)[number];

export const turnoverReasons = ["thrower error", "receiver error", ""] as const;

export type TurnoverReason = (typeof turnoverReasons)[number];

export const playerPositions = ["handler", "cutter", "hybrid"] as const;

export type PlayerPositions = (typeof playerPositions)[number];

export type GameEvent =
  | {
      type: "score";
      teamId: string;
      timestamp: string;
      gametime: string;
      playerId?: string;
      data: {
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
      data: {
        reason?: TurnoverReason;
      };
    }
  | {
      type: "pull";
      teamId: string;
      timestamp: string;
      gametime: string;
      playerId?: string;
      data: {
        outcome?: PullOutcome;
      };
    };
