import { format } from "date-fns";
import { FilesResponseType } from "@src/api/response-type";
import { FileInterface } from "@src/interfaces";
import { bytesToMegabytes } from "@src/utils";

export const mapFilesResponse = (files: FilesResponseType[]): FileInterface[] => {
  return files.map((file) => {
    const formattedCreatedAt = format(new Date(file.createdAt), "yyyy-MM-dd, HH:mm:ss");

    return {
      id: file.id,
      name: file.name,
      size: bytesToMegabytes(file.size),
      createdAt: formattedCreatedAt,
      uploadedBy: file.uploadedBy,
    };
  });
};
