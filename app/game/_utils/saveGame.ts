import type { Dispatch, SetStateAction } from "react";
import { addGame } from "@/actions/gameActions";
import { teams } from "../constants";
import { getScoreByTeam } from "./getScoreByTeam";
import type { GameEvent } from "../types";
import type { GameSavedStatus } from "../ClientGame";

export const saveGame = async (
  events: GameEvent[],
  setGameSavedStatus: Dispatch<SetStateAction<GameSavedStatus>>,
) => {
  setGameSavedStatus({ pending: true, success: false, error: false });

  try {
    await addGame(
      events,
      getScoreByTeam(teams.TEAM_DARK, events),
      getScoreByTeam(teams.TEAM_LIGHT, events),
    );
    setGameSavedStatus({ success: true, error: false, pending: false });
  } catch {
    setGameSavedStatus({ error: true, success: false, pending: false });
  }
};
