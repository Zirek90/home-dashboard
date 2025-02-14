import { ReactNode } from "react";
import { Avatar } from "@src/components/shared/avatar";
import { Tooltip } from "@src/components/shared/tooltip";
import { CategoryEnum } from "@src/enums";
import { ProductInterface } from "@src/interfaces";
import { Column } from "@src/types";
import { formatDate, getIconForCategory } from "@src/utils";

interface TableBodyProps {
  data: ProductInterface[];
  columns: Column<ProductInterface>[];
  actions?: (item: ProductInterface) => ReactNode;
  startRow: number;
  endRow: number;
}

interface CategoryColumnProps {
  item: ProductInterface;
  col: Column<ProductInterface>;
}

function CategoryColumn(props: CategoryColumnProps) {
  const { item, col } = props;

  return (
    <div className="flex items-center space-x-2">
      {getIconForCategory(item[col.key] as CategoryEnum)}
      <span>{item[col.key] as string}</span>
    </div>
  );
}

export function TableBody(props: TableBodyProps) {
  const { data, columns, actions, startRow, endRow } = props;

  const handleColumn = (item: ProductInterface, column: Column<ProductInterface>) => {
    switch (column.key) {
      case "category":
        return <CategoryColumn item={item} col={column} />;
      case "createdAt":
        return formatDate(item[column.key]);
      case "createdBy":
        return (
          <Tooltip message={item[column.key].username}>
            <Avatar username={item[column.key].username} avatar={item[column.key].avatar} />
          </Tooltip>
        );
      default:
        return item[column.key];
    }
  };

  return (
    <tbody>
      {data.slice(startRow - 1, endRow).map((item, index) => (
        <tr key={index} className="border-b">
          {columns.map((column) => (
            <td key={column.key} className="p-4 text-gray-900 dark:text-gray-100">
              {handleColumn(item, column)}
            </td>
          ))}
          {actions && (
            <td className="p-4">
              <div className="flex flex-col items-center space-y-2">{actions(item)}</div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
