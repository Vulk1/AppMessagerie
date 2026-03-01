import RegisterClient from "./registerClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "S'inscrire",
    description: "Messagerie en ligne Osmose. Connectez vous, discutez, vibez.",
};


export default function Register() {
    return (
        <RegisterClient />
    );
}