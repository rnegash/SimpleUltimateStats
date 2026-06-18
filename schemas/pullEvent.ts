import { pullOutcomes } from "@/app/game/types";
import z from "zod";

export const pullEventSchema = z.object({
  team: z.string(),
  player: z.string().optional(),
  outcome: z.literal(Object.keys(pullOutcomes)).optional(),
});

export type PullEvent = z.infer<typeof pullEventSchema>;
