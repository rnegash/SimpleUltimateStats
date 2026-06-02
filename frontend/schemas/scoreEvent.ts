import z from "zod";

export const scoreEventSchema = z.object({
  team: z.string(),
  player: z.string().optional(),
  assistBy: z.string().optional(),
});

export type ScoreEvent = z.infer<typeof scoreEventSchema>;
