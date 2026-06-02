import { GameEvent } from "./types";

export const getScoreByTeam = (team: string, events: GameEvent[] | null) => {
  if (!events) return 0;

  const lastScoreEvent = events.findLast(
    (event) => event.type === "score" && event.teamId === team,
  );

  if (lastScoreEvent?.type === "score")
    return lastScoreEvent?.data?.points || 0;

  return 0;
};
