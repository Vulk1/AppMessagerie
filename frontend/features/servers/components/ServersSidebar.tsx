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
        <aside className="flex flex-col w-20 bg-[#121214] h-full py-2 justify-baseline items-center gap-3 ">
            <div className="flex flex-col item-center">
                <DMButton />
                <div className="divider my-2"></div>
            </div>
            

            <div className="flex flex-col rounded-t-[10px] gap-3">
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
                    <CirclePlus size={25} strokeWidth={2.75} color="#efeff1" />
                </button>
            </AsideComponent>

            <AsideComponent tooltipText="Découvrir">
                <button className="p-2">
                    <Compass size={25} strokeWidth={2.75} color="#efeff1" />
                </button>
            </AsideComponent>

            <CreateServerModal />
        </aside>
    );
}