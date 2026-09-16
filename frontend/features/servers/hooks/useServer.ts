import { useQuery } from "@tanstack/react-query";
import { fetchServerDetails } from "../api/fetchServers";

export default function useServer(serverId: string) {
    return useQuery({
        queryKey: ["servers", serverId],
        queryFn: () => fetchServerDetails(serverId),
    });
}