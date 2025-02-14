import { queryOptions, useQuery } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { QUERY_KEYS } from "../query-keys";

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
