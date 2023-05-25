import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { userRoutes } from "./routes/user.routes";
import { loginRoutes } from "./routes/login.routes";
import { contactRoutes } from "./routes/contact.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/contact", contactRoutes);

app.use(handleErrors);

export default app;
