import type { FloatingContext } from '@floating-ui/react';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode, Ref } from 'react';

import type { DEFAULT_TRIGGER_ON, DURATIONS, SIZES } from './constants';
import type { FloatingContextType } from './context';

export type FloatingSize = typeof SIZES[number];
export type FloatingDuration = typeof DURATIONS[number];
export type FloatingContentFunction = (ctx: FloatingContextType) => ReactNode;
export type FloatingContent = ReactNode | FloatingContentFunction;
export type FloatingRole = 'tooltip' | 'dialog';
export type FloatingType = 'tooltip' | 'popover' | 'modal';
export type FloatingTriggerOn = typeof DEFAULT_TRIGGER_ON[number];
export type FloatingWrapperType = {
  ctx: FloatingContext;
  duration: number;
  children: ReactNode;
  'data-testid': TestId;
  opened: boolean;
  ref?: Ref<HTMLElement>;
};
