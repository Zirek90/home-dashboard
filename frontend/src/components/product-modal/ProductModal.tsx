import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddProduct, useDeleteProduct, useUpdateProduct } from "@src/api/mutations";
import { useProductQuery } from "@src/api/queries";
import { CategoryEnum, CurrencyEnum } from "@src/enums";
import { useOutsideClick } from "@src/hooks";
import { ProductFormValuesInterface } from "@src/interfaces";
import { useNotificationContext } from "@src/providers";
import { ProductFormValidationSchema } from "@src/schemas";
import { ModalModeType } from "@src/types";
import { ProductForm } from "../product-form";
import { Modal, ModalHeader, ModalBody, ModalAction } from "../shared";

interface ProductModalProps {
  mode: ModalModeType;
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal(props: ProductModalProps) {
  const { mode, id, isOpen, onClose } = props;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const isDeleteMode = mode === "delete";
  const { data, isLoading } = useProductQuery(id);
  const { control, handleSubmit, reset } = useForm<ProductFormValuesInterface>({
    defaultValues: data
      ? data
      : {
          name: "",
          shop: "",
          category: CategoryEnum.GROCERY,
          currency: CurrencyEnum.PLN,
        },
    resolver: !isDeleteMode ? zodResolver(ProductFormValidationSchema) : undefined,
  });
  const { showError, showSuccess } = useNotificationContext();
  const { mutateAsync: addItem, isPending: isAddPending } = useAddProduct();
  const { mutateAsync: deleteProduct, isPending: isDeletePending } = useDeleteProduct();
  const { mutateAsync: updateProduct, isPending: isUpdatePending } = useUpdateProduct();
  const loading = isLoading || isAddPending || isDeletePending || isUpdatePending;

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const handleClose = () => {
    onClose();
    reset();
  };
  useOutsideClick(modalRef, handleClose);

  const header = {
    create: "Add new item",
    delete: `Delete item ${data?.name}`,
    edit: `Edit item ${data?.name}`,
  };

  const onSubmit = async (data: ProductFormValuesInterface) => {
    try {
      if (mode === "create") {
        await addItem(data);
        showSuccess("Item successfully added");
      } else if (mode === "edit" && id) {
        await updateProduct({ data, id });
        showSuccess("Item successfully edited");
      } else if (mode === "delete" && id) {
        await deleteProduct(id);
        showSuccess("Item successfully deleted");
      }
      handleClose();
    } catch (e) {
      console.error(e);
      showError("Couldn't add item");
    }
  };

  return (
    <Modal open={isOpen} ref={modalRef}>
      <ModalHeader header={header[mode]} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isDeleteMode ? (
          <ModalBody>
            <ProductForm control={control} />
          </ModalBody>
        ) : (
          <ModalBody>
            <p>Are you sure you wish to remove item?</p>
          </ModalBody>
        )}
        <ModalAction onCancel={handleClose} type={mode} loading={loading} />
      </form>
    </Modal>
  );
}
