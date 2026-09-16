import { 
    Request, 
    Response } 
    from "express";
import {
    createServer as createServerService, 
    updateServerIcon as updateServerIconService,
    getUserServers,
    getServerDetails as getServerDetailsService,
    getServerChannels as getServerChannelsService
    } 
    from "../services/servers.service.js";
import { createPresignedUploadUrl } 
    from "../services/r2.service.js";


export async function createServer(
    req: Request, 
    res: Response ){

    try {
        const { name } = req.body;
        const userId = req.user!.sub;

        const server = await createServerService({
            name,
            ownerId: userId,
        });

        return res.status(201).json(server);
    } catch (error) {
        // gestion d'erreurs

        return res.status(500).json({
            message: "Erreur interne du serveur",
        });
    }
}

export async function createServerIconUpload(
    req: Request<{ serverId: string }>, 
    res: Response ){

    try {
        const serverId = req.params.serverId;
        const { contentType } = req.body;

        const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        ];

        // On vérifie que le Content-Type fait partie des formats autorisés
        if(!contentType || !allowedTypes.includes(contentType)) {
            return res.status(400).json({
                message: "Format d'image non supporté",
            });
        }

        const key = `servers/${serverId}/icon`; //clé de l'image pour la génération d'une url présignée

        const uploadUrl = await createPresignedUploadUrl({
            key, 
            contentType
        });

        return res.status(200).json({
            uploadUrl,
        });

    } catch (error) {
        // Gestion d'erreurs
        return res.status(500).json({
            message: "Erreur interne du serveur",
        });
    }
}

export async function updateServerIcon(
    req: Request<{serverId: string}>, 
    res: Response){

        try {
            const { serverId }= req.params;
            
           const server = await updateServerIconService(serverId);

           return res.status(200).json(server);

        } catch(error) {
            return res.status(500).json({
                message: "Erreur interne du serveur",
            });
        }
}

export async function getServers(
    req: Request,
    res: Response
) {
    try {
        const userId = req.user!.sub;
        const servers = await getUserServers(userId);

        return res.status(200).json(servers);
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur interne du serveur",
        });
    }
}

export async function getServerDetails(
    req: Request<{ serverId: string }>,
    res: Response
) {
    try {
        const serverId = req.params.serverId;
        
        const serverDetails = await getServerDetailsService(serverId);

        return res.status(200).json(serverDetails);

    } catch(error) {
        // gestion d'erreurs
        if (error instanceof Error && error.message === "Serveur introuvable") {
            return res.status(404).json({
                message: "Serveur introuvable",
            });
        }
        return res.status(500).json({
            message: "Erreur interne du serveur",
        });
    }
}

export async function getServerChannels(
    req: Request<{ serverId: string }>,
    res: Response
) {
    try {
        const serverId = req.params.serverId;
        
        const channels = await getServerChannelsService(serverId);

        return res.status(200).json(channels);

    } catch(error) {
        // gestion d'erreurs
        if (error instanceof Error && error.message === "Serveur introuvable") {
            return res.status(404).json({
                message: "Serveur introuvable",
            });
        }
        return res.status(500).json({
            message: "Erreur interne du serveur",
        });
    }
}