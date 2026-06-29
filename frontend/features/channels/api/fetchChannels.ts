import type { Channel } from "@/types/chat.types";
import { API_URL } from "@/lib/api";

export async function fetchChannels(serverId: string): Promise<Channel[]> {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }
    
    const res = await fetch(`${API_URL}/channels`, {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch servers");
    }
  
    return res.json();
}