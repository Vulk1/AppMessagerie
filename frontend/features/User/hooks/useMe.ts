import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/fetchMe";

export function useMe() {
    return useQuery({
          queryKey: ["me"],
          queryFn: fetchMe,
          staleTime: 1000 * 60 * 5, // 5 minutes
          retry: 2,
          refetchOnWindowFocus: false
    });
}

