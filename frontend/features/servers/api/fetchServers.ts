import type { Server, ServerDetails } from "@/types/chat.types";
import apiClient from "@/lib/apiClient";

export async function fetchServers(): Promise<Server[]> {
    const res = await apiClient.request("/servers");
  
    if (!res.ok) {
        throw new Error("Failed to fetch servers");
    }
  
    return res.json();
}

export async function fetchServerDetails( serverId: string ): Promise<ServerDetails>  {
    const res = await apiClient.request(`/servers/${serverId}`);

    if(!res.ok) {
        throw new Error("Failed to fetch server details");
    }

    return res.json();
}