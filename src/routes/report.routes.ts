import { Router, Request, Response } from "express";
import PDFDocument from "pdfkit";
import { User } from "../entities";
import { returnUserSchema } from "../schemas/user.schema";
import { AppDataSource } from "../data-source";

export const reportRoutes: Router = Router();

reportRoutes.get("", async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      relations: {
        contacts: true,
      },
    });

    const doc = new PDFDocument();

    doc
      .fontSize(18)
      .text("Relatório de Clientes", { align: "center" })
      .moveDown();

    users.forEach((user, index) => {
      const validatedUser = returnUserSchema.parse(user);
      doc
        .fontSize(12)
        .text(
          `Cliente ${index + 1}: Nome: ${validatedUser.name}, E-mail:${
            validatedUser.email
          }, Contato: ${validatedUser.phone}, Data: ${validatedUser.createdAt}`
        );

      user.contacts.forEach((contact) => {
        doc
          .fontSize(10)
          .text(
            `   - Contato: Nome: ${contact.name}, E-mail: ${contact.email}, Telefone: ${contact.phone}`
          );
      });

      doc.moveDown();
    });

    doc.end();

    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao gerar o relatório." });
  }
});
