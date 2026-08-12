import useServers from "../hooks/useServers";
import ServerItem from "./ServerItem";
import DMButton from "@/features/dm/components/DMButton";
import type { Server } from "@/types/chat.types";

export default function ServersSidebar() {
    const { data: servers } = useServers();

    return (
        <aside className="w-25 bg-gray-950 h-full">
            <DMButton />

            <div className="flex flex-col bg-linear-to-b from-gray-800 to-gray-400 rounded-t-[10px]">
                {servers?.map( (server: Server) => (
                    <ServerItem key={server.id} server={server} />
                ))}
            </div>
        </aside>
    );
}