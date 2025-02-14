import { RefObject, useRef, useState } from "react";
import { useOutsideClick } from "@src/hooks";
import { ModalModeType } from "@src/types";

interface useActionMenuReturn {
  isMenuOpen: boolean;
  menuRef: RefObject<HTMLDivElement>;
  openMenu: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleCloseModal: () => void;
  modalMode: ModalModeType;
  isModalOpen: boolean;
}

export function useActionMenu(): useActionMenuReturn {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalModeType>("edit");

  const menuRef = useRef<HTMLDivElement>(null!);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  useOutsideClick(menuRef, closeMenu);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    setIsModalOpen(true);
    setModalMode("edit");
    closeMenu();
  };

  const handleDelete = async () => {
    setIsModalOpen(true);
    setModalMode("delete");
    closeMenu();
  };

  return { isMenuOpen, menuRef, openMenu, handleDelete, handleEdit, modalMode, isModalOpen, handleCloseModal };
}
