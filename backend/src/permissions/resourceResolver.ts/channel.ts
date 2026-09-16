import prisma from "../../lib/prisma.js";
import { ResourceResolver } from "../../types/chat.types.js";

export const serverFromChannel: ResourceResolver<{
    channelId: string}>
    = async (req) => {
    const channelId = req.params.channelId;

    const channel = await prisma.channel.findUnique({
        where: {
            id: channelId,
        },
        select: {
            serverId: true,
        },
    });

    return channel?.serverId ?? null;
};