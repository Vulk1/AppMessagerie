import { RegisterInput, LoginInput} from "../types/auth.types.js";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export const loginService = async ({ identifier, password }: LoginInput) => {
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
            password: true
         },
    });

    if(!user) {
        throw new AppError('Identifiants Incorrectes', 400);
    }

    const valid = bcrypt.compare(password, user.password);

    if(!valid) {
        throw new AppError('Identifiants Incorrectes', 400);
    }

    return {
        id: user.id,
        email: user.email,
        username: user.username
    };
};

export const registerService = async ({email, username, password, confirmPassword}: RegisterInput) => {
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

    return {
        id: data.id,
        email: data.email,
        username: data.username
    };
}