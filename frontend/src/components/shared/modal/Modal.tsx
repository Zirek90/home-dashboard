import { ReactNode, forwardRef } from "react";
import { ModalModeType } from "@src/types";
import { Button } from "../button";

export interface ModalProps {
  open: boolean;
  children: ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({ open, children }, ref) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={ref} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
        {children}
      </div>
    </div>
  );
});

export interface ModalHeaderProps {
  header: string;
}

export function ModalHeader(props: ModalHeaderProps) {
  const { header } = props;
  return <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{header}</div>;
}

export interface ModalBodyProps {
  children: ReactNode;
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div className="text-gray-700 dark:text-gray-300">{children}</div>;
}

export interface ModalActionProps {
  onCancel: () => void;
  type: ModalModeType;
  loading: boolean;
}

export function ModalAction(props: ModalActionProps) {
  const { onCancel, type, loading } = props;

  const actionStyles = {
    create: "bg-green-500 hover:bg-green-600",
    delete: "bg-red-500 hover:bg-red-600",
    edit: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <div className="flex justify-end space-x-2 mt-6">
      <Button
        onClick={onCancel}
        className="px-4 py-2 border border-gray-500 !text-black !dark:text-white 
             bg-transparent dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-400 rounded"
        text="Cancel"
        pending={loading}
      />
      <Button
        className={actionStyles[type]}
        type="submit"
        text={type.charAt(0).toUpperCase() + type.slice(1)}
        pending={loading}
      />
    </div>
  );
}
