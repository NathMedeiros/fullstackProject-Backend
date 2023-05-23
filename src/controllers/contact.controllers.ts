// import { Request, Response } from "express";
// import { ContactsService } from "../services/contactsService";
// import { Contacts } from "../entities/contact.entities";

// export class ContactsController {
//   private contactsService: ContactsService;

//   constructor() {
//     this.contactsService = new ContactsService();
//   }

//   async createContact(req: Request, res: Response) {
//     try {
//       const { name, email, phone } = req.body;

//       const contact: Contact = await this.contactsService.createContact(name, email, phone);

//       return res.status(201).json(contact);
//     } catch (error) {
//       console.error("Error creating contact:", error);
//       return res.status(500).json({ error: "Failed to create contact" });
//     }
//   }
// }
