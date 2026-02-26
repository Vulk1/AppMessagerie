import { z } from "zod";

export const registerSchema = z
    .object({
        email: z
        .email()
        .max(255, "L'email doit contenir au maximum 255 caractères")
        .transform((val) => val.toLowerCase().trim()),
    
        password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(100, "Le mot de passe doit contenir maximum 100 caractères")
        .regex(/[A-Z]/, "Doit contenir au moins une majuscule")
        .regex(/[a-z]/, "Doit contenir au moins une minuscule")
        .regex(/[0-9]/, "Doit contenir au moins un chiffre"),
        
        confirmPassword: z.string(),
    
        username: z
        .string()
        .min(3, "Minimum 3 caractères")
        .max(20, "Maximum 20 caractères")
        .regex(/^[a-zA-Z0-9_]+$/, "Uniquement lettres, chiffres et _")
        .trim()
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Les mots de passe ne correspondent pas",
              });
        }
    });

export const loginSchema = z.object({
identifier: z
    .string()
    .min(3, "Identifiant invalide")
    .transform((v) => v.trim().toLowerCase()),

password: z
    .string()
    .min(8, "Mot de passe invalide")
    .max(100, "Mot de passe invalide"),
});
