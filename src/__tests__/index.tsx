import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { MemoryRouterProps } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

import { type Theme, ThemeContext } from '@/skin/navigation/Theme';

export const renderWithRouter = (
  element: ReactElement,
  routerOptions: MemoryRouterProps = {},
) =>
  render(element, {
    wrapper: ({ children }) => (
      <MemoryRouter {...routerOptions}>{children}</MemoryRouter>
    ),
  });

export const renderWithThemeProvider = (
  element: ReactElement,
  theme: Theme = 'light',
) => {
  const contextValue = {
    theme,
    changeTheme: vi.fn(),
    toggleTheme: vi.fn(),
  };

  return render(
    <ThemeContext.Provider value={contextValue}>
      {element}
    </ThemeContext.Provider>,
  );
};

export const mockURLmethods = () => {
  window.URL.createObjectURL = vi.fn();
  window.URL.revokeObjectURL = vi.fn();
};
