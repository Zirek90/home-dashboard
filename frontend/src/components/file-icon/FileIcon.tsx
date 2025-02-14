import { getIconForExtension } from "@src/utils";

export function FileIcon({ fileName }: { fileName: string }) {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  return getIconForExtension(extension);
}
