import { addPlayer } from "@/actions/playerActions";
import { PlayerPositions } from "@/app/game/types";
import { newPlayerSchema } from "@/schemas/newPlayer";
import { FormEvent } from "react";

export const handleFormSubmit = async (
  formEvent: FormEvent<HTMLFormElement>,
) => {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.currentTarget);

  const data: Record<string, string> = {};

  // Convert FormData to plain object
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  const newPlayer = await newPlayerSchema.safeParse(data);

  if (newPlayer.error) {
    throw new Error("newPlayer error");
  }

  if (newPlayer.success) {
    addPlayer(newPlayer.data.name, newPlayer.data.position as PlayerPositions);
  }
};
