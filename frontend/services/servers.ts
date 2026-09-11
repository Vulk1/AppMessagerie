import apiClient from "@/lib/apiClient";
import { Server } from "@/types/chat.types";

export async function createServer(serverName : string) : Promise<Server> {

        const res = await apiClient.request("/servers", {
            method: "POST",
            body: JSON.stringify({
                name : serverName
            })
        });

        if(!res.ok) {
            throw new Error("impossible de créer le serveur");
        }

        const server: Server = await res.json();

        return server;
}

export async function getServerIconUploadUrl(serverId : string, fileType : string) : Promise<string> {

    const res = await apiClient.request(`/servers/${serverId}/icon-upload`, {
        method: "POST",
        body: JSON.stringify({
            contentType : fileType
        })
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer l'url d'upload");
    }

    const data: { uploadUrl: string } = await res.json();

    return data.uploadUrl;
}

export async function updateServerIcon(
    serverId : string
    ): Promise<Server> {

    const res = await apiClient.request(`/servers/${serverId}/icon`, {
        method: "PATCH",
    });

    if (!res.ok) {
        throw new Error("Impossible de mettre à jour l'icône");
    }

    const server: Server = await res.json();
    return server;
}


