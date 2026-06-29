import { useFriends } from "../hooks/useFriends";
import FriendItem from "./FriendItem";
import type { Friend } from "@/types/chat.types";

export default function FriendsSidebar() {
    const {data: friends } = useFriends();

    return (
        <div className="h-full w-full">
          {friends && friends.length === 0 ? (
            <div>Aucun ami</div>
          ) : (
            <div className="flex flex-col h-full w-full">
                {
                    friends?.map( (friend: Friend) => (
                        <FriendItem key={friend.id} friend={friend} />
                    ))
                }
            </div>
          )}
        </div>
      );
}