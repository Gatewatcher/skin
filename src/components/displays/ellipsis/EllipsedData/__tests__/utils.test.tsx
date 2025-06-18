import { sliceData } from '../../EllipsisDataBase/utils';

describe('utils', () => {
  const array = [1, 2, 3, 4, 5];

  it('should slice data', () => {
    expect(sliceData(array, { limit: 3 })).toStrictEqual({
      hasRest: true,
      rest: [4, 5],
      restCount: 2,
      results: [1, 2, 3],
    });
  });

  it('should not have rest', () => {
    expect(sliceData(array, { limit: 10 })).toStrictEqual({
      hasRest: false,
      rest: [],
      restCount: 0,
      results: [1, 2, 3, 4, 5],
    });

    expect(sliceData(array, { limit: 5 })).toStrictEqual({
      hasRest: false,
      rest: [],
      restCount: 0,
      results: [1, 2, 3, 4, 5],
    });

    expect(sliceData(array, { limit: -5 })).toStrictEqual({
      hasRest: false,
      rest: [],
      restCount: 0,
      results: [1, 2, 3, 4, 5],
    });
  });
});
