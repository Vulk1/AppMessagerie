"use client";

import useServers from "../hooks/useServers";
import ServerItem from "./ServerItem";
import DMButton from "@/features/dm/components/DMButton";
import AsideComponent from "@/features/ui/components/AsideComponent";
import CreateServerModal from "@/features/ui/modals/CreateServerModal";
import { CirclePlus, Compass } from "lucide-react";
import type { Server } from "@/types/chat.types";

export default function ServersSidebar() {
    const { data: servers } = useServers();

    return (
        <aside className="flex-col w-20 bg-[#121214] h-full px-2 py-2 ">
            <DMButton />

            <div className="flex flex-col bg-linear-to-b from-gray-800 to-gray-400 rounded-t-[10px]">
                {servers?.map( (server: Server) => (
                    <ServerItem key={server.id} server={server} />
                ))}
            </div>

           <AsideComponent tooltipText="Ajouter un serveur">
                <button 
                className="p-2"
                onClick={() => {
                    const modal = document.getElementById(
                        "create-server-modal"
                    );

                    if (modal instanceof HTMLDialogElement) {
                        modal.showModal();
                    }
                }}
                >
                    <CirclePlus size={30} strokeWidth={2.75} color="#efeff1" />
                </button>
            </AsideComponent>

            <AsideComponent tooltipText="Découvrir">
                <button className="p-2">
                    <Compass size={30} strokeWidth={2.75} color="#efeff1" />
                </button>
            </AsideComponent>

            <CreateServerModal />
        </aside>
    );
}