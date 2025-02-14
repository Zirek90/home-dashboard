import { MouseEvent } from "react";
import { useUploadPublicFile } from "@src/api/mutations";
import { FileIcon, ProgressBar } from "@src/components";
import { bytesToMegabytes } from "@src/utils";

interface FileItemProps {
  file: File;
  handleRemoveFile: (fileName: string) => void;
}

export function FileItem(props: FileItemProps) {
  const { file, handleRemoveFile } = props;
  const { mutate: uploadFile, uploadProgress } = useUploadPublicFile(handleRemoveFile);

  const preventPropagation = (e: MouseEvent) => e.stopPropagation();

  return (
    <li
      className="flex flex-col items-center justify-between px-4 py-2 bg-white text-black rounded-md w-full cursor-default dark:bg-black dark:text-white"
      onClick={preventPropagation}
    >
      <div className="flex items-center justify-between w-full space-x-4">
        <div className="flex items-center space-x-4">
          <FileIcon fileName={file.name} />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm truncate">{file.name}</p>
            <p className="text-xs">{bytesToMegabytes(file.size)}</p>
          </div>
        </div>
        <div className="space-x-4">
          <button
            className="text-red-500 hover:text-red-700"
            onClick={(e) => {
              preventPropagation(e);
              handleRemoveFile(file.name);
            }}
          >
            Remove
          </button>
          <button
            className="text-green-500 hover:text-green-700"
            onClick={(e) => {
              preventPropagation(e);
              uploadFile(file);
            }}
          >
            Upload
          </button>
        </div>
      </div>
      <ProgressBar progress={uploadProgress} />
    </li>
  );
}
