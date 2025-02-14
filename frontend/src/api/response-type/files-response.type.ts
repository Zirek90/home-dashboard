export type FilesResponseType = {
  createdAt: Date;
  id: string;
  name: string;
  size: string;
  uploadedBy: {
    id: string;
    username: string;
    avatar: string | null;
  };
};
