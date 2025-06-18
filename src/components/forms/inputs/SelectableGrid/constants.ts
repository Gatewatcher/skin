import type {
  SelectableGridMode,
  SelectableGridModes,
} from '@/skin/forms/inputs/SelectableGrid/types';

export const DEFAULT_TEST_ID = 'selectable-grid';

export const SELECTABLE_GRID_MODES = ['timetable'] as const;

export const FALLBACK_MODE_CONFIG: SelectableGridMode = {
  labels: {
    columns: ['A', 'B', 'C'],
    rows: ['1', '2', '3'],
  },
  label: 'Selectable Grid',
};

export const TIMETABLE_MODE_CONFIG: SelectableGridMode = {
  labels: {
    columns: [
      '00h',
      '01h',
      '02h',
      '03h',
      '04h',
      '05h',
      '06h',
      '07h',
      '08h',
      '09h',
      '10h',
      '11h',
      '12h',
      '13h',
      '14h',
      '15h',
      '16h',
      '17h',
      '18h',
      '19h',
      '20h',
      '21h',
      '22h',
      '23h',
    ],
    rows: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },
  label: 'Timetable',
};

export const SELECTABLE_GRID_MODES_CONFIG: Record<
  SelectableGridModes,
  SelectableGridMode
> = {
  timetable: TIMETABLE_MODE_CONFIG,
};
