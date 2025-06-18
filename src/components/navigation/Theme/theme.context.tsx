import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light';

export type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  changeTheme: () => {},
  toggleTheme: () => {},
});

export const THEMES: Record<Theme, Theme> = {
  dark: 'dark',
  light: 'light',
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Missing theme context');
  }
  return context;
};
