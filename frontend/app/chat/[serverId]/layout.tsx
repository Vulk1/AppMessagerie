import ChannelsSidebar from "@/features/channels/components/ChannelsSidebar";
import FriendsSidebar from "@/features/friends/components/FriendsSidebar";


export default async function ServerLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ serverId: string }>;
}) {
    const { serverId } = await params;

    return (
        <div className="flex ">
            <ChannelsSidebar serverId={serverId} className="h-full w-1/5"/>
            <div className="flex h-full w-3/5">
                {children}
            </div>
            <FriendsSidebar className="h-full w-1/5"/>
        </div>
    );
}