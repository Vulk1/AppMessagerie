import type { Friend } from "@/types/chat.types";

export async function fetchFriends(): Promise<Friend[]> {
    const res = await fetch("/api/friends", {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch user friends");
    }
  
    return res.json();
}