import { FiMoreVertical } from "react-icons/fi";
import { ProductModal } from "@src/components/product-modal";
import { useActionMenu } from "./hook/useActionMenu.hook";

interface ActionMenuProps {
  id: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductActionMenu(props: ActionMenuProps) {
  const { onEdit, onDelete } = props;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50">
      <button onClick={onEdit} className="w-full text-left px-4 py-2 bg-yellow-500 hover:bg-yellow-600 truncate">
        Edit
      </button>
      <button
        onClick={onDelete}
        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-800"
      >
        Delete
      </button>
    </div>
  );
}

interface ActionItemProps {
  id: string;
}

export function ActionItem(props: ActionItemProps) {
  const { id } = props;
  const { isMenuOpen, menuRef, openMenu, handleEdit, handleDelete, isModalOpen, modalMode, handleCloseModal } =
    useActionMenu();

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={openMenu} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
        <FiMoreVertical size={20} />
      </button>
      {isMenuOpen && <ProductActionMenu id={id} onEdit={handleEdit} onDelete={handleDelete} />}
      {isModalOpen && <ProductModal id={id} isOpen={isModalOpen} mode={modalMode} onClose={handleCloseModal} />}
    </div>
  );
}
