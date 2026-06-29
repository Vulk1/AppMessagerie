import type { Friend } from "@/types/chat.types";
import { API_URL } from "@/lib/api";

export async function fetchFriends(): Promise<Friend[]> {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const res = await fetch(`${API_URL}/friends`, {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch user friends");
    }
  
    return res.json();
}