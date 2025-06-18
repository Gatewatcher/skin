import type { DPDatesMode, DPUserConfig } from '@rehookify/datepicker';
import type { UnitType } from 'dayjs';

export const CONFIGS_BY_MODE: Record<DPDatesMode, Partial<DPUserConfig>> = {
  range: {
    calendar: { mode: 'fluid', startDay: 1, offsets: [-1] },
    years: { mode: 'exact' },
    dates: { mode: 'range', selectSameDate: true },
  },
  multiple: {
    calendar: { mode: 'fluid', startDay: 1, offsets: [-1] },
    years: { mode: 'exact' },
    dates: { mode: 'multiple', toggle: true },
  },
  single: {
    calendar: { mode: 'fluid', startDay: 1 },
    years: { mode: 'exact' },
    dates: { mode: 'single', toggle: true },
  },
};

export const FORMATS_BY_UNIT: Partial<Record<UnitType, string>> = {
  h: 'HH',
  m: 'mm',
  s: 'ss',
};

export const ON_CLOSE_CONTEXT_DEFAULT_VALUE: { current: 'change' | 'apply' } = {
  current: 'change',
};
