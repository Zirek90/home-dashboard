import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { ProductResponse } from "@src/api/response-type";
import { QUERY_KEYS } from "../query-keys";

export const useProductQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      const response = await httpClient.get<ProductResponse>(`/product/${id}`);
      return response.data;
    },
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });
};
