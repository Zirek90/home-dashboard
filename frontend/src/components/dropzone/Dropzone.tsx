import { FileList } from "../file-list";
import { FileInput } from "../shared";
import { DropzoneInstructions } from "./dropzone-instructions";
import { useDropzone } from "./hook/useDropzone.hook";

interface DropzoneProps {
  maxSize: number; // Max file size in bytes (1 GB = 1073741824 bytes)
}

export function Dropzone(props: DropzoneProps) {
  const { maxSize } = props;
  const { handleFiles, fileInputRef, files, handleRemoveFile } = useDropzone(maxSize);

  return (
    <div className="w-full p-4">
      <div
        className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer bg-gray-100 dark:bg-gray-800"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleFiles}
        onDragOver={(e) => e.preventDefault()}
      >
        <DropzoneInstructions />
        <FileInput ref={fileInputRef} onChange={handleFiles} />

        <FileList files={files} handleRemoveFile={handleRemoveFile} />
      </div>
    </div>
  );
}
