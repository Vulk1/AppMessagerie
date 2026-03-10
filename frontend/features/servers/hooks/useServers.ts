import { useQuery } from "@tanstack/react-query"

function fetchServers() {
    return {data: []}
}

export default function useServers() {
    return useQuery({
      queryKey: ["servers"],
      queryFn: fetchServers
    });
  }