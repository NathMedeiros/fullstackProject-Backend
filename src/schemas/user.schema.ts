import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().min(3).max(45),
  password: z.string().max(120).min(4),
});

export const returnUserSchema = userCreateSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
  })
  .omit({ password: true });

export const userUpdateSchema = userCreateSchema.partial();

export const returnAllUserSchema = returnUserSchema.array();
