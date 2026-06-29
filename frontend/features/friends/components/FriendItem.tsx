import Avatar from "@/features/ui/components/Avatar";
import { Friend } from "@/types/chat.types";


export default function FriendItem({ friend } : { friend: Friend }) {
    return (
        <div className="flex justify-start items-center gap-1 w-full border-accent border-2">
           <Avatar user={friend} /> 
            <span>{friend.username}</span>
        </div>
    );
}