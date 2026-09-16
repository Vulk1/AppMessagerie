import ChannelHeader from "@/features/channels/components/ChannelHeader";
import MessageList from "@/features/messages/components/MessageList";
import MessageComposer from "@/features/messages/components/MessageComposer";

export default async function ChannelChat({
    params,
}: {
    params: Promise<{
        serverId: string;
        channelId: string;
    }>;
}) {
    const { serverId, channelId } = await params;

    return (
        <div className="flex h-full flex-col">
            <ChannelHeader
                serverId={serverId}
                channelId={channelId}
            />

            <MessageList
                serverId={serverId}
                channelId={channelId}
            />

            <MessageComposer
                serverId={serverId}
                channelId={channelId}
            />
        </div>
    );
}