import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contacts, User } from "../entities";

export const ensureUserPermissions = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const findId = parseInt(request.params.id);
  const userId = parseInt(request.user.id);

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: findId,
    },
  });

  if (!findUser || findUser.id !== userId) {
    return response
      .status(401)
      .json({ message: "You don't have permissions." });
  }

  return next();
};
