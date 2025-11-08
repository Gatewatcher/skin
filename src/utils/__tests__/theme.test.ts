import { isSkinColor, isThemeColor } from '../theme';

describe('Theme utils', () => {
  it.each(['red', 'grey', 'purple', 'orange'])(
    '%s should be a theme color',
    color => {
      expect(isThemeColor(color)).toBe(true);
    },
  );

  it.each(['RED', 'neutral', 'notacolor', 'medium', 'info'])(
    '%s should not be a theme color',
    color => {
      expect(isThemeColor(color)).toBe(false);
    },
  );

  it.each(['red', 'neutral', 'grey', 'orange', 'medium', 'info'])(
    '%s should be a skin color',
    color => {
      expect(isSkinColor(color)).toBe(true);
    },
  );

  it.each(['RED', 'not a color'])('%s should not be a skin color', color => {
    expect(isSkinColor(color)).toBe(false);
  });
});
