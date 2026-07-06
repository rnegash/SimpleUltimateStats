"use client";

import { copy } from "@/app/_assets/strings";
import { formatAsText } from "../_utils/formatGameExport";
import type { Game, GameEvent } from "../_utils/formatGameExport";
import { LinkButton } from "@/app/_components/LinkButton";
import { useMemo } from "react";

const whitespace = /\s+/g;

export const ExportGameButton = ({
  game,
  events,
}: {
  game: Game;
  events: GameEvent[];
}) => {
  const href = useMemo(() => {
    const text = formatAsText(game, events);

    return `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
  }, [game, events]);

  return (
    <LinkButton
      href={href}
      download={`${game.name.replace(whitespace, "_")}_stats.txt`}
    >
      {copy.dashboardPage.pastGamesPage.pastGame.exportGameButton}
    </LinkButton>
  );
};
