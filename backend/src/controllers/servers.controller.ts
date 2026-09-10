import { Request, Response } from "express";
import {createServer as createServerService, hasServerWritePermission} from "../services/servers.service.js";

const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
];


export async function createServer(req: Request, res: Response) {

    try {
        const { name } = req.body;
        const userId = req.user!.sub;

        const server = await createServerService({
            name,
            ownerId: userId,
        });

        return res.status(201).json(server);
    } catch (error) {
        // gestion de l'erreur

        return res.status(500);
    }
}

export async function createServerIconUpload(req: Request<{ serverId: string }>, res: Response) {

    try {
        const serverId = req.params.serverId;
        const userId = req.user!.sub;
        
        const perm = await hasServerWritePermission( {userId, serverId} ); 

        if(!perm) {
            return res.status(403).json({message: "Permission déclinée"});
        }

        const { contentType } = req.body;

        // On vérifie bien que c'est une image avec les formats définis
        if(!contentType || !allowedTypes.includes(contentType)) {
            return res.status(400).json({
                message: "Format d'image non supporté",
            });
        }

        const key = `servers/${serverId}/icon`; //clé de l'image pour la génération d'une url présignée

        



    } catch (error) {
        return res.status(500);
    }
}





