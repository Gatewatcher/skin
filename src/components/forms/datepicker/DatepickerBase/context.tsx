import type { DPData, DPDatesMode, DPPropGetters } from '@rehookify/datepicker';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import { ON_CLOSE_CONTEXT_DEFAULT_VALUE } from './constants';

export type PresetsContextType = Record<string, boolean>;

export type DatepickerContextType = {
  data: DPData;
  mode: DPDatesMode;
  offset: Date;
  propGetters: DPPropGetters;
  selectedDates: Date[];
  setOffset: Dispatch<SetStateAction<Date>>;
  setSelectedDates: Dispatch<SetStateAction<Date[]>>;
  closeOn: { current: 'change' | 'apply' };
};

export const DatepickerContext = createContext<DatepickerContextType>({
  data: {} as DPData,
  mode: 'range',
  offset: new Date(),
  propGetters: {} as DPPropGetters,
  selectedDates: [],
  setOffset: () => {},
  setSelectedDates: () => {},
  closeOn: ON_CLOSE_CONTEXT_DEFAULT_VALUE,
});

export const useDatepickerContext = () => useContext(DatepickerContext);
