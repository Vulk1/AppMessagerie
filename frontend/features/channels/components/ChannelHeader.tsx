import { Channel } from "@/types/chat.types";


export default function ChannelHeader({
    channelId,
    serverId,
    className,
}:{
    channelId: string;
    serverId: string;
    className?: string
}) {


    return (
        <div className={`flex justify-between w-full h-10 ${className}`}>
            <div>
                #{channelId}
            </div>
            <div>
                parametres
            </div>
        </div>
    );
}