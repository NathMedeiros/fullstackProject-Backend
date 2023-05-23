import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  userCreateSchema,
  returnUserSchema,
  returnAllUserSchema,
} from "../schemas/user.schema";

export type IUser = z.infer<typeof userCreateSchema>;
export type IUserReturn = z.infer<typeof returnUserSchema>;
export type IUpdateUser = DeepPartial<IUser>;
export type IReturnAllUser = z.infer<typeof returnAllUserSchema>;
