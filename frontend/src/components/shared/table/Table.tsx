import { ReactNode } from "react";
import { Table as TanstackTable } from "@tanstack/react-table";
import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";

interface TableProps<T> {
  table: TanstackTable<T>;
  actions?: (item: T) => ReactNode;
}

export function Table<T>(props: TableProps<T>) {
  const { table, actions } = props;

  return (
    <table className="min-w-full border-collapse">
      <TableHeader<T> table={table} actions={actions} />
      <TableBody<T> table={table} actions={actions} />
    </table>
  );
}
