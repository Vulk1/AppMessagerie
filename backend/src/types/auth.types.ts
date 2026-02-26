import type { z } from "zod";
import type { registerSchema, loginSchema } from "../validators/auth.schema.js";

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
