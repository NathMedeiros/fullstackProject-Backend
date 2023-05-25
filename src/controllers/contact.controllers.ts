import { Request, Response } from "express";
import { IContact, IUpdateContact } from "../interfaces/contact.interfaces";
import { createContactService } from "../services/contacts/createContacts.service";
import { listContactByIdService } from "../services/contacts/listContactById.service";
import { listContactService } from "../services/contacts/listContacts.service";
import { deleteContactService } from "../services/contacts/deleteContact.service";
import { updateContactsService } from "../services/contacts/updateContacs.service";

export const createContactsController = async (req: Request, res: Response) => {
  try {
    const contact: IContact = req.body;

    const newContact = await createContactService(contact, req);

    return res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);
  }
};

export const listContactController = async (
  request: Request,
  response: Response
) => {
  const contacts = await listContactService();

  return response.json(contacts);
};

export const listContactByIdController = async (
  request: Request,
  response: Response
) => {
  const contactId = parseInt(request.params.id);
  const tokenId = parseInt(request.user.id);
  const contact = await listContactByIdService(contactId, tokenId);

  return response.json(contact);
};

export const deleteContactController = async (
  request: Request,
  response: Response
) => {
  await deleteContactService(parseInt(request.params.id));

  return response.status(204).send();
};

export const updateContactController = async (req: Request, res: Response) => {
  const contactData: IUpdateContact = req.body;
  const idContact = parseInt(req.params.id);

  const updatedContact = await updateContactsService(contactData, idContact);

  return res.json(updatedContact);
};
