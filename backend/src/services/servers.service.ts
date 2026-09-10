import prisma from "../lib/prisma.js";
import { ServerRole } from "../generated/prisma/client.js";
import type { ServerPreview } from "../types/chat.types.js";


export async function createServer(
   {name,
    ownerId
   }:{
    name : string,
    ownerId : string
}) : Promise<ServerPreview> {

    // On vérifie qu'aucun serveur ne porte ce nom là
    const existingServer = await prisma.server.findUnique({
        where : {
            name: name
        },
    });

    if(existingServer) {
        throw new Error("Un serveur porte déjà ce nom");
    }

    const server = await prisma.server.create({
        data: {
          name,
          ownerId: ownerId,
      
          members: {
            create: {
              userId: ownerId,
              role: ServerRole.OWNER,
            },
          },
        },
        select : {
            id : true,
            name: true,
            icon: true
        }
      });

      return server;
    
}

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