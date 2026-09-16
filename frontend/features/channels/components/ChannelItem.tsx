import { Channel } from "@/types/chat.types";


export default function ChannelItem({ 
    channel, 
    className,
} : {
    channel : Channel;
    className?: string;
}) {

    return (
        <div className={`flex w-full${className}`}>
            <div className="">
                {channel.name}
            </div>
            <div>
                "Boutons pour inviter dans le salon et parametres"
            </div>
        </div>
    );

}