import { useQueryClient, useMutation } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { QUERY_KEYS } from "@src/api/queries/query-keys";
import { ProductFormValuesInterface } from "@src/interfaces";
import { MUTATION_KEYS } from "../mutation-keys";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_PRODUCT],
    mutationFn: async ({ data, id }: { data: ProductFormValuesInterface; id: string }) => {
      return await httpClient.patch(`/product/${id}`, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};
