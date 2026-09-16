"use client";
import useServer from "@/features/servers/hooks/useServer";
import useChannels from "../hooks/useChannels";
import ChannelItem from "./ChannelItem";

export default function ChannelsSidebar(
    { 
        serverId,
        className,
    
    }: { 
        serverId: string;
        className?: string;
    }) {

    const {
        data: server,
        isLoading: isLoadingServer,
        isError : isErrorServer
    } = useServer(serverId);

    const {
        data: channels,
        isLoading: isLoadingChannels,
        isError: isErrorChannels
    } = useChannels(serverId);

    return (
        <div className={`
            flex
            flex-col
            ${className}`}
        >
            <div className="h-1/12">
                {isLoadingServer && <p>Chargement...</p>}

                {isErrorServer && <p>Erreur lors du chargement du nom du serveur</p>}

                {server?.name}
            </div>
            <div className="h-2/12">
                Interaction
            </div>
            <div className="h-9/12">
                {isLoadingChannels && <p>Chargement...</p>}

                {isErrorChannels && <p>Erreur lors du chargement des channels</p>}

                {channels?.map((channel) => (
                    <ChannelItem key={channel.id} channel={channel} className="" />  
                ))}
            </div>
        </div>
    );
}