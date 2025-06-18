import { Input } from '@/skin/forms';

import { useThemeContext } from '../theme.context';

export const ThemeSwitch = () => {
  const { toggleTheme } = useThemeContext();

  return (
    <Input.Switch
      checkedIcon="CsLightMode"
      uncheckedIcon="CsDarkMode"
      onChange={toggleTheme}
    />
  );
};
