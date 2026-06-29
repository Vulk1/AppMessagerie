import DMSidebar from "@/features/dm/components/DMSidebar";
import FriendsSidebar from "@/features/friends/components/FriendsSidebar";
import Link from "next/link";

export default function DMLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <div className="flex flex-col h-full flex-1">
                <div className="flex-1">
                    <Link href={"/chat/me/friends"}>
                        Amis
                    </Link>
                    <Link href={"/chat/me/friends"}>
                        Boutique
                    </Link>
                </div>
                <div className="flex-2">
                    <DMSidebar />
                </div>
            </div>
            <div className="flex-3">
                {children}
            </div>
            <div className="flex-1">
               <FriendsSidebar />
            </div>
        </div>
    );
}