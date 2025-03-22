import { ReactNode } from "react";
import { useReactTable, getCoreRowModel, ColumnDef } from "@tanstack/react-table";
import { FileInterface } from "@src/interfaces";
import { Table } from "../shared";

interface FileTableProps {
  data: FileInterface[];
  columns: ColumnDef<FileInterface, keyof FileInterface>[];
  actions?: (item: FileInterface) => ReactNode;
}

export function FileTable({ data, columns, actions }: FileTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md">
      <Table<FileInterface> table={table} actions={actions} />
    </div>
  );
}
