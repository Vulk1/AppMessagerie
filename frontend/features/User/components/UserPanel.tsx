"use client";
import { useMe } from "../hooks/useMe";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Settings } from "lucide-react";

interface UserPanelProps {
    className?: string;
}

export default function UserPanel( {className } : UserPanelProps) {

    const { data: user, isLoading, isError } = useMe();

    if (isLoading) return <div>Loading...</div>;

    if (isError || !user) {
        return <div>Impossible de charger le profil.</div>;
    }
    //className="absolute bottom-0 left-0 w-full h-16 bg-zinc-800 z-50 flex items-center px-3 
    
    return (
        <div className={`absolute bottom-0 left-0 ml-2 h-16 bg-zinc-800 z-50 flex items-center px-3 ${className}`}>
            <div className="flex-1  items-center justify-start">
               <Image 
                    src={user.avatar} 
                    width={32}
                    height={32} 
                    alt="Avatar" 
                    className="w-8 h-8 rounded-full" 
                /> 
            </div>
            <div className="flex-3 items-center justify-start">
                {user?.username}
            </div>
            <div className="dropdown dropdown-top dropdown-center">
                <div tabIndex={0} role="button" className="btn m-1"><Settings /></div>
                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                        <button onClick={() => signOut()}>
                            Se déconnecter
                        </button>
                    </li>
                    <li>
                        <button >
                            Paramètres
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    );
    
}