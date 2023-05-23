import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";

export const loginRoutes: Router = Router();

loginRoutes.post("", createLoginController);
