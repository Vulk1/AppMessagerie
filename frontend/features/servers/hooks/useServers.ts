import { useQuery } from "@tanstack/react-query"
import { fetchServers } from "../api/fetchServers";

export default function useServers() {
    return useQuery({
      queryKey: ["servers"],
      queryFn: fetchServers,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false
    });
}