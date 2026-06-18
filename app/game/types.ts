export const eventTypes = {
  score: "score",
  turnover: "turnover",
  pull: "pull",
} as const;

type EventKeys = keyof typeof eventTypes;

export type Event = (typeof eventTypes)[EventKeys];

export const pullOutcomes = {
  in: "in",
  out: "out",
  caught: "caught",
  unclear: "unclear",
} as const;

type PullOutcomeKeys = keyof typeof pullOutcomes;
export type PullOutcome = (typeof pullOutcomes)[PullOutcomeKeys];

export const turnoverReasons = {
  throwerError: "thrower error",
  receiverError: "receiver error",
  unclear: "unclear",
} as const;

type TurnoverReasonKeys = keyof typeof turnoverReasons;
export type TurnoverReason = (typeof turnoverReasons)[TurnoverReasonKeys];

export const playerPositions = {
  handler: "handler",
  cutter: "cutter",
  hybrid: "hybrid",
} as const;

type PlayerPositionsKeys = keyof typeof playerPositions;
export type PlayerPositions = (typeof playerPositions)[PlayerPositionsKeys];

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
