import { useQuery } from "@tanstack/react-query"
import { fetchDMConversations } from "../api/fetchDMConversations";

export default function useDMConversations() {
    return useQuery({
          queryKey: ["dm-conversations"],
          queryFn: fetchDMConversations
        });
}