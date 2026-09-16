import prisma from "../../lib/prisma.js";
import { ServerRole } from "../../generated/prisma/enums.js";

export async function hasServerWritePermission(
    {userId, serverId}:
    {userId: string, serverId: string}) 
    : Promise<boolean> 
    {
        const serverMembership = await prisma.serverMember.findUnique({
            where : {
                userId_serverId: {
                    userId,
                    serverId
                }
            },
            select : {
                role: true
            }
        });

        if(!serverMembership)
            return false;

        return serverMembership.role === ServerRole.OWNER || serverMembership.role === ServerRole.ADMIN;
}