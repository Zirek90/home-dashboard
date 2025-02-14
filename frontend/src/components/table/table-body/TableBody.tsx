import { ReactNode } from "react";
import { Avatar } from "@src/components/avatar";
import { FileIcon } from "@src/components/file-icon";
import { Tooltip } from "@src/components/tooltip";
import { FileInterface } from "@src/interfaces";
import { Column } from "@src/types";

interface TableBodyProps {
  data: FileInterface[];
  columns: Column<FileInterface>[];
  actions?: (item: FileInterface) => ReactNode;
  startRow: number;
  endRow: number;
}

interface FileNameColumnProps {
  item: FileInterface;
  col: Column<FileInterface>;
}

function FileNameColumn(props: FileNameColumnProps) {
  const { item, col } = props;

  return (
    <div className="flex items-center space-x-2">
      <FileIcon fileName={item[col.key] as string} />
      <span>{item[col.key] as string}</span>
    </div>
  );
}

export function TableBody(props: TableBodyProps) {
  const { data, columns, actions, startRow, endRow } = props;

  const handleColumn = (item: FileInterface, column: Column<FileInterface>) => {
    switch (column.key) {
      case "name":
        return <FileNameColumn item={item} col={column} />;
      case "uploadedBy":
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
