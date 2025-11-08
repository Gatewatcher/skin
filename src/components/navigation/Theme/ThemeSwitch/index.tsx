import { Input } from '@/skin/forms';

import { useThemeContext } from '../theme.context';

export const ThemeSwitch = () => {
  const { toggleTheme, theme } = useThemeContext();

  return (
    <Input.Switch
      checked={theme === 'light'}
      checkedIcon="CsLightMode"
      onChange={toggleTheme}
      uncheckedIcon="CsDarkMode"
    />
  );
};
