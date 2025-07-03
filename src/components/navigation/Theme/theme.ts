import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import { get, isSupported } from '@gatewatcher/bistoury/utils-web-storage';

import { THEME_STORAGE_CURRENT_KEY } from './theme.config';
import { THEMES } from './theme.context';
import { setThemeAttribute } from './theme.provider';

export const initTheme = () => {
  if (!isSupported()) {
    return;
  }

  try {
    const mediaQueryString = '(prefers-color-scheme: dark)';
    const mediaQueryList = isDefined(window?.matchMedia)
      ? matchMedia(mediaQueryString).matches
      : '';
    const preferedColor = mediaQueryList ? THEMES.dark : THEMES.light;
    const storedTheme = get(THEME_STORAGE_CURRENT_KEY);
    const appTheme = storedTheme ? storedTheme : preferedColor;
    setThemeAttribute(appTheme);
  } catch (e) {
    console.log(e);
  }
};

initTheme();
