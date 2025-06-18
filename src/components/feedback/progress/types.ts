import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { PROGRESS_STATUS } from './constants';

export type ProgressStatus = typeof PROGRESS_STATUS[number];

export type ProgressBaseProps = DataTestId & {
  isInfinite?: boolean;
  label?: string;
  labelElement?: ReactNode;
  labelError?: string;
  status?: ProgressStatus;
  percentage: number;
};
