import { useQueryClient, useMutation } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { QUERY_KEYS } from "@src/api/queries/query-keys";
import { ProductRequestType } from "@src/api/request-type";
import { MUTATION_KEYS } from "../mutation-keys";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_PRODUCT],
    mutationFn: async (data: ProductRequestType) => {
      return await httpClient.post("/product", data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};
