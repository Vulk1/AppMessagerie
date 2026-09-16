import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchChannelMessages } from "../api/fetchChannelMessages";

export default function useChannelMessages(channelId: string) {
    return useInfiniteQuery({
        queryKey: ["channel-messages", channelId],

        queryFn: ({ pageParam }) =>
            fetchChannelMessages({
                channelId,
                cursor: pageParam,
                limit: 25,
            }),

        initialPageParam: undefined as string | undefined,

        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor ?? undefined;
        },

        enabled: !!channelId,
    });
}