import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IContact } from "../../interfaces/contact.interfaces";
import { Contacts } from "../../entities";
import { AppError } from "../../errors";

export const listContactByIdService = async (
  contactId: number,
  tokenId: number
): Promise<IContact> => {
  const contactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);
  const contact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      user: true,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  if (contact.user.id !== tokenId) {
    throw new AppError("Unauthorized!", 401);
  }
  return contact;
};
