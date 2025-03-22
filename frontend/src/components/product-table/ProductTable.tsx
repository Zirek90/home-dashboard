import { ReactNode, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { CurrencyEnum } from "@src/enums";
import { ProductInterface } from "@src/interfaces";
import { ProductSummarize } from "../product-summarize";
import { Table } from "../shared";
import { PaginationControllers } from "./pagination-controllers";

interface ProductTableProps {
  data: ProductInterface[];
  columns: ColumnDef<ProductInterface, keyof ProductInterface>[];
  actions?: (item: ProductInterface) => ReactNode;
}

export function ProductTable({ data, columns, actions }: ProductTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const totalCosts = useMemo(() => {
    return data.reduce(
      (totals, item) => {
        if (item.currency === CurrencyEnum.EUR) {
          totals.eur += +item.price;
        } else if (item.currency === CurrencyEnum.PLN) {
          totals.pln += +item.price;
        }
        return totals;
      },
      { eur: 0, pln: 0 }
    );
  }, [data]);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md">
      <Table<ProductInterface> table={table} actions={actions} />
      <PaginationControllers table={table} />
      <ProductSummarize totalCosts={totalCosts} />
    </div>
  );
}
