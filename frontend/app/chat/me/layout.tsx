import useDMConversations from "@/features/dm/hooks/useDMConversations";
import { useFriends } from "@/features/friends/hooks/useFriends";

export default function DMLayout({ children }: { children: React.ReactNode }) {
    const { data: conversations } = useDMConversations();
    const {data: friends } = useFriends();
    
    return (
        <div>
            <div>
                conversation et amis
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}