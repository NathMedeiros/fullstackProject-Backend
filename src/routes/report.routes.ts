import { Router, Request, Response } from "express";
import PDFDocument from "pdfkit";
import { User } from "../entities";
import { returnUserSchema } from "../schemas/user.schema";
import { AppDataSource } from "../data-source";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";

export const reportRoutes: Router = Router();

reportRoutes.get(
  "",
  ensureTokenIsValid,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const userId = req.user.id;

      const userRepository = AppDataSource.getRepository(User);

      const queryBuilder = userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.contacts", "contact")
        .where("user.id = :userId", { userId });

      const user = await queryBuilder.getOne();

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const doc = new PDFDocument();

      doc
        .fontSize(18)
        .text("Lista de Contatos", { align: "center" })
        .moveDown();

      const validatedUser = returnUserSchema.parse(user);
      doc
        .fontSize(12)
        .text(
          ` Usuario: ${validatedUser.name}, E-mail:${validatedUser.email}, Telefone: ${validatedUser.phone}, Data: ${validatedUser.createdAt}`
        )
        .moveDown();

      doc.fontSize(14).text("Contatos:", { align: "left" }).moveDown();

      user.contacts.forEach((contact) => {
        doc
          .fontSize(10)
          .text(
            ` Nome: ${contact.name}, E-mail: ${contact.email}, Telefone: ${contact.phone}`
          );
      });

      doc.end();

      res.setHeader("Content-Type", "application/pdf");

      doc.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao gerar o relatório." });
    }
  }
);
