import { z } from "zod";

export const emailInputSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .min(1, "Email is required."),
});
