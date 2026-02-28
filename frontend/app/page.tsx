"use client"
import { useSession } from "next-auth/react"

export default function Home() {
  const {data : session, status} = useSession();
  if (status === "loading") {
    return <p>Chargement...</p>
  }

  if (!session) {
    return <p>Non connecté</p>
  }

  return <p>Bienvenue {session.user.username}</p>
}
