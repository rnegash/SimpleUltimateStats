import type { Dispatch, SetStateAction } from "react";
import { scoreEventSchema } from "@/schemas/scoreEvent";
import type { Event, GameEvent, PullOutcome, TurnoverReason } from "../types";
import { getScoreByTeam } from "./getScoreByTeam";
import { pullEventSchema } from "@/schemas/pullEvent";
import { turnoverEventSchema } from "@/schemas/turnoverEvent";
import { calculateGameTime } from "./calculateGameTime";

export const handleFormSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  eventType: Event,
  events: GameEvent[],
  setEvents: Dispatch<SetStateAction<GameEvent[]>>,
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data: Record<string, string> = {};

  // Convert FormData to plain object
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  const timestamp = new Date().toISOString();
  const gameStartTime = events[0]?.timestamp;
  switch (eventType) {
    case "score":
      const scoreData = scoreEventSchema.safeParse(data);

      if (scoreData.success) {
        const newScoreEvent: GameEvent = {
          type: "score",
          teamId: scoreData.data.team,
          timestamp,
          gametime: calculateGameTime(timestamp, gameStartTime),
          playerId: scoreData.data.player,
          data: {
            assistBy: scoreData.data.assistBy,
            points: getScoreByTeam(scoreData.data.team, events) + 1,
          },
        };

        setEvents((events) => [...events, newScoreEvent]);
      } else {
        console.log(scoreData.error);
      }

      break;

    case "pull":
      const pullData = pullEventSchema.safeParse(data);

      if (pullData.success) {
        const newPullEvent: GameEvent = {
          type: "pull",
          teamId: pullData.data.team,
          timestamp,
          gametime: calculateGameTime(timestamp, gameStartTime),
          playerId: pullData.data.player,
          data: {
            outcome: pullData.data.outcome as PullOutcome,
          },
        };
        setEvents((events) => [...events, newPullEvent]);
      } else {
        console.log(pullData.error);
      }

      break;

    case "turnover":
      const turnoverData = turnoverEventSchema.safeParse(data);

      if (turnoverData.success) {
        const newTurnoverEvent: GameEvent = {
          type: "turnover",
          teamId: turnoverData.data.team,
          timestamp,
          gametime: calculateGameTime(timestamp, gameStartTime),
          playerId: turnoverData.data.player,
          data: {
            reason: turnoverData.data.reason as TurnoverReason,
          },
        };
        setEvents((events) => [...events, newTurnoverEvent]);
      } else {
        console.log(turnoverData.error);
      }

      break;

    default:
      break;
  }
};
