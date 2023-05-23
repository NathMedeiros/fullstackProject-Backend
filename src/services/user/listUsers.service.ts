import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IReturnAllUser } from "../../interfaces/user.interfaces";
import { returnAllUserSchema } from "../../schemas/user.schema";

export const listUsersService = async (): Promise<IReturnAllUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find();

  const users = returnAllUserSchema.parse(findUsers);

  return users;
};
