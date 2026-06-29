import type { DMConversation } from "@/types/chat.types";
import { API_URL } from "@/lib/api";

export async function fetchDMConversations(): Promise<DMConversation[]> {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const res = await fetch(`${API_URL}/dm/conversations`, {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch user conversations");
    }
  
    return res.json();
}