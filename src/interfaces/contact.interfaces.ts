import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  contactCreateSchema,
  returnAllContactSchema,
  returnContactSchema,
} from "../schemas/contact.schema";

export type IContact = z.infer<typeof contactCreateSchema>;
export type IContactReturn = z.infer<typeof returnContactSchema>;
export type IUpdateContact = DeepPartial<IContact>;
export type IReturnAllContact = z.infer<typeof returnAllContactSchema>;
