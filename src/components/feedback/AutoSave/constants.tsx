import type { ReactElement } from 'react';

import { Icon } from '@/skin/displays';
import { CircularLoader } from '@/skin/feedback';

import type { Labels, StatusWithIcon } from './types';

export const TEST_ID = 'auto-save';
export const STATUSES_WITH_ICON = ['success', 'loading', 'error'] as const;
export const STATUSES = ['idle', ...STATUSES_WITH_ICON] as const;

export const ICONS: Record<StatusWithIcon, () => ReactElement> = {
  error: () => <Icon color="danger" name="Warning" />,
  loading: () => <CircularLoader />,
  success: () => <Icon color="info" name="Check" />,
};

export const DEFAULT_LABELS: Labels = {
  error: 'An error occurred',
  idle: 'Your changes will be saved automatically',
  loading: 'Saving changes',
  success: 'Saved',
};
