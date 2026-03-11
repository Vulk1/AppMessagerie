import { DMConversation } from "@/types/chat.types";
import Avatar from "@/features/ui/components/Avatar";

export default function DMItem({ conversation }: { conversation: DMConversation}) {

    return (
        <div className="w-full flex">
            <div>
                <Avatar user={conversation.participant}/>
            </div>
            <div className="flex flex-col">
                <div className="w-full font-bold text-white">
                    {conversation.participant.username}
                </div>
                <div className={`truncate w-full ${conversation.unreadCount > 0 ? "font-semibold" : "font-medium"}`}>
                {conversation.lastMessage?.content
                ? conversation.lastMessage.content
                : conversation.lastMessage?.attachmentType}
                </div>
                {conversation.unreadCount > 0 && (
                <div className="truncate w-full text-sm">
                    Vous avez {conversation.unreadCount} messages non lus.
                </div>
                )}
            </div>
        </div>
    );

}