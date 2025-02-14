import React from "react";
import { PageDirectionEnum } from "@src/enums";
import { PAGE_OPTIONS } from "@src/globals";

interface TableFooterProps {
  rowsPerPage: number;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  startRow: number;
  endRow: number;
  total: number;
  handleChangePage: (direction: PageDirectionEnum) => void;
  currentPage: number;
  totalPages: number;
}

export function TableFooter(props: TableFooterProps) {
  const { rowsPerPage, handleRowsPerPageChange, startRow, endRow, total, handleChangePage, currentPage, totalPages } =
    props;

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Rows per page:
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="ml-2 p-1 bg-white dark:bg-gray-700 border rounded"
        >
          {PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-end space-x-4 text-sm text-gray-600 dark:text-gray-400">
        <div>{`${startRow}-${endRow} of ${total}`}</div>
        <div className="flex items-center">
          <button
            onClick={() => handleChangePage(PageDirectionEnum.PREVIOUS)}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <button
            onClick={() => handleChangePage(PageDirectionEnum.NEXT)}
            className="ml-2 p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
