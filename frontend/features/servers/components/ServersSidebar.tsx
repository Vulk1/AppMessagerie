import useServers from "../hooks/useServers";
import ServerItem from "./ServerItem";
import useDMConversations from "@/features/dm/hooks/useDMConversations"
import DMButton from "@/features/dm/components/DMButton";
import type { Server } from "@/types/chat.types";

export default function ServersSidebar() {
    const { data: servers } = useServers();

    return (
        <aside className="w-20 bg-amber-400 h-full">
            <DMButton />

            {servers?.map( (server: Server) => (
                <ServerItem key={server.id} server={server} />
            ))}

        </aside>
    );
}