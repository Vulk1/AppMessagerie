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

  const avatarUrl =
  `${process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL}/avatars/default/avatar1.png`;

  return <p>
    Bienvenue {session.user.username}
    <img src={avatarUrl} alt="avatar"/>
    </p>
}
