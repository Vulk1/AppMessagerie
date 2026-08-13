import type { User } from "@/types/chat.types";
import apiClient from "@/lib/apiClient";

export async function fetchMe(): Promise<User> {

    const res = await apiClient.request("user/me");
  
    if (!res.ok) {
        throw new Error("Failed to fetch user profil");
    }
  
    return res.json();
}