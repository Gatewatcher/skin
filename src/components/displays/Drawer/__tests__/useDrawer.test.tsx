import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import { drawerPersistence } from '../..';
import { useDrawer } from '../hooks/useDrawer';

describe('useDrawer', () => {
  it('should have data', () => {
    const { result } = renderHook(
      () =>
        useDrawer<{ key: string }>('test', {
          keepOn: drawerPersistence.keepEverywhere,
        }),
      { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> },
    );
    act(() => {
      result.current.open({ key: 'value' });
    });
    expect(result.current.data).toEqual({ key: 'value' });
  });

  it('should have isOpened', () => {
    const { result: testDrawer } = renderHook(
      () =>
        useDrawer<{ key: string }>('test', {
          keepOn: drawerPersistence.keepEverywhere,
        }),
      { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> },
    );

    const { result: demoDrawer } = renderHook(
      () =>
        useDrawer<{ key: string }>('demo', {
          keepOn: drawerPersistence.keepEverywhere,
        }),
      { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> },
    );

    act(() => {
      testDrawer.current.open({ key: 'test' });
    });

    waitFor(() => {
      expect(testDrawer.current.isOpened).toBe(true);
      expect(demoDrawer.current.isOpened).toBe(false);
    });
  });
});
