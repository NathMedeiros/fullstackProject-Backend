import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contacts } from "../entities";

export const ensureContactPermissions = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const contactId = parseInt(request.params.id);
  const userId = request.user.id;

  const contactRepository = AppDataSource.getRepository(Contacts);

  const findContact = await contactRepository.findOne({
    where: {
      id: contactId,
      user: {
        id: parseInt(userId),
      },
    },
  });

  if (!findContact) {
    return response
      .status(401)
      .json({ message: "You don`t have permissions." });
  }

  return next();
};
