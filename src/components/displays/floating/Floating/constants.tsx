import type { Placement, Strategy } from '@floating-ui/react';

import { getThemeSpacing } from '@/utils';

import type { FloatingProps } from '.';
import type { FloatingDuration, FloatingSize } from './types';

export const DEFAULT_TRIGGER_ON = ['hover', 'click', 'focus'] as const;
export const DURATIONS = ['none', 'fast', 'medium', 'slow'] as const;
export const DEFAULT_SHIFT_PADDING = +getThemeSpacing(4, 'px');
export const DEFAULT_OFFSET = 0;
export const DEFAULT_STRATEGY: Strategy = 'absolute';
export const DEFAULT_PLACEMENT: Placement = 'top';
export const DEFAULT_DELAY = 150;
export const DEFAULT_WITH_FLOATING_TREE = true;
export const DEFAULT_WITH_ARROW = true;
export const DEFAULT_DURATION: FloatingDuration = 'fast';
export const DEFAULT_SIZE: FloatingSize = 'medium';
export const DEFAULT_WITH_STOP_PROPAGATION = true;
export const DEFAULT_WITH_MIN_WIDTH_TRIGGER = true;
export const DEFAULT_MAX_HEIGHT = 300;
export const DEFAULT_WITH_SMOOTH_ANIMATION = true;

export const DEFAULT_VALUES: Partial<Record<keyof FloatingProps, unknown>> = {
  delay: DEFAULT_DELAY,
  duration: DEFAULT_DURATION,
  offset: DEFAULT_OFFSET,
  placement: DEFAULT_PLACEMENT,
  safePolygon: true,
  shiftPadding: DEFAULT_SHIFT_PADDING,
  strategy: DEFAULT_STRATEGY,
  triggerOn: DEFAULT_TRIGGER_ON,
};

export const DURATIONS_MS: Record<FloatingDuration, number> = {
  none: 0,
  slow: 500,
  medium: 300,
  fast: 200,
};

export const ARROW_SIZE = 12;

export const SIZES = ['small', 'medium', 'large'] as const;
export const PLACEMENTS: Placement[] = [
  'bottom',
  'bottom-end',
  'bottom-start',
  'top',
  'top-end',
  'top-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
];
