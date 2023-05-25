// import { Request, Response, NextFunction } from "express";
// import { Repository } from "typeorm";
// import { AppDataSource } from "../data-source";
// import { Contacts, User } from "../entities";
// import { AppError } from "../errors";

// export const ensureContactOwnership = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const contactRepository: Repository<Contacts> =
//     AppDataSource.getRepository(Contacts);

//   const userId = parseInt(request.user.id); // Converte o ID do usuário logado para um número
//   const contactId = parseInt(request.params.id); // Obtém o ID do contato a partir dos parâmetros da solicitação

//   const contact = await contactRepository.findOne({
//     where: {
//       id: contactId,
//       user: { id: userId },
//     },
//   });

//   if (!contact) {
//     throw new AppError("Contact not found or unauthorized", 404);
//   }

//   return next();
// };
