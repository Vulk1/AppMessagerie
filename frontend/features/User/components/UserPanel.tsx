"use client"
import { useMe } from "../hooks/useMe";
import Image from "next/image";

export default function UserPanel() {

    const { data: user, isLoading, isError } = useMe();

    if (isLoading) return <div>Loading...</div>;

    if (isError || !user) {
        return <div>Impossible de charger le profil.</div>;
    }
    
    return (
        <div className="absolute bottom-0 left-0 w-[320px] h-16 bg-zinc-800 z-50 flex items-center px-3">
            <Image src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
            <span>{user?.username}</span>
        </div>
    );
    
}