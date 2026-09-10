import type { Server } from "@/types/chat.types";
import Image from "next/image";

type ServerItemProps = {
    server: Server;
    className?: string;
};

export default function ServerItem({ server, className }: ServerItemProps) {
    return (
        <div className={`${className}`}>
            {
                server.icon ? 
                    <Image src={server.icon} alt={server.name} width={48} height={48}/> 
                    : 
                    <div>{server.name}</div>
            }
        </div>
    );
}