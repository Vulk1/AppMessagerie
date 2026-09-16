import AsideComponent from "@/features/ui/components/AsideComponent";
import type { Server } from "@/types/chat.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ServerItemProps = {
    server: Server;
    className?: string;
};

export default function ServerItem({ server, className }: ServerItemProps) {
    const router = useRouter();

    const handleClick = () => {

        router.push(`/chat/${server.id}`);
    };

    return (
        <AsideComponent hoverMarker={false} tooltipText={server.name} onClick={handleClick} className="bg-transparent hover:scale-110">
            {
                server.icon ? (
                    <Image 
                        src={server.icon} 
                        alt={server.name} 
                        width={48} 
                        height={48}
                        className="w-full h-full object-fit"
                    /> 
                 ) : (
                    <div className="truncate flex items-center text-xs px-1 w-full h-full">
                        <span>{server.name}</span>
                    </div>
                )
            }
        </AsideComponent>
    );
}