"use client";

import { deleteGame } from "@/actions/gameActions";
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
      Delete game
    </Button>
  );
};
