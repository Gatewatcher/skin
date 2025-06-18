import { useMatchMedia } from '@gatewatcher/bistoury/hooks';
import { get, set } from '@gatewatcher/bistoury/utils-web-storage';
import { ReactNode, useEffect, useState } from 'react';

import { THEME_STORAGE_CURRENT_KEY } from './theme.config';
import { THEMES, Theme, ThemeContext, ThemeContextType } from './theme.context';

export const setThemeAttribute = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
};

export type ThemeProviderProps = {
  children: ReactNode;
  onThemeChange?: (theme: Theme) => void;
  withResetTransitions?: boolean;
};

export const ThemeProvider = ({
  children,
  onThemeChange,
  withResetTransitions = true,
}: ThemeProviderProps) => {
  const mediaQuery = '(prefers-color-scheme: dark)';
  const handleMatches = (e: MediaQueryListEvent) => {
    changeTheme(e.matches ? THEMES.dark : THEMES.light);
  };
  useMatchMedia(mediaQuery, handleMatches);

  const validTheme = (value?: string | null): Theme | null => {
    if (value === THEMES.light || value === THEMES.dark) {
      return value;
    }
    return null;
  };

  const currentTheme =
    validTheme(get(THEME_STORAGE_CURRENT_KEY)) ||
    validTheme(document.documentElement.getAttribute('data-theme')) ||
    THEMES.light;
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const inverseTheme: Record<Theme, Theme> = {
    light: 'dark',
    dark: 'light',
  };

  const resetTransitions = () => {
    document.body.classList.add('no-transitions');
    setTimeout(() => {
      document.body.classList.remove('no-transitions');
    }, 300);
  };

  useEffect(() => {
    onThemeChange?.(theme);
    setThemeAttribute(theme);
    withResetTransitions && resetTransitions();
    set(THEME_STORAGE_CURRENT_KEY, theme);
  }, [theme, onThemeChange, withResetTransitions]);

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
  };

  const toggleTheme = () => {
    changeTheme(inverseTheme[theme]);
  };

  const value: ThemeContextType = { theme, changeTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
