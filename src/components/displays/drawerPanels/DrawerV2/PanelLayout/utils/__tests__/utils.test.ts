import { parsePercentageString } from '..';

describe('parsePercentageString', () => {
  it('should work', () => {
    expect(parsePercentageString('50%')).toBe(50);
  });

  it('should throw', () => {
    expect(() => parsePercentageString('50?')).toThrow(
      new Error("50? doesn't match ^(\\d+)%$"),
    );
  });
});
