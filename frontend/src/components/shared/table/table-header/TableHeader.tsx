import { ReactNode } from "react";
import { Table, flexRender } from "@tanstack/react-table";

interface TableHeaderProps<T> {
  table: Table<T>;
  actions?: (item: T) => ReactNode;
}

export function TableHeader<T>(props: TableHeaderProps<T>) {
  const { table, actions } = props;

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="border-b p-4 text-left">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
          {actions && <th className="border-b p-4">Actions</th>}
        </tr>
      ))}
    </thead>
  );
}
