import { range } from '@gatewatcher/bistoury/utils-lang';
import { renderHook } from '@testing-library/react';

import { DEFAULT_INITIAL_PER_PAGE } from '../constants';
import { usePagination } from '../hooks';

describe('usePagination', () => {
  const data = range({ stop: 100 });

  describe('pagination', () => {
    it('should slice data', () => {
      const { result } = renderHook(() => usePagination(data));
      expect(result.current).toHaveLength(DEFAULT_INITIAL_PER_PAGE);
    });

    it('should slice data with 10 perPage', () => {
      const { result } = renderHook(() => usePagination(data, { perPage: 10 }));
      expect(result.current).toHaveLength(10);
    });

    it('should slice data for page 2', () => {
      const { result } = renderHook(() => usePagination(data, { page: 2 }));
      expect(result.current).toHaveLength(DEFAULT_INITIAL_PER_PAGE);
      expect(result.current[0]).toBe(DEFAULT_INITIAL_PER_PAGE);
    });

    it('should slice data for page 20 returns empty array', () => {
      const { result } = renderHook(() => usePagination(data, { page: 20 }));
      expect(result.current).toHaveLength(0);
    });
  });

  describe('infiniteScroll', () => {
    it('should slice data', () => {
      const { result } = renderHook(() =>
        usePagination(data, { type: 'infiniteScroll' }),
      );
      expect(result.current).toHaveLength(DEFAULT_INITIAL_PER_PAGE);
    });

    it('should slice data with 10 perPage', () => {
      const { result } = renderHook(() =>
        usePagination(data, { perPage: 10, type: 'infiniteScroll' }),
      );
      expect(result.current).toHaveLength(10);
    });

    it('should slice data for page 2', () => {
      const { result } = renderHook(() =>
        usePagination(data, { page: 2, type: 'infiniteScroll' }),
      );
      expect(result.current).toHaveLength(DEFAULT_INITIAL_PER_PAGE * 2);
      expect(result.current[0]).toBe(0);
      expect(result.current.at(-1)).toBe(DEFAULT_INITIAL_PER_PAGE * 2 - 1);
    });

    it('should slice data for page 20 returns empty array', () => {
      const { result } = renderHook(() =>
        usePagination(data, { page: 20, type: 'infiniteScroll' }),
      );
      expect(result.current).toHaveLength(100);
    });
  });
});
