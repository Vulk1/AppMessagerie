import type { Request, Response } from "express";
import {getMessages as getMessagesService} from "../services/channels.service.js";

type GetMessagesParams = {
    channelId: string;
};

type GetMessagesQuery = {
    cursor?: string;
    limit?: string;
};

export async function getMessages(
    req: Request<GetMessagesParams, unknown, unknown, GetMessagesQuery>,
    res: Response
) {

    try {
        const { channelId } = req.params;
        const { cursor, limit = "25" } = req.query;

        // récupération des messages...
        const {messages, nextCursor} = await getMessagesService({
            channelId, 
            cursor, 
            limit
        });

        return res.status(200).json({messages, nextCursor});

    } catch (error) {
        if (error instanceof Error && error.message === "INVALID_LIMIT") {
            return res.status(400).json({
                message: "Le paramètre limit est invalide.",
            });
        }
        
        return res.status(500).json({
            message: "Erreur interne du serveur",
        });
    }
}