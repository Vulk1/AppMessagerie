import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import ChatClientLayout from "./ChatClientLayout";

export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <ChatClientLayout>
            {children}
        </ChatClientLayout>
    );
}