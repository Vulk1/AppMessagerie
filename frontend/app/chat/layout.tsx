import ServersSidebar from "@/features/servers/components/ServersSidebar";
import UserPanel from "@/features/User/components/UserPanel";

export default function ChatLayout({ children }: {children : React.ReactNode}) {
    return (
      <div className="flex h-screen relative">
  
        <ServersSidebar />
  
        {children}

        <UserPanel />
  
      </div>
    )
  }