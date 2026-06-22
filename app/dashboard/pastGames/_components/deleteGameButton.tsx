"use client";

import { deleteGame } from "@/actions/gameActions";
import { copy } from "@/app/_assets/strings";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export const DeleteGameButton = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="danger"
      onClick={() => {
        deleteGame(parseInt(id));
        router.push("/dashboard/pastGames");
      }}
    >
      {copy.dashboardPage.pastGamesPage.pastGame.deleteGameButton}
    </Button>
  );
};
