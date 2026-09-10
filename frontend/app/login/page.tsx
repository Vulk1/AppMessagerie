import type { Metadata } from "next";
import LoginClient from "./loginClient";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Se connecter",
    description: "Messagerie en ligne Osmose. Connectez vous, discutez, vibez.",
};

  
export default async function Login() {
    const session = await getServerSession(authOptions);

    if(session) {
        redirect("/chat");
    }

    return (
        <LoginClient />
    );
}