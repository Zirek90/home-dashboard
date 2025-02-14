import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { QUERY_KEYS } from "@src/api/queries/query-keys";
import { MUTATION_KEYS } from "../mutation-keys";

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
