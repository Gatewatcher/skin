import { easings, useTransition } from 'react-spring';

import { ICON_SIZES_REM } from '@/constants';
import type { IconName } from '@/skin/displays';
import type { IconSize } from '@/types';

export type TransitionConfig = {
  isSuccess: boolean;
  size: IconSize;
  endIcon?: IconName;
};

export const useIconTransition = ({
  isSuccess,
  size,
  endIcon,
}: TransitionConfig) => {
  return useTransition(isSuccess, {
    ...(!endIcon && {
      from: { width: '0', marginLeft: '0', opacity: 0 },
      enter: {
        width: ICON_SIZES_REM[size],
        marginLeft: 'var(--spacing-4)',
        opacity: 1,
      },
      leave: { width: '0', marginLeft: '0', opacity: 0 },
    }),
    config: {
      duration: 300,
      easing: easings.easeInOutSine,
    },
  });
};
