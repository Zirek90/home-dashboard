import { queryOptions } from "@tanstack/react-query";
import { httpClient } from "@src/api/api";
import { FilesResponseType } from "@src/api/response-type";
import { QUERY_KEYS } from "../query-keys";

//* We use queryOptions here as we cannot pass hook to tanstack router loader
export const getPublicFilesQuery = queryOptions({
  queryKey: [QUERY_KEYS.FILES],
  queryFn: async () => {
    const response = await httpClient.get<FilesResponseType[]>("/files/public");
    return response.data;
  },
  refetchOnWindowFocus: false,
});
