import apiClient from "@/lib/apiClient";

export async function addFriend(username: string) {

  const res = await apiClient.request("/friends/add", {
    method: "POST",
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    throw new Error("Impossible d'ajouter cet ami");
  }

  return res.json();
}