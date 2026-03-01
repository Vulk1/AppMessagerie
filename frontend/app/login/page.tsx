import type { Metadata } from "next";
import LoginClient from "./loginClient";

export const metadata: Metadata = {
    title: "Se connecter",
    description: "Messagerie en ligne Osmose. Connectez vous, discutez, vibez.",
};

  
export default function Login() {

    return (
        <LoginClient />
    );
}