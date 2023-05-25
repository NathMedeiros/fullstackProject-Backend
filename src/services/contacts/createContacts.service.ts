import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contacts, User } from "../../entities";
import { IContact, IContactReturn } from "../../interfaces/contact.interfaces";
import { Request } from "express";
import { AppError } from "../../errors";
import { returnContactSchema } from "../../schemas/contact.schema";

export const createContactService = async (
  contactData: IContact,
  req: Request
): Promise<IContactReturn> => {
  const userId = parseInt(req.user.id);
  console.log(userId);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("Error");
  }

  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);

  const contact = contactRepository.create({ ...contactData, user });
  await contactRepository.save(contact);
  const newContact = returnContactSchema.parse(contact);

  return newContact;
};
