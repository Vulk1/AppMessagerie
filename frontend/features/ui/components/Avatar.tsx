import { UserPreview } from "@/types/chat.types";
import Image from "next/image";


export default function Avatar({ user } : { user: UserPreview }) {
    return (
        <div className={`avatar ${user.status === "online" ? "avatar-online" : "avatar-offline" }`}>
            <div className="w-24 rounded-xl">
                <Image 
                alt="Avatar"
                src={user.avatar!}
                width={35}
                height={35}
                />
            </div>
        </div>
    );
}