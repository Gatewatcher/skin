import { range } from '@gatewatcher/bistoury/utils-lang';

import type { SelectOption } from '@/skin/forms';

import type { SelectTimeProps } from './SelectTime';
import SelectTime from './SelectTime';

const HOURS: SelectOption<number>[] = range({ stop: 24 }).map(item => ({
  label: item.toString().padStart(2, '0'),
  value: item,
}));

const HourSelect = (props: SelectTimeProps) => {
  return <SelectTime {...props} options={HOURS} placeholder="H" unit="h" />;
};

export default HourSelect;
