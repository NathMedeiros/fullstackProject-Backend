import { z } from "zod";

export const createLoginSchema = z.object({
  email: z.string().email().min(10).max(45),
  password: z.string().max(120).min(4),
});
