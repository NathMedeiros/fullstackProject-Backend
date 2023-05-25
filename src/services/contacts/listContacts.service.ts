import { Repository } from "typeorm";
import { IReturnAllContact } from "../../interfaces/contact.interfaces";
import { Contacts } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnAllContactSchema } from "../../schemas/contact.schema";

export const listContactService = async (): Promise<IReturnAllContact> => {
  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);
  const contactsList: Array<Contacts> = await contactRepository.find();
  const contacts = returnAllContactSchema.parse(contactsList);

  return contacts;
};
