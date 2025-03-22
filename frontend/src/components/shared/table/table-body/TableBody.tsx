import { ReactNode } from "react";
import { Table, flexRender } from "@tanstack/react-table";

interface TableBodyProps<T> {
  table: Table<T>;
  actions?: (item: T) => ReactNode;
}

export function TableBody<T>(props: TableBodyProps<T>) {
  const { table, actions } = props;

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="border-b">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="p-4">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
          {actions && (
            <td className="p-4">
              <div className="flex flex-col items-center space-y-2">{actions(row.original)}</div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
