import type { SELECTABLE_GRID_MODES } from './constants';

export type SelectableGridModes = typeof SELECTABLE_GRID_MODES[number];

export type SelectableGridMode = {
  labels: SelectableGridLabels;
  label: string;
};

export type SelectableGridLabels = {
  rows: string[];
  columns: string[];
};
