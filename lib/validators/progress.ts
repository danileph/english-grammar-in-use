import { z } from "zod";

export const updateProgressSchema = z.object({
  unitId: z.string().min(1),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  accuracy: z.number().min(0).max(100).nullable().optional(),
});

export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
