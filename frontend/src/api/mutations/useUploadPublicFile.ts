import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorHandler } from "@src/utils";
import { httpClient } from "../api";
import { MUTATION_KEYS } from "./mutation-keys";
import { QUERY_KEYS } from "../queries/query-keys";

export const useUploadPublicFile = (handleRemoveFile: (fileName: string) => void) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const queryClient = useQueryClient();

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await httpClient.post("/files/public/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });
      handleRemoveFile(file.name);
    } catch (error) {
      const errorMessage = errorHandler(error);
      console.error("Error uploading file:", errorMessage);
    }
  };

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.UPLOAD_FILE],
    mutationFn: uploadFile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FILES] });
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
    },
  });

  return { ...mutation, uploadProgress };
};
