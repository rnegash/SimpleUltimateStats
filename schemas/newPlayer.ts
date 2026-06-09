import { playerPositions } from "@/app/game/types";
import z from "zod";

export const newPlayerSchema = z.object({
  name: z.string(),
  position: z.literal(playerPositions).optional(),
});

export type NewPlayer = z.infer<typeof newPlayerSchema>;
