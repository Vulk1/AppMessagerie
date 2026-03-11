import { useQuery } from "@tanstack/react-query"
import { fetchChannels } from "../api/fetchChannels";

export default function useChannels(serverId: string) {
    return useQuery({
      queryKey: ["channels", serverId],
      queryFn: () => fetchChannels(serverId),
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      enabled: !!serverId
    });
  }