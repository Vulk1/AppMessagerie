import { MessageCircle } from "lucide-react";
import AsideComponent from "@/features/ui/components/AsideComponent";

type DMButtonProps = {
    selected?: boolean;
}


export default function DMButton( {selected } : DMButtonProps) {
    return(
        <AsideComponent tooltipText="Messages privés" >
            <button className="p-2">
                <MessageCircle size={30} strokeWidth={2.75} color="#efeff1"  />
            </button>
        </AsideComponent>
    );
}