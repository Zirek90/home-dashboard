import { ProductInterface } from "@src/interfaces";
import { Column } from "@src/types";

interface TableHeaderProps {
  columns: Column<ProductInterface>[];
  hasActions: boolean;
}

export function TableHeader(props: TableHeaderProps) {
  const { columns, hasActions } = props;

  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key} className="border-b p-4 text-left text-gray-700 dark:text-gray-300">
            {col.header}
          </th>
        ))}
        {hasActions && <th className="border-b p-4" />}
      </tr>
    </thead>
  );
}
