export type StorageRow<T extends string> = {
  label: string;
  size: number;
  details?: { key: T; size: number }[];
};
