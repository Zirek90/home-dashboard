import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FileItem } from "./file-item";
interface FileListProps {
  files: File[];
  handleRemoveFile: (fileName: string) => void;
}

export function FileList(props: FileListProps) {
  const { files, handleRemoveFile } = props;
  const [autoAnimateRef] = useAutoAnimate();

  return (
    <ul className="mt-2 space-y-2 w-full" ref={autoAnimateRef}>
      {files.map((file) => (
        <FileItem key={file.name} file={file} handleRemoveFile={handleRemoveFile} />
      ))}
    </ul>
  );
}
