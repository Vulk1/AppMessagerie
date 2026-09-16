"use client";

import { useEffect, useRef } from "react";
import useMessages from "../hooks/useChannelMessages";
import MessageItem from "./MessageItem";

export default function MessageList({
    serverId,
    channelId,
    className,
}: {
    serverId: string;
    channelId: string;
    className?: string;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useMessages(channelId);

    const messages =
        data?.pages
            .slice()
            .reverse()
            .flatMap((page) => page.messages) ?? [];

    useEffect(() => {
        const element = scrollRef.current;

        if (!element) return;

        const handleScroll = () => {
            if (
                element.scrollTop <= 100 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };

        element.addEventListener("scroll", handleScroll);

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, [
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    ]);

    if (isLoading) {
        return (
            <div className={className}>
                Chargement des messages...
            </div>
        );
    }

    if (isError) {
        return (
            <div className={className}>
                Impossible de charger les messages.
            </div>
        );
    }

    return (
        <div
            ref={scrollRef}
            className={`overflow-y-auto ${className ?? ""}`}
        >
            {isFetchingNextPage && (
                <div>
                    Chargement des anciens messages...
                </div>
            )}

            {messages.map((message) => (
                <MessageItem
                    key={message.id}
                    message={message}
                />
            ))}
        </div>
    );
}