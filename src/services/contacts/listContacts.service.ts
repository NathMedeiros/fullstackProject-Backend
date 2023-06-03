import { Repository } from "typeorm";
import { IContact } from "../../interfaces/contact.interfaces";
import { Contacts } from "../../entities";
import { AppDataSource } from "../../data-source";

export const listContactService = async (): Promise<IContact[]> => {
  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);
  const contactsList: IContact[] = await contactRepository.find({
    relations: {
      user: true,
    },
  });

  return contactsList;
};
