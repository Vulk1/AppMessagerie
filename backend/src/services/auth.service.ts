import { RegisterInput, LoginInput} from "../types/auth.types.js";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export const loginService = async ({ identifier, password }: LoginInput) => {
    console.log(`Tentative de connexion de ${identifier}`);
    // On vérifie qu'il existe un utilisateur avec cet email ou username (identifier)
    const user = await prisma.user.findFirst({
        where: { 
            OR: [
                { email: identifier },
                { username: identifier }
            ]
         },
         select: {
            id: true,
            email: true,
            username: true,
            password: true,
            avatar: true
         },
    });

    if(!user) {
        throw new AppError('Identifiants Incorrectes', 400);
    }

    const valid = await bcrypt.compare(password, user.password);

    if(!valid) {
        throw new AppError('Identifiants Incorrectes', 400);
        
    }

    console.log(`Est connecté : ${identifier}`);
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar
    };
};

export const registerService = async ({email, username, password, confirmPassword}: RegisterInput) => {
    console.log(`Tentative de création de compte de ${email}`);
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {email},
                {username}
            ]
        },
        select: {
            email: true,
            username: true
        },
    });

    if(user) {
        if(email === user.email) {
            throw new AppError('Un compte avec cet email existe déjà', 409);
        } else {
            throw new AppError('Un compte avec ce nom d\'utilisateur existe déjà', 409);
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {email, username, password: hashedPassword};

    const data = await prisma.user.create({
        data: newUser
    });

    console.log(`Compte créé : ${email}`);
    return {
        id: data.id,
        email: data.email,
        username: data.username
    };
}