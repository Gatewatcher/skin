import type { Option } from '@/skin/forms/inputs/select/SelectBase/types';

import type { Period } from '../../types';

export const PERIOD_OPTIONS: Option<Period>[] = [
  { label: 'Minutes', value: 'minutes' },
  { label: 'Hours', value: 'hours' },
  { label: 'Days', value: 'days' },
];
