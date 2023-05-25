import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().min(3).max(45),
  phone: z.string().min(8),
});

export const returnContactSchema = contactCreateSchema.extend({
  id: z.number(),
  createdAt: z.string(),
});

export const contactUpdateSchema = contactCreateSchema.partial();

export const returnAllContactSchema = returnContactSchema.array();
