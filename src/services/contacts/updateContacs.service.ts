import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contacts } from "../../entities";
import { returnUserSchema } from "../../schemas/user.schema";
import {
  IContactReturn,
  IUpdateContact,
} from "../../interfaces/contact.interfaces";

export const updateContactsService = async (
  newUserData: IUpdateContact,
  idcontacts: number
): Promise<IContactReturn> => {
  const contactsRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);

  const oldContactData = await contactsRepository.findOneBy({
    id: idcontacts,
  });

  const contact = contactsRepository.create({
    ...oldContactData,
    ...newUserData,
  });

  await contactsRepository.save(contact);

  const updatedContact = returnUserSchema.parse(contact);

  return updatedContact;
};
