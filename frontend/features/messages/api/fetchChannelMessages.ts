import apiClient from "@/lib/apiClient";
import type { MessagesPageDTO } from "@/types/chat.types";


interface FetchChannelMessagesParams {
    channelId: string;
    cursor?: string;
    limit?: number;
}

export async function fetchChannelMessages({
    channelId,
    cursor,
    limit = 25,
}: FetchChannelMessagesParams): Promise<MessagesPageDTO> {

    const searchParams = new URLSearchParams();

    searchParams.set("limit", String(limit));

    if (cursor) {
        searchParams.set("cursor", cursor);
    }

    const res = await apiClient.request(
        `/channels/${channelId}/messages?${searchParams.toString()}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch channel messages");
    }

    return res.json();
}