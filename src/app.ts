import express, { Application } from "express";
import cors from "cors";
import { handleErrors } from "./errors";
import { userRoutes } from "./routes/user.routes";
import { loginRoutes } from "./routes/login.routes";
import { contactRoutes } from "./routes/contact.routes";
import { reportRoutes } from "./routes/report.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/contact", contactRoutes);
app.use("/report", reportRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(handleErrors);

export default app;
