import type { TableColumn } from './types';

type GetOffsetForPinnedColumnParams<T> = {
  pinnedColumns: string[];
  columnKey: string;
  columns: TableColumn<T>[] | undefined;
  tableColumns: NodeListOf<HTMLTableCellElement>;
};

export const getOffsetForPinnedColumn = <T>({
  pinnedColumns,
  columnKey,
  columns,
  tableColumns,
}: GetOffsetForPinnedColumnParams<T>) => {
  const offset = pinnedColumns
    .slice(0, pinnedColumns.indexOf(columnKey))
    .reduce((sum, key) => {
      if (columns) {
        const column = columns.find(col => col.key === key);
        if (column) {
          const index = columns.indexOf(column);
          return sum + tableColumns[index].offsetWidth;
        }
      }

      return sum;
    }, 0);

  return offset;
};
