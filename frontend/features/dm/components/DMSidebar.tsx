import { Plus } from "lucide-react";
import useDMConversations from "../hooks/useDMConversations";
import { DMConversation } from "@/types/chat.types";
import DMItem from "./DMItem";

export default function DMSidebar() {
    const { data: conversations } = useDMConversations();

    return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center hover:text-[var(--light-white)] w-full h-2">
            <span>
                Messages Privés
            </span>
            <div className="tooltip" data-tip="Créer un MP">
                <button className="btn text-[var(--dull-white)]">
                    <Plus />
                </button>
            </div>
        </div>
        <div className="flex flex-col p-2">
            {conversations?.map( (conversation: DMConversation) => (
                <DMItem key={conversation.id} conversation={conversation} />
            ))}
        </div>
    </div>
    );
}