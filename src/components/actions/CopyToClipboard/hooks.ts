import { easings, useTransition } from 'react-spring';

import { ICON_SIZES_REM } from '@/constants';
import type { IconSize } from '@/types';

export type TransitionConfig = {
  transitionSpeed: number;
  show: boolean;
  size: IconSize;
  property: 'flexBasis' | 'width';
};

export const useIconTransition = ({
  transitionSpeed,
  show,
  size,
  property,
}: TransitionConfig) => {
  return useTransition(show, {
    from: {
      opacity: 0,
      [property]: '0',
      marginLeft: '0',
    },
    enter: [
      {
        [property]: ICON_SIZES_REM[size],
        ...(property === 'width' && {
          marginLeft: 'var(--spacing-4)',
        }),
      },
      {
        opacity: 1,
      },
    ],
    leave: [
      {
        opacity: 0,
      },
      {
        [property]: '0',
        marginLeft: '0',
      },
    ],
    config: {
      duration: transitionSpeed / 2,
      easing: easings.easeInOutSine,
    },
  });
};
