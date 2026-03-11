import type { User } from "@/types/chat.types";

export async function fetchMe(): Promise<User> {
    const res = await fetch("/api/me", {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch user profil");
    }
  
    return res.json();
}