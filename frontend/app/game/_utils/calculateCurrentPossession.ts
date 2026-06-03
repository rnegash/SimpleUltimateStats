import type { Team } from "../page";
import { GameEvent } from "../types";

export const calculateCurrentPossession = (
  teamOne: Team,
  teamTwo: Team,
  event: GameEvent,
) => {
  if (!event) return null;

  if (event.type === "pull") {
    return event.teamId === teamOne ? teamTwo : teamOne;
  }

  if (event.type === "turnover") {
    return event.teamId === teamOne ? teamTwo : teamOne;
  }

  return event.teamId === teamOne ? teamOne : teamTwo;
};
