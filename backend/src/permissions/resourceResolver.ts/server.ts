import { ResourceResolver } from "../../types/chat.types.js";

export const serverFromParams: ResourceResolver<{
    serverId: string;
}> = async (req) => {
    const serverId = req.params.serverId;

    return serverId ?? null;
};