import { useThemeContext } from '@/skin/navigation/Theme';
import type { ThemeColor, Type } from '@/types';
import { getColor } from '@/utils';

type UseTextColorOptions = {
  currentColor?: boolean;
  type?: Type;
};

type UseTextThemeColorOptions = {
  currentColor?: boolean;
  color?: ThemeColor | 'transparent';
};

type UseThemeColorOptions = {
  color: ThemeColor;
  withAlpha?: boolean;
};

export const useTypeColor = ({ type, currentColor }: UseTextColorOptions) => {
  const { theme } = useThemeContext();

  return getColor(type, {
    currentColor,
    ...(theme === 'dark' && { variant: 100 }),
  });
};

export const useThemeColor = ({
  color,
  currentColor,
}: UseTextThemeColorOptions) => {
  const { theme } = useThemeContext();

  return getColor(color, {
    currentColor,
    ...(theme === 'dark' && { variant: 50 }),
  });
};

export const useThemeContrastedColors = ({
  color,
  withAlpha = true,
}: UseThemeColorOptions) => {
  const { theme } = useThemeContext();

  return {
    backgroundColor: getColor(color, {
      ...(withAlpha && {
        alpha: theme === 'dark' ? 30 : 15,
      }),
    }),
    color: getColor(color, { variant: theme === 'dark' ? 50 : 200 }),
  };
};
