import type { Server } from "@/types/chat.types";

export async function fetchServers(): Promise<Server[]> {
    const res = await fetch("/api/servers", {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch servers");
    }
  
    return res.json();
}