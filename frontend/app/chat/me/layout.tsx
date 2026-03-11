import DMSidebar from "@/features/dm/components/DMSidebar";
import FriendsSidebar from "@/features/friends/components/FriendsSidebar";

export default function DMLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>
                <div>
                    <button>
                        Amis
                    </button>
                    <button>
                        Boutique
                    </button>
                </div>
                <DMSidebar />
            </div>
            <div>
                {children}
            </div>
            <div>
               <FriendsSidebar />
            </div>
        </div>
    );
}