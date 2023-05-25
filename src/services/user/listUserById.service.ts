import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IContact } from "../../interfaces/contact.interfaces";
import { Contacts, User } from "../../entities";
import { AppError } from "../../errors";
import { IUser } from "../../interfaces/user.interfaces";

export const listUserByIdService = async (
  userId: number,
  tokenId: number
): Promise<IUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  if (user.id !== tokenId) {
    throw new AppError("Unauthorized!", 401);
  }
  return user;
};
