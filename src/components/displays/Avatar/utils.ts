import { THEME_COLORS } from '@/constants';
import { getColor } from '@/utils';

export const getAvatarColor = (username: string) => {
  const name = username.trim().toLowerCase();
  const firstChar = name.charCodeAt(0);
  const lastChar = name.charCodeAt(name.length - 1);

  const index = (firstChar + lastChar) % THEME_COLORS.length;
  const colorName = THEME_COLORS[index];

  return getColor(colorName);
};
