import { addPlayer } from "@/actions/playerActions";
import { formDataToPlainObject } from "@/app/_utils/formDataToPlainObject";
import { newPlayerSchema } from "@/schemas/newPlayer";
import { FormEvent } from "react";

export const handleFormSubmit = async (
  formEvent: FormEvent<HTMLFormElement>,
) => {
  formEvent.preventDefault();

  const newPlayer = await newPlayerSchema.safeParse(
    formDataToPlainObject(formEvent),
  );

  if (newPlayer.error) {
    throw new Error("newPlayer error");
  }

  if (newPlayer.success) {
    addPlayer(newPlayer.data.name, newPlayer.data.position);
  }
};
