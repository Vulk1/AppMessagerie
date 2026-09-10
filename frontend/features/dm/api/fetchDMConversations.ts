import type { DMConversation } from "@/types/chat.types";
import apiClient from "@/lib/apiClient";

export async function fetchDMConversations(): Promise<DMConversation[]> {

    const res = await apiClient.request("/dm/conversations");
  
    if (!res.ok) {
        throw new Error("Failed to fetch user conversations");
    }
  
    return res.json();
}