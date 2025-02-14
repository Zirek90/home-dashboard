import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { QUERY_KEYS } from "@src/api/queries/query-keys";
import { MUTATION_KEYS } from "../mutation-keys";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_PRODUCT],
    mutationFn: async (id: string) => {
      return await httpClient.delete(`/product/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};
