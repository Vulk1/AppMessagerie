import type { DMConversation } from "@/types/chat.types";

export async function fetchDMConversations(): Promise<DMConversation[]> {
    const res = await fetch("/api/dm/conversations", {
        credentials: "include"
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch user conversations");
    }
  
    return res.json();
}