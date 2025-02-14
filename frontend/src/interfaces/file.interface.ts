export interface FileInterface {
  id: string;
  name: string;
  size: string;
  createdAt: string;
  uploadedBy: {
    id: string;
    username: string;
    avatar: string | null;
  };
}
