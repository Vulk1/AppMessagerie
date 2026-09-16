import prisma from "../lib/prisma.js";
import { ServerRole } from "../generated/prisma/client.js";
import type { ServerDetails, ServerPreview, Channel } from "../types/chat.types.js";
import { getR2PublicUrl } from "./r2.service.js";


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

    const server = await prisma.$transaction(async (tx) => {
        // Création du serveur + ajout du propriétaire comme membre
        const server = await tx.server.create({
            data: {
                name, 
                ownerId,

                members : {
                    create : {
                        userId: ownerId,
                        role: ServerRole.OWNER
                    },
                },
            },
            select: {
                id: true,
                name: true,
                icon: true,
            },
        });

        // Création du channel général par défaut
        await tx.channel.create({
            data: {
                name: "général",
                serverId: server.id
            },
        });

        return server;

    });
    
    return toServerPreview(server);
}

export async function updateServerIcon(serverId : string ) : Promise<ServerPreview>
{
    const key = `servers/${serverId}/icon`;

    const server = await prisma.server.update({
        where : {
            id: serverId,
        },
        data : {
            icon: key,
        },
        select : {
            id: true,
            name: true,
            icon: true,
        }
    });

    return toServerPreview(server);
}

export async function getUserServers(userId: string): Promise<ServerPreview[]>{
    
    const servers = await prisma.server.findMany({
        where : {
            members : {
                some : {
                    userId
                },
            },
        },
        select : {
            id : true,
            name: true,
            icon : true,
        },
    });

    return servers.map(toServerPreview);  
}

export async function getServerDetails(serverId: string): Promise<ServerDetails>{
    const server = await prisma.server.findUnique({
        where : {
            id: serverId
        },
        select: {
            id: true,
            name: true,
            icon: true,
            ownerId: true,
            createdAt: true,
        }
    });

    if (!server) {
        throw new Error("Serveur introuvable");
    }

    return server;
}

export async function getServerChannels(serverId: string): Promise<Channel[]> {
    const channels = await prisma.channel.findMany({
        where: {
            serverId
        },
        select : {
            id: true,
            name: true,
            serverId: true,
            type: true,
            createdAt: true
        }
    });

    return channels;
}

function toServerPreview(server: ServerPreview): ServerPreview {
    return {
      ...server,
      icon: server.icon
        ? getR2PublicUrl(server.icon)
        : null,
    };
}

