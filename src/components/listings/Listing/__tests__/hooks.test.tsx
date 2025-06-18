import { range } from '@gatewatcher/bistoury/utils-lang';
import { renderHook } from '@testing-library/react';

import { useSort } from '../hooks';

describe('useSort', () => {
  const objects = range({ stop: 100 })
    .sort(() => 0.5 - Math.random())
    .map(item => ({
      number: item,
      string: item.toString(),
    }));

  describe('ASC', () => {
    it('should sort object.numbers', () => {
      const { result } = renderHook(() =>
        useSort(objects, { id: 'number', order: 'asc' }),
      );

      expect(result.current[0]).toStrictEqual({ number: 0, string: '0' });
      expect(result.current[1]).toStrictEqual({ number: 1, string: '1' });
      expect(result.current[2]).toStrictEqual({ number: 2, string: '2' });
      expect(result.current.at(-1)).toStrictEqual({ number: 99, string: '99' });
    });

    it('should sort object.strings', () => {
      const { result } = renderHook(() =>
        useSort(objects, { id: 'string', order: 'asc' }),
      );

      expect(result.current[0]).toStrictEqual({ number: 0, string: '0' });
      expect(result.current[1]).toStrictEqual({ number: 1, string: '1' });
      expect(result.current[2]).toStrictEqual({ number: 10, string: '10' });
      expect(result.current[3]).toStrictEqual({ number: 11, string: '11' });
      expect(result.current.at(-1)).toStrictEqual({ number: 99, string: '99' });
    });
  });

  describe('DESC', () => {
    it('should sort object.numbers', () => {
      const { result } = renderHook(() =>
        useSort(objects, { id: 'number', order: 'desc' }),
      );

      expect(result.current[0]).toStrictEqual({ number: 99, string: '99' });
      expect(result.current[1]).toStrictEqual({ number: 98, string: '98' });
      expect(result.current.at(-1)).toStrictEqual({ number: 0, string: '0' });
    });

    it('should sort object.strings', () => {
      const { result } = renderHook(() =>
        useSort(objects, { id: 'string', order: 'desc' }),
      );

      expect(result.current[0]).toStrictEqual({ number: 99, string: '99' });
      expect(result.current[1]).toStrictEqual({ number: 98, string: '98' });
      expect(result.current.at(-1)).toStrictEqual({ number: 0, string: '0' });
    });
  });
});
