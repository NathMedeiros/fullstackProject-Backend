import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contacts, User } from "../../entities";

export const deleteContactService = async (
  idContacts: number
): Promise<void> => {
  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);

  const contact = await contactRepository.findOne({
    where: {
      id: idContacts,
    },
  });

  await contactRepository.remove(contact!);
};
