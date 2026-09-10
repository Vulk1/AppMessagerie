import type { Friend } from "@/types/chat.types";
import apiClient from "@/lib/apiClient";

export async function fetchFriends(): Promise<Friend[]> {
    
    const res = await apiClient.request("/friends")
  
    if (!res.ok) {
        throw new Error("Failed to fetch user profil");
    }
  
    return res.json();
}