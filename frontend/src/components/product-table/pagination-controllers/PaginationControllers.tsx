import { Table } from "@tanstack/react-table";

interface PaginationControllersProps<T> {
  table: Table<T>;
}

export function PaginationControllers<T>(props: PaginationControllersProps<T>) {
  const { table } = props;

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Rows per page:
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="ml-2 p-1 bg-white dark:bg-gray-700 border rounded"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
        <span>
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="ml-2 p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
