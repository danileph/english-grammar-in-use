import { z } from "zod";

export const exampleFeedbackFormSchema = z.object({
  displayName: z
    .string()
    .min(2, "Display name must have at least 2 characters")
    .max(40, "Display name must be 40 characters or fewer"),
  feedback: z
    .string()
    .min(12, "Feedback should contain at least 12 characters")
    .max(500, "Feedback should be 500 characters or fewer"),
});

export type ExampleFeedbackFormInput = z.infer<typeof exampleFeedbackFormSchema>;
