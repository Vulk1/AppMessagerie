import { useQuery } from "@tanstack/react-query";
import { fetchFriends } from "../api/fetchFriends";

export function useFriends() {
    return useQuery({
          queryKey: ["friends"],
          queryFn: fetchFriends,
          staleTime: 1000 * 60 * 5, // 5 minutes
          retry: 2,
          refetchOnWindowFocus: false
    });
}

