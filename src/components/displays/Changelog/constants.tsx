import type { TestId } from '@gatewatcher/bistoury/utils-types';

import type { ChangelogProps } from '.';
import {
  DATE_MODES as DATE_TIME_DATE_MODES,
  DEFAULT_DATE_MODE as DATE_TIME_DEFAULT_DATE_MODE,
} from '../date/DateTime/constants';

export const DEFAULT_CHANGELOG: ChangelogProps['changelog'] = [
  {
    version: '1.1.2',
    date: '01/01/2023',
    data: '## Test',
  },
  {
    version: '1.1.1',
    date: '01/03/2022',
    data: '## Test2',
  },
];

export const TEST_ID: TestId = 'changelog';
export const DATE_MODES = DATE_TIME_DATE_MODES;
export const DEFAULT_DATE_MODE = DATE_TIME_DEFAULT_DATE_MODE;
