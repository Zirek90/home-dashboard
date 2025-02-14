import { ChangeEvent, useState } from "react";
import { PageDirectionEnum } from "@src/enums";
import { FileInterface } from "@src/interfaces";

interface useTableProps {
  data: FileInterface[];
}

export interface useTableReturn {
  handleChangePage: (direction: PageDirectionEnum) => void;
  handleRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  totalPages: number;
  startRow: number;
  endRow: number;
  rowsPerPage: number;
  currentPage: number;
}

export function useTable({ data }: useTableProps): useTableReturn {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
  return { handleChangePage, handleRowsPerPageChange, totalPages, startRow, endRow, rowsPerPage, currentPage };
}
