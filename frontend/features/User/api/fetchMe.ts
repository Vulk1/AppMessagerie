import type { User } from "@/types/chat.types";
import { API_URL } from "@/lib/api";

export async function fetchMe(): Promise<User> {

    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const res = await fetch(`${API_URL}/me`, {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch user profil");
    }
  
    return res.json();
}