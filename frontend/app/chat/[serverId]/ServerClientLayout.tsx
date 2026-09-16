"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { fetchServerDetails } from "@/features/servers/api/fetchServers";
import { fetchChannels } from "@/features/channels/api/fetchChannels";

export default function ServerClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams<{ serverId: string}>();
    const serverId = params.serverId;

    const queryClient = useQueryClient();

    useEffect(() => {
        async function preload() {
          await Promise.all([
            queryClient.prefetchQuery({
              queryKey: ["servers", serverId],
              queryFn: () => fetchServerDetails( serverId ),
            }),
          ])
        }
      
        preload();
      }, [queryClient, serverId]);

    return (
    <div>
        {children}
    </div>)
}
