import { renderHook } from '@testing-library/react';

import type { UseProgressParams } from '../hook';
import { useProgress } from '../hook';
import type { ProgressStatus } from '../types';

describe('useProgress', () => {
  const render = (args: Partial<UseProgressParams> = {}) =>
    renderHook(() => useProgress({ percentage: 50, ...args }));

  it('should not return status', () => {
    const { result } = render();
    expect(result.current.status).toBeUndefined();
  });

  it('should not return isInfinite', () => {
    const { result } = render();
    expect(result.current.isInfinite).toBeUndefined();
  });

  it('should return success status when 100 percent', () => {
    const { result } = render({ percentage: 100 });
    expect(result.current.status).toBe('success');
  });

  it('should change status', () => {
    const { result, rerender } = renderHook(
      (status: ProgressStatus) =>
        useProgress({ percentage: 50, isInfinite: true, status }),
      { initialProps: 'uploading' },
    );

    rerender('error');
    expect(result.current.status).toBe('error');
  });

  it('should stop isInfinite', () => {
    const { result, rerender } = renderHook(
      (status: ProgressStatus) =>
        useProgress({ percentage: 50, isInfinite: true, status }),
      { initialProps: 'uploading' },
    );

    rerender('error');
    expect(result.current.isInfinite).toBeFalsy();
  });
});
