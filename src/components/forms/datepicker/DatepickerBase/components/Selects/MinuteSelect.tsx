import { range } from '@gatewatcher/bistoury/utils-lang';

import type { SelectOption } from '@/skin/forms';

import type { SelectTimeProps } from './SelectTime';
import SelectTime from './SelectTime';

const MINUTES: SelectOption<number>[] = range({ stop: 60 }).map(item => ({
  label: item.toString().padStart(2, '0'),
  value: item,
}));

const MinuteSelect = (props: SelectTimeProps) => {
  return <SelectTime {...props} options={MINUTES} placeholder="m" unit="m" />;
};

export default MinuteSelect;
