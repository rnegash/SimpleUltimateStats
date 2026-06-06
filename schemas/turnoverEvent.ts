import { turnoverReasons } from "@/app/game/types";
import z from "zod";

export const turnoverEventSchema = z.object({
  team: z.string(),
  player: z.string().optional(),
  reason: z
    .literal(turnoverReasons)
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export type TurnoverEvent = z.infer<typeof turnoverEventSchema>;
