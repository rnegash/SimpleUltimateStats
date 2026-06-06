import { pullOutcomes } from "@/app/game/types";
import z from "zod";

export const pullEventSchema = z.object({
  team: z.string(),
  player: z.string().optional(),
  outcome: z
    .literal(pullOutcomes)
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export type PullEvent = z.infer<typeof pullEventSchema>;
