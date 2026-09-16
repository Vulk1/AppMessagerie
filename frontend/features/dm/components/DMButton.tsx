"use client";

import { MessageCircle } from "lucide-react";
import AsideComponent from "@/features/ui/components/AsideComponent";
import { useRouter } from "next/navigation";

type DMButtonProps = {
    selected?: boolean;
}

export default function DMButton( {selected } : DMButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push('/chat/me/friends');
    }
    return(
        <AsideComponent tooltipText="Messages privés" onClick={handleClick} >
            <button className="p-2">
                <MessageCircle size={25} strokeWidth={2.75} color="#efeff1"  />
            </button>
        </AsideComponent>
    );
}