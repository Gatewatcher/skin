import { getColumnsResizingDataFromLocalStorage } from './localStorage';
import type { ColumnResizingData, TableColumn } from './types';

export const migrateColumnsWidthsArrayToRecord = <T>(
  columnsWidths: { width: number }[],
  columns?: TableColumn<T>[],
): ColumnResizingData | undefined => {
  if (!columns) return;

  const columnResizingData: ColumnResizingData = {};
  columns.forEach((column, index) => {
    const width = columnsWidths[index].width;
    if (width) {
      columnResizingData[column.key] = {
        width,
      };
    }
  });

  return columnResizingData;
};

export const getPersistedResizingDataAfterMigrating = <T>(
  persistenceKey?: string,
  columns?: TableColumn<T>[],
) => {
  const columnsWidths = getColumnsResizingDataFromLocalStorage(persistenceKey);
  if (Array.isArray(columnsWidths)) {
    return migrateColumnsWidthsArrayToRecord(columnsWidths, columns);
  } else {
    return columnsWidths;
  }
};
