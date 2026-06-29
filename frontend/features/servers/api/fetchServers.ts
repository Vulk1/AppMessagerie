import type { Server } from "@/types/chat.types";
import { API_URL } from "@/lib/api";

export async function fetchServers(): Promise<Server[]> {

    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const res = await fetch(`${API_URL}/servers`, {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch servers");
    }
  
    return res.json();
}