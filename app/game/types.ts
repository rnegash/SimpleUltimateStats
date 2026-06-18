export const eventTypes = {
  score: "score",
  turnover: "turnover",
  pull: "pull",
} as const;

export type Event = keyof typeof eventTypes;

export const pullOutcomes = {
  in: "in",
  out: "out",
  caught: "caught",
  unclear: "unclear",
} as const;

export type PullOutcome = keyof typeof pullOutcomes;

export const turnoverReasons = {
  throwerError: "thrower error",
  receiverError: "receiver error",
  unclear: "unclear",
} as const;

export type TurnoverReason = keyof typeof turnoverReasons;

export const playerPositions = {
  handler: "handler",
  cutter: "cutter",
  hybrid: "hybrid",
} as const;

export type PlayerPositions = keyof typeof playerPositions;

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
