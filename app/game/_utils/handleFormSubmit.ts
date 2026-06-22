import type { Dispatch, SetStateAction } from "react";
import { scoreEventSchema } from "@/schemas/scoreEvent";
import { eventTypes, type Event, type GameEvent } from "../types";
import { getScoreByTeam } from "./getScoreByTeam";
import { pullEventSchema } from "@/schemas/pullEvent";
import { turnoverEventSchema } from "@/schemas/turnoverEvent";
import { calculateGameTime } from "./calculateGameTime";
import { formDataToPlainObject } from "@/app/_utils/formDataToPlainObject";

export const handleFormSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  eventType: Event,
  events: GameEvent[],
  setEvents: Dispatch<SetStateAction<GameEvent[]>>,
) => {
  e.preventDefault();
  const data = formDataToPlainObject(e);

  const timestamp = new Date().toISOString();
  const gameStartTime = events[0]?.timestamp;
  switch (eventType) {
    case eventTypes.score:
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

    case eventTypes.pull:
      const pullData = pullEventSchema.safeParse(data);

      if (pullData.success) {
        const newPullEvent: GameEvent = {
          type: "pull",
          teamId: pullData.data.team,
          timestamp,
          gametime: calculateGameTime(timestamp, gameStartTime),
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

    case eventTypes.turnover:
      const turnoverData = turnoverEventSchema.safeParse(data);

      if (turnoverData.success) {
        const newTurnoverEvent: GameEvent = {
          type: "turnover",
          teamId: turnoverData.data.team,
          timestamp,
          gametime: calculateGameTime(timestamp, gameStartTime),
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
