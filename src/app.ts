import express, { Application } from "express";
import { handleErrors } from "./errors";
import { userRoutes } from "./routes/user.routes";
import { loginRoutes } from "./routes/login.routes";
import { contactRoutes } from "./routes/contact.routes";
import { reportRoutes } from "./routes/report.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json"; // Importe o arquivo swagger.json

const app: Application = express();
app.use(express.json());

// Rotas da aplicação
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/contact", contactRoutes);
app.use("/report", reportRoutes);

// Middleware para servir a documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para tratamento de erros
app.use(handleErrors);

export default app;
