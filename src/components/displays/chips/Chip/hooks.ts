import { useThemeContext } from '@/skin/navigation/Theme';
import { getColor } from '@/utils';

import { CHIP_THEME_COLORS } from './constants';
import type { ChipType } from './types';

type UseChipStyleParams = {
  type: ChipType;
};

export const useChipStyle = ({ type }: UseChipStyleParams) => {
  const { theme } = useThemeContext();

  if (([...CHIP_THEME_COLORS] as string[]).includes(type)) {
    return {
      backgroundColor: getColor(type, {
        alpha: theme === 'dark' ? 30 : 15,
      }),
      color: getColor(type, { variant: theme === 'dark' ? 50 : 200 }),
    };
  }

  return {
    backgroundColor: getColor(type, {
      alpha: theme === 'dark' ? 25 : 15,
    }),
    color: getColor(type, { variant: theme === 'dark' ? 200 : 700 }),
  };
};
