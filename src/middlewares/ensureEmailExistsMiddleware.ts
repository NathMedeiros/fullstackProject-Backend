import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entites";
import { AppError } from "../errors";

export const ensureEmailExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const emailUser = await userRepository.findOne({
    where: {
      email: request.body.email,
    },
  });

  if (!!emailUser) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
