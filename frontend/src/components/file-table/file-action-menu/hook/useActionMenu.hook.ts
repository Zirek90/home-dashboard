import { RefObject, useRef, useState } from "react";
import { useFileDelete } from "@src/api/mutations";
import { useLazyDownloadPublicFileQuery } from "@src/api/queries";
import { useOutsideClick } from "@src/hooks";
import { useNotificationContext } from "@src/providers";
import { downloadFile, errorHandler } from "@src/utils";

interface useActionMenuProps {
  id: string;
  name: string;
}

interface useActionMenuReturn {
  isMenuOpen: boolean;
  progress: number;
  handleAbort: () => void;
  menuRef: RefObject<HTMLDivElement>;
  handleDownload: () => void;
  handleDelete: () => void;
  openMenu: () => void;
}

export function useActionMenu(props: useActionMenuProps): useActionMenuReturn {
  const { id, name } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null!);
  const { mutateAsync: deleteFile } = useFileDelete();
  const { refetch: fetchFile, progress, handleAbort } = useLazyDownloadPublicFileQuery(id);
  const { showSuccess, showError } = useNotificationContext();

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  useOutsideClick(menuRef, closeMenu);

  const handleDownload = async () => {
    try {
      const result = await fetchFile();
      if (result.data) {
        downloadFile(name, result.data, result.data.type);
        showSuccess(`File downloaded - ${name}`);
      }
      setIsMenuOpen(false);
    } catch (error) {
      showError("Error downloading file");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFile(id);
      showSuccess(`Deleted ${name}`);
      setIsMenuOpen(false);
    } catch (error) {
      const errorMessage = errorHandler(error);
      showError(`Error deleting file - ${errorMessage}`);
    }
  };

  return { isMenuOpen, progress, handleAbort, menuRef, handleDownload, handleDelete, openMenu };
}
