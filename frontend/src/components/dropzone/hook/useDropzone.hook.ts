import { ChangeEvent, DragEvent, RefObject, useCallback, useRef, useState } from "react";
import { useNotificationContext } from "@src/providers";

interface useDropzoneReturn {
  files: File[];
  fileInputRef: RefObject<HTMLInputElement>;
  handleFiles: (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => void;
  handleRemoveFile: (fileName: string) => void;
}

export function useDropzone(maxSize: number): useDropzoneReturn {
  const [files, setFiles] = useState<File[]>([]);
  const { showError } = useNotificationContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilelist = useCallback(
    (fileList: FileList, selectedFiles: File[]) => {
      Array.from(fileList).forEach((file) => {
        if (file.size <= maxSize) {
          selectedFiles.push(file);
        } else {
          showError(`File size exceeds the limit - ${file.name}`);
        }
      });
    },
    [maxSize, showError]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, selectedFiles: File[]) => {
      const fileList = (event.target as HTMLInputElement).files;
      if (fileList) {
        handleFilelist(fileList, selectedFiles);
      }
    },
    [handleFilelist]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>, selectedFiles: File[]) => {
      const fileList = event.dataTransfer?.files;
      if (fileList) {
        handleFilelist(fileList, selectedFiles);
      }
    },
    [handleFilelist]
  );

  const handleFiles = useCallback(
    (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => {
      const selectedFiles: File[] = [];

      if (event.type === "change") {
        handleChange(event as ChangeEvent<HTMLInputElement>, selectedFiles);
      }

      if (event.type === "drop") {
        handleDrop(event as DragEvent<HTMLDivElement>, selectedFiles);
      }

      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    },
    [handleChange, handleDrop]
  );

  const handleRemoveFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return { files, fileInputRef, handleFiles, handleRemoveFile };
}
