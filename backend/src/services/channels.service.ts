import prisma from "../lib/prisma.js";
import type { Message } from "../types/chat.types.js";

type GetMessagesParams = {
    channelId: string;
    cursor?: string;
    limit: string;
}


export async function getMessages({
    channelId,
    cursor,
    limit
}: GetMessagesParams ): Promise<{
    messages: Message[];
    nextCursor: string | null;
}> {

    const parsedLimit = Number.parseInt(limit, 10);
    
    if (
        !Number.isInteger(parsedLimit) ||
        parsedLimit < 1 ||
        parsedLimit > 100
    ) {
        throw new Error("INVALID_LIMIT");
    }

    const messages = await prisma.message.findMany({
        where : {
            channelId,
        },

        orderBy : {
            createdAt: "desc",
        },

        take: parsedLimit + 1,

        ...(cursor && {
            skip: 1,
            cursor: {
                id: cursor,
            },
        }),

        select : {
            id: true,
            content: true,
            senderId: true,
            channelId: true,
            createdAt: true,
            sender: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            },
            attachments : {
                select: {
                    id: true,
                    messageId: true,
                    url: true,
                    thumbnailUrl: true,
                    type: true,
                    width: true,
                    height: true,
                    createdAt: true,
                }
            }
        }

    });

    const hasMore = messages.length > parsedLimit;

    if (hasMore) {
        messages.pop();
    }

    const nextCursor =
        hasMore && messages.length > 0
            ? messages[messages.length - 1].id
            : null;

    messages.reverse();

    return {
        messages,
        nextCursor,
    };
}