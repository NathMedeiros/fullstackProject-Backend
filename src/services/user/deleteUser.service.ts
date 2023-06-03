import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

export const deleteUserService = async (idUser: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
    relations: ["contacts"],
  });

  if (!user) {
    throw new Error("Cliente não encontrado");
  }

  const contacts = user.contacts;

  for (const contact of contacts) {
    await userRepository.manager.remove(contact);
  }

  await userRepository.remove(user);
};
