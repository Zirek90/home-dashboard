import { FiMoreVertical } from "react-icons/fi";
import { Button, CircularProgress } from "@src/components/shared";
import { useFileActionMenu } from "./hook/useFileActionItem.hook";

interface ActionMenuProps {
  name: string;
  onDownload: () => void;
  onDelete: () => void;
}

export function FileActionMenu(props: ActionMenuProps) {
  const { name, onDownload, onDelete } = props;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50">
      <Button
        text={`Download ${name}`}
        onClick={onDownload}
        className="w-full text-left px-4 py-2 !text-green-500 hover:bg-green-100 dark:hover:bg-green-800 truncate bg-transparent"
      />

      <Button
        text="Delete"
        onClick={onDelete}
        className="w-full text-left px-4 py-2 !text-red-500 hover:bg-red-100 dark:hover:bg-red-800 bg-transparent"
      />
    </div>
  );
}

interface FileActionProps {
  id: string;
  name: string;
}

export function FileAction(props: FileActionProps) {
  const { id, name } = props;
  const { progress, isMenuOpen, menuRef, handleAbort, handleDelete, handleDownload, openMenu } = useFileActionMenu({
    id,
    name,
  });

  if (progress) {
    return <CircularProgress progress={progress} onAbort={handleAbort} />;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={openMenu} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
        <FiMoreVertical size={20} />
      </button>
      {isMenuOpen && <FileActionMenu name={name} onDownload={handleDownload} onDelete={handleDelete} />}
    </div>
  );
}
