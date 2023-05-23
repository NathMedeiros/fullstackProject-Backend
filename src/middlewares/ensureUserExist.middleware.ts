import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

export const ensureUserExist = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: parseInt(request.params.id) || parseInt(request.user.id),
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};
