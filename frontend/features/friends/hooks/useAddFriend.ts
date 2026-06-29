import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "../api/addFriends";

export default function useAddFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFriend,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });
}