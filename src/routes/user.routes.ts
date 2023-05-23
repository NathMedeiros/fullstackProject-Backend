import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  updateUserController,
} from "../controllers/user.controllers";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { ensureEmailExistsMiddleware } from "../middlewares/ensureEmailExistsMiddleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExist } from "../middlewares/ensureUserExist.middleware";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValid(userCreateSchema),
  ensureEmailExistsMiddleware,
  createUserController
);
userRoutes.get("", ensureTokenIsValid, listUserController);
userRoutes.patch(
  "/:id",
  ensureUserExist,
  ensureTokenIsValid,
  ensureDataIsValid(userUpdateSchema),
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureUserExist,
  ensureTokenIsValid,
  deleteUserController
);
