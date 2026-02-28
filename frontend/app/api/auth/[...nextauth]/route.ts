import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginResponse, LoginInput } from "@/types/auth.types";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {} // On crée une page login personnalisé
        ,
        async authorize(credentials) {
            if(!credentials) return null;

            const { identifier, password} = credentials as LoginInput;
            
            const res = await fetch(process.env.NEXT_PUBLIC_API_LOGIN_ROUTE!, {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({identifier, password})
            });

            const data = await res.json();

            if(!res.ok) {
                throw new Error(data?.message ?? "Erreur de connexion");
            }
            
            return data as LoginResponse;
        },
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            if(session.user) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    username: token.username,
                    avatar: token.avatar
                }
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST }