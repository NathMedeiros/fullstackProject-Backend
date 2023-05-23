import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schema";

export type Ilogin = z.infer<typeof createLoginSchema>;
