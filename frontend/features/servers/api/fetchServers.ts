import type { Server } from "@/types/chat.types";
import apiClient from "@/lib/apiClient";

export async function fetchServers(): Promise<Server[]> {


    const res = await apiClient.request("/servers");
  
    if (!res.ok) {
        throw new Error("Failed to fetch servers");
    }
  
    return res.json();
}