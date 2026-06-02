import z from "zod";

export const turnoverEventSchema = z.object({
  team: z.string(),
  player: z.string().optional(),
  reason: z.string().optional(),
});

export type TurnoverEvent = z.infer<typeof turnoverEventSchema>;
