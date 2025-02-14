import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { ProductResponse } from "@src/api/response-type";
import { QUERY_KEYS } from "../query-keys";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: async () => {
      const response = await httpClient.get<ProductResponse[]>(`/product`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
