import type { StackProps } from '@/skin/layout';

import type { PlaceholderAlignment } from './types';

export const PLACEHOLDER_ALIGMENTS = ['center', 'start'] as const;

export const DEFAULT_ALIGNMENT: PlaceholderAlignment = 'center';

export const STACK_ALIGNMENTS: Record<
  PlaceholderAlignment,
  StackProps['alignItems']
> = {
  center: 'center',
  start: 'flex-start',
};
