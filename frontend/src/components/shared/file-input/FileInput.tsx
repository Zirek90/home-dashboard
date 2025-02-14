import { ChangeEvent, DragEvent, forwardRef } from "react";

interface FileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const { onChange } = props;

  return <input type="file" ref={ref} multiple className="hidden" onChange={onChange} />;
});
