import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginResponse, LoginInput } from "@/types/auth.types";
import { SignJWT, jwtVerify, importPKCS8, importSPKI } from "jose";
import type { JWT } from "next-auth/jwt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {} // On crée une page login personnalisée
        ,
        async authorize(credentials) {
            if(!credentials) return null;

            const { identifier, password} = credentials as LoginInput;
            const BACKEND_API_URL = process.env.BACKEND_API_URL;

            const res = await fetch(`${BACKEND_API_URL}/auth/login`!, {
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
    jwt : {
        encode : async ({ token }) => {
            if (!token) {
                throw new Error("Token is missing");
            }
            if (!token?.sub) {
                throw new Error("Token subject is missing");
            }

            const privateKey = await importPKCS8(
                process.env.JWT_PRIVATE_KEY!,
                "RS256"
            );

            return await new SignJWT(
            {
                email: token.email,
                username: token.username,
                avatar: token.avatar,
            })
                .setProtectedHeader({
                    alg: "RS256",
                    typ: "JWT",
                })
                .setSubject(String(token.sub))
                .setIssuer(process.env.JWT_ISSUER!)
                .setAudience(process.env.JWT_AUDIENCE!)
                .setIssuedAt()
                .setExpirationTime("1h")
                .sign(privateKey);
        },
        decode : async ({ token }) => {

            if(!token) {
                return null;
            }

            try {
                const publicKey = await importSPKI(
                    process.env.JWT_PUBLIC_KEY!,
                    "RS256"
                );

                const { payload } = await jwtVerify(
                    token,
                    publicKey,
                    {
                        issuer: process.env.JWT_ISSUER!,
                        audience: process.env.JWT_AUDIENCE!,
                        algorithms: ["RS256"],
                    }
                );
            
                return payload as JWT;  
            } catch {
                return null;
            } 
        }

    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.sub = user.id;
                token.email = user.email;
                token.username = user.username;
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            if(session.user) {
                session.user = {
                    id: token.sub!,
                    email: token.email!,
                    username: token.username!,
                    avatar: token.avatar
                }
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST }