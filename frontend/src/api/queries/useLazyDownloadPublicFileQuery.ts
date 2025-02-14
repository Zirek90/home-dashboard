import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import { httpClient } from "../api";

export const useLazyDownloadPublicFileQuery = (file_id: string) => {
  const [progress, setProgress] = useState<number>(0);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEYS.FILE, file_id],
    queryFn: async ({ signal }) => {
      const response = await httpClient.get(`/files/download/${file_id}`, {
        responseType: "blob",
        signal,
        onDownloadProgress: (event) => {
          if (event.total) {
            const percentCompleted = Math.round((event.loaded * 100) / event.total);
            setProgress(percentCompleted);
          }
        },
      });
      return response.data;
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const { isFetching } = query;

  useEffect(() => {
    if (!isFetching) {
      //* I need timeout here to avoid last batch of onDownloadProgress which breaks reset of progress
      setTimeout(() => {
        setProgress(0);
      }, 500);
    }
  }, [isFetching]);

  const handleAbort = useCallback(() => {
    queryClient.cancelQueries({ queryKey: [QUERY_KEYS.FILE, file_id] });
  }, [queryClient, file_id]);

  return { ...query, progress, handleAbort };
};
