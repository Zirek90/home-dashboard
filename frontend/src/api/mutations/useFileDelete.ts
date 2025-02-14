import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS } from "./mutation-keys";
import { httpClient } from "../api";
import { QUERY_KEYS } from "../queries/query-keys";

export const useFileDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_FILE],
    mutationFn: async (fileId: string) => {
      const response = await httpClient.delete(`/files/public/${fileId}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FILES] });
    },
  });
};
