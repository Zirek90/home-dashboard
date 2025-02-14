import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import { httpClient } from "../api";
import { FilesResponseType } from "../response-type";

//* We use queryOptions here as we cannot pass hook to tanstack router loader
export const getPublicFilesQuery = queryOptions({
  queryKey: [QUERY_KEYS.FILES],
  queryFn: async () => {
    const response = await httpClient.get<FilesResponseType[]>("/files/public");
    return response.data;
  },
  refetchOnWindowFocus: false,
});
