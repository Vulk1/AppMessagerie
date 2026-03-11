import type { Channel } from "@/types/chat.types";

export async function fetchChannels(serverId: string): Promise<Channel[]> {
    const res = await fetch("/api/channels", {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch servers");
    }
  
    return res.json();
}