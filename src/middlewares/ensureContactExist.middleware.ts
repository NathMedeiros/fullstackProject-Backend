import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contacts, User } from "../entities";
import { AppError } from "../errors";

export const ensureContactExist = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);

  const findContact = await contactRepository.findOne({
    where: {
      id: parseInt(request.params.id),
    },
  });

  if (!findContact) {
    throw new AppError("Contact not found", 404);
  }

  return next();
};
