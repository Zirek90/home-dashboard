import { ReactNode } from "@tanstack/react-router";
import { FileInterface } from "@src/interfaces";
import { Column } from "@src/types";
import { useTable } from "./hook/useTable.hook";
import { TableBody } from "./table-body";
import { TableFooter } from "./table-footer";
import { TableHeader } from "./table-header";

interface TableProps {
  data: FileInterface[];
  columns: Column<FileInterface>[];
  actions?: (item: FileInterface) => ReactNode;
}

export function Table({ data, columns, actions }: TableProps) {
  const { handleChangePage, handleRowsPerPageChange, totalPages, startRow, endRow, rowsPerPage, currentPage } =
    useTable({ data });

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md">
      <table className="min-w-full border-collapse">
        <TableHeader columns={columns} hasActions={!!actions} />
        <TableBody data={data} columns={columns} actions={actions} startRow={startRow} endRow={endRow} />
      </table>
      <TableFooter
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        startRow={startRow}
        endRow={endRow}
        total={data.length}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
