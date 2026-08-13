import type { z } from "zod";
import type { registerSchema, loginSchema } from "../validators/auth.schema.js";
import type { JWTPayload } from "jose";

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export interface AuthenticatedUser extends JWTPayload {
    sub: string;
    email: string;
    username: string;
    avatar: string;
}