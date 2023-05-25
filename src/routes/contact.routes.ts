import { Router } from "express";
import {
  createContactsController,
  deleteContactController,
  listContactByIdController,
  listContactController,
  updateContactController,
} from "../controllers/contact.controllers";
import { ensureUserExist } from "../middlewares/ensureUserExist.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import {
  contactCreateSchema,
  contactUpdateSchema,
} from "../schemas/contact.schema";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { ensureContactExist } from "../middlewares/ensureContactExist.middleware";
import { ensureContactPermissions } from "../middlewares/ensurecontactPermission.middleware";

export const contactRoutes: Router = Router();

contactRoutes.post(
  "",
  ensureTokenIsValid,
  ensureUserExist,
  ensureDataIsValid(contactCreateSchema),
  createContactsController
);
contactRoutes.get(
  "/:id",

  ensureTokenIsValid,
  ensureContactPermissions,
  listContactByIdController
);

contactRoutes.get("", ensureTokenIsValid, listContactController);

contactRoutes.delete(
  "/:id",
  ensureContactExist,
  ensureTokenIsValid,
  ensureContactPermissions,
  deleteContactController
);

contactRoutes.patch(
  "/:id",
  ensureContactExist,
  ensureTokenIsValid,
  ensureContactPermissions,
  ensureDataIsValid(contactUpdateSchema),
  updateContactController
);
