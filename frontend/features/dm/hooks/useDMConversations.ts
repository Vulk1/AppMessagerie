import { useQuery } from "@tanstack/react-query"

function fetchDMConversations() {
    return;
}


export default function useDMConversations() {
    return useQuery({
          queryKey: ["servers"],
          queryFn: fetchDMConversations
        });
}