import { queryOptions, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import { httpClient } from "../api";

export const useProfileQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: async () => {
      const response = await httpClient.get(`/users/profile`);
      return response.data;
    },
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });
};

export const getProfileQuery = queryOptions({
  queryKey: [QUERY_KEYS.PROFILE],
  queryFn: async () => {
    const response = await httpClient.get(`/users/profile`);
    return response.data;
  },
  refetchOnWindowFocus: false,
});
