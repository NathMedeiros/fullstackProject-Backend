import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUser, IUserReturn } from "../../interfaces/user.interfaces";
import { Request } from "express";
import { AppError } from "../../errors";
import { returnUserSchema } from "../../schemas/user.schema";

export const createUserService = async (
  userData: IUser,
  req: Request
): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = userRepository.create({ ...userData });
  await userRepository.save(user);
  const newUser = returnUserSchema.parse(user);

  return newUser;
};
