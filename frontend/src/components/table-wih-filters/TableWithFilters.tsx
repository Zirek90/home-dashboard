import { useState } from "react";
import { useProductsQuery } from "@src/api/queries";
import { CategoryEnum, CurrencyEnum } from "@src/enums";
import { ProductInterface } from "@src/interfaces";
import { FilterableTable } from "../filter-table";
import { ProductModal } from "../product-modal";
import { ProductTable } from "../product-table";
import { Button, Loader } from "../shared";
import { useTableFilters } from "./hook/useTableFilters";
import { ActionItem } from "../product-table/product-action-menu";

const MOCK: ProductInterface[] = [
  {
    id: "1",
    name: "testname1",
    price: 1.2,
    currency: CurrencyEnum.PLN,
    shop: "shop1",
    category: CategoryEnum.GROCERY,
    createdAt: "2025-02-11T17:15:13.667Z",
    createdBy: {
      id: "122",
      username: "abc",
      avatar: null,
    },
  },
  {
    id: "2",
    name: "testname2",
    price: 3.2,
    currency: CurrencyEnum.EUR,
    shop: "",
    category: CategoryEnum.OTHERS,
    createdAt: "2025-01-11T17:15:13.667Z",
    createdBy: {
      id: "122",
      username: "abc",
      avatar: null,
    },
  },
];

export function TableWithFilters() {
  const { data, isLoading } = useProductsQuery();
  const { control, filteredData } = useTableFilters(data || []);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button text="Add Product" onClick={handleOpen} className="bg-green-500 hover:bg-green-600 !w-52" />
      </div>
      {isOpen && <ProductModal isOpen={isOpen} onClose={handleClose} mode="create" />}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Filters</h3>
        <FilterableTable control={control} />
      </div>
      <ProductTable
        data={filteredData}
        columns={[
          { header: "File Name", key: "name" },
          { header: "Price", key: "price" },
          { header: "Currency", key: "currency" },
          { header: "Shop", key: "shop" },
          { header: "Category", key: "category" },
          { header: "Created by", key: "createdBy" },
          { header: "Date", key: "createdAt" },
        ]}
        actions={(item) => <ActionItem key={item.id} id={item.id} />}
      />
    </div>
  );
}
