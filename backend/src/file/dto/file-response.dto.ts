export class FileResponseDto {
  id: string;
  name: string;
  path: string;
  size: number;
  uploadedBy: {
    id: string;
    username: string;
  } | null;
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    path: string,
    size: number,
    uploadedBy: { id: string; username: string } | null,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.size = size;
    this.uploadedBy = uploadedBy;
    this.createdAt = createdAt;
  }
}
