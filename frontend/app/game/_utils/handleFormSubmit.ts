import type { Dispatch, SetStateAction } from "react";
import { scoreEventSchema } from "@/schemas/scoreEvent";
import { EventType, GameEvent } from "../types";
import { getScoreByTeam } from "./getScoreByTeam";
import { pullEventSchema } from "@/schemas/pullEvent";
import { turnoverEventSchema } from "@/schemas/turnoverEvent";

export const handleFormSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  eventType: keyof typeof EventType,
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

  switch (eventType) {
    case "score":
      const scoreData = scoreEventSchema.safeParse(data);

      if (scoreData.success) {
        const newScoreEvent: GameEvent = {
          type: "score",
          teamId: scoreData.data.team,
          timestamp: new Date().toISOString(),
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
          timestamp: new Date().toISOString(),
          playerId: pullData.data.player,
          data: {
            outcome: pullData.data.outcome,
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
          timestamp: new Date().toISOString(),
          playerId: turnoverData.data.player,
          data: {
            reason: turnoverData.data.reason,
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
