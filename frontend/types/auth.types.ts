import type { z } from "zod";
import type { registerSchema, loginSchema } from "../lib/validations/auth.schema.js";

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export interface LoginResponse {
    id: string;
    email: string;
    username: string;
    avatar: string;
}