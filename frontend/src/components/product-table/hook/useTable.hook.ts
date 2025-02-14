import { ChangeEvent, useMemo, useState } from "react";
import { CurrencyEnum, PageDirectionEnum } from "@src/enums";
import { ProductInterface, TotalCostsInterface } from "@src/interfaces";

interface useTableProps {
  data: ProductInterface[];
}

export interface useTableReturn {
  handleChangePage: (direction: PageDirectionEnum) => void;
  handleRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  totalPages: number;
  startRow: number;
  endRow: number;
  rowsPerPage: number;
  currentPage: number;
  totalCosts: TotalCostsInterface;
}

export function useTable({ data }: useTableProps): useTableReturn {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalCosts = useMemo(
    () =>
      data.reduce(
        (totals, item) => {
          if (item.currency === CurrencyEnum.EUR) {
            totals.eur += +item.price;
          } else if (item.currency === CurrencyEnum.PLN) {
            totals.pln += +item.price;
          }
          return totals;
        },
        { eur: 0, pln: 0 }
      ),
    [data]
  );

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(startRow + rowsPerPage - 1, data.length);

  const handleChangePage = (direction: PageDirectionEnum) => {
    setCurrentPage((prev) => {
      if (direction === PageDirectionEnum.NEXT && prev < totalPages) return prev + 1;
      if (direction === PageDirectionEnum.PREVIOUS && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return {
    handleChangePage,
    handleRowsPerPageChange,
    totalPages,
    startRow,
    endRow,
    rowsPerPage,
    currentPage,
    totalCosts,
  };
}
