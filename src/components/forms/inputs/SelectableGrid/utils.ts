import type { SelectableGridLabels } from './types';

export const copy2DArray = (data: boolean[][]) => {
  return [...data.map(row => [...row])];
};

export const create2DArray = (row = 3, col = 3, value: unknown) => {
  return Array(row).fill(Array(col).fill(value));
};

export const initializeDefaultValue = (
  labels: SelectableGridLabels,
  data?: boolean[][],
) => {
  return data &&
    data.length === labels.rows.length &&
    data[0].length === labels.columns.length
    ? data
    : create2DArray(labels.rows.length, labels.columns.length, false);
};
