import { API_URL } from "@/lib/api";

export async function addFriend(username: string) {
  const res = await fetch(`${API_URL}/friends/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    throw new Error("Impossible d'ajouter cet ami");
  }

  return res.json();
}