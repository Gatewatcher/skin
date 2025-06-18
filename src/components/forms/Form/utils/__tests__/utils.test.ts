import NameMap from '../NameMap';
import cloneDeep from '../cloneDeep';
import { stringifyOrRandomize } from '../stringifyOrRandomize';
import { isSimilar, move, setValues, trimValue } from '../valueUtil';

describe('utils', () => {
  describe('arrayMove', () => {
    it('move', () => {
      expect(move([0, 1, 2, 3], 0, 2)).toEqual([1, 2, 0, 3]);
      expect(move([0, 1, 2, 3], 3, 1)).toEqual([0, 3, 1, 2]);
      expect(move([0, 1, 2, 3], 1, 1)).toEqual([0, 1, 2, 3]);
      expect(move([0, 1, 2, 3], -1, 3)).toEqual([0, 1, 2, 3]);
      expect(move([0, 1, 2, 3], -1, 5)).toEqual([0, 1, 2, 3]);
      expect(move([0, 1, 2, 3], 1, 5)).toEqual([0, 1, 2, 3]);
      expect(move([0, 1, 2, 3], 0, 0)).toEqual([0, 1, 2, 3]);
      expect(move([0, 1, 2, 3], 0, 1)).toEqual([1, 0, 2, 3]);
      expect(move([0, 1, 2, 3], 1, 0)).toEqual([1, 0, 2, 3]);
      expect(move([0, 1, 2, 3], 2, 3)).toEqual([0, 1, 3, 2]);
      expect(move([0, 1, 2, 3], 3, 3)).toEqual([0, 1, 2, 3]);
      expect(move([0, 1, 2, 3], 3, 2)).toEqual([0, 1, 3, 2]);
    });
  });

  describe('valueUtil', () => {
    it('isSimilar', () => {
      expect(isSimilar(1, 1)).toBeTruthy();
      expect(isSimilar(1, 2)).toBeFalsy();
      expect(isSimilar({}, {})).toBeTruthy();
      expect(isSimilar({ a: 1 }, { a: 2 })).toBeFalsy();
      expect(isSimilar({ a() {} }, { a() {} })).toBeTruthy();
      expect(isSimilar({ a: 1 }, {})).toBeFalsy();
      expect(isSimilar({}, { a: 1 })).toBeFalsy();
      expect(isSimilar({}, null)).toBeFalsy();
      expect(isSimilar(null, {})).toBeFalsy();
    });

    describe('setValues', () => {
      it('basic', () => {
        expect(setValues({}, { a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
        expect(setValues([], [123])).toEqual([123]);
      });

      it('Correct handle class instance', () => {
        const out = setValues({}, { a: 1, b: { c: new Date() } });
        expect(out.a).toEqual(1);
        expect(out.b?.c instanceof Date).toBeTruthy();
      });
    });

    describe('trimValue', () => {
      it('should return the original string', () => {
        expect(trimValue('foo')).toBe('foo');
      });

      it('should trim the original string', () => {
        expect(trimValue('  foo  ')).toBe('foo');
      });

      it('should return the original null value', () => {
        expect(trimValue(null)).toBe(null);
      });

      it('should return the original number value', () => {
        expect(trimValue(42)).toBe(42);
      });

      it('should return the original undefined value', () => {
        expect(trimValue(undefined)).toBe(undefined);
      });

      it('should return a copy of an object with trimmed properties', () => {
        expect(trimValue({ foo: '  foo  ' })).toEqual({ foo: 'foo' });
      });

      it('should return a copy of an array with trimmed entries', () => {
        expect(trimValue(['  foo  '])).toEqual(['foo']);
      });

      it('should trim values in a complex object', () => {
        expect(
          trimValue({
            string: '  value  ',
            number: 0,
            boolean: true,
            array: ['  value  '],
            null: null,
            undefined: undefined,
            object: {
              string: '  value  ',
              number: 0,
              array: [
                '  value  ',
                {
                  string: '  value  ',
                },
              ],
              null: null,
              undefined: undefined,
            },
          }),
        ).toEqual({
          string: 'value',
          number: 0,
          boolean: true,
          array: ['value'],
          null: null,
          undefined: undefined,
          object: {
            string: 'value',
            number: 0,
            array: [
              'value',
              {
                string: 'value',
              },
            ],
            null: null,
            undefined: undefined,
          },
        });
      });
    });
  });

  describe('NameMap', () => {
    it('update should clean if empty', () => {
      const map = new NameMap();
      map.set(['user', 'name'], 'Bamboo');
      map.set(['user', 'age'], 14);

      expect(map.toJSON()).toEqual({
        'user.name': 'Bamboo',
        'user.age': 14,
      });

      map.update(['user', 'age'], prevValue => {
        expect(prevValue).toEqual(14);
        return null;
      });

      expect(map.toJSON()).toEqual({
        'user.name': 'Bamboo',
      });

      map.set(['user', 'name'], 'Light');
      expect(map.toJSON()).toEqual({
        'user.name': 'Light',
      });
    });
  });

  describe('clone deep', () => {
    it('should not deep clone Class', () => {
      const data = { a: new Date() };
      const clonedData = cloneDeep(data);
      expect(data.a === clonedData.a).toBeTruthy();
    });
  });

  describe('stringify unknown', () => {
    it('should stringify data', () => {
      const data = { a: 'test' };
      const stringifiedData = stringifyOrRandomize(data);
      expect(typeof stringifiedData).toBe('string');
    });

    it('should return number on error', () => {
      const data = BigInt(9007199254740991);
      const stringifiedData = stringifyOrRandomize(data);
      expect(typeof stringifiedData).toBe('number');
    });
  });
});
