
export default async function MessageComposer({
    serverId,
    channelId,
    className,
}:{
    serverId: string;
    channelId: string;
    className?: string
}) {

    return (
        <div className={`
        w-full
        ${className}`}
        >

        </div>
    );
}