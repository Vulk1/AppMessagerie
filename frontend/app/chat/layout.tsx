"use client"

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ServersSidebar from "@/features/servers/components/ServersSidebar";
import UserPanel from "@/features/user/components/UserPanel";
import { fetchMe } from "@/features/user/api/fetchMe";
import { fetchFriends } from "@/features/friends/api/fetchFriends";
import { fetchServers } from "@/features/servers/api/fetchServers";

export default function ChatLayout({ children }: {children : React.ReactNode}) {

  const queryClient = useQueryClient();

  useEffect(() => {
    async function preload() {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: ["me"],
          queryFn: fetchMe
        }),
        queryClient.prefetchQuery({
          queryKey: ["servers"],
          queryFn: fetchServers
        }),
        queryClient.prefetchQuery({
          queryKey: ["friends"],
          queryFn: fetchFriends
        })
      ])
    }
  
    preload();
  }, [queryClient])

    return (
      <div className="flex h-screen relative">
  
        <ServersSidebar />
  
        {children}

        <UserPanel />
  
      </div>
    )
  }