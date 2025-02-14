import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../api";
import { QUERY_KEYS } from "../../queries/query-keys";
import { MUTATION_KEYS } from "../mutation-keys";

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_AVATAR],
    mutationFn: async () => {
      return await httpClient.delete("/users/remove-avatar");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    },
  });
};
