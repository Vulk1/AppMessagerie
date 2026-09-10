import type { Channel } from "@/types/chat.types";
import apiClient from "@/lib/apiClient";

export async function fetchChannels(serverId: string): Promise<Channel[]> {
  
    const res = await apiClient.request("/channels");
  
    if (!res.ok) {
        throw new Error("Failed to fetch servers");
    }
  
    return res.json();
}