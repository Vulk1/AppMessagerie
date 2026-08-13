import prisma from "../lib/prisma.js";
import type { UserProfile } from "../types/chat.types.js";

export async function getCurrentUserProfileService(
    userId: string
) : Promise<UserProfile>
{
    const user = await prisma.user.findUnique({
        where : {
            id: userId
        },
        select : {
            id: true,
            email: true,
            username: true,
            avatar: true,
            firstName: true,
            lastName: true,
            bio: true,
            birthday: true,
        }
    });

    if(!user) {
        throw new Error("User not found");
    }

    return user;
}