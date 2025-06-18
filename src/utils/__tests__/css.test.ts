import { expect } from 'vitest';

import { buildCssBreakpointVariables, validateBreakpointProp } from '../css';

describe('buildCssBreakpointVariables', () => {
  it('should output variables with a single number', async () => {
    const expected = {
      '--gap-xs': '1',
    };

    const result = buildCssBreakpointVariables('gap', 1);

    expect(result).toEqual(expected);
  });

  it('should output variables with a single string', async () => {
    const expected = {
      '--gap-xs': '42',
    };

    const result = buildCssBreakpointVariables('gap', '42');

    expect(result).toEqual(expected);
  });

  it('should output variables with number values', async () => {
    const breakpoints = {
      xs: 1,
      sm: 2,
      md: 3,
    };
    const expected = {
      '--gap-xs': '1',
      '--gap-sm': '2',
      '--gap-md': '3',
    };

    const result = buildCssBreakpointVariables('gap', breakpoints);

    expect(result).toEqual(expected);
  });

  it('should output variables with string values (rem)', async () => {
    const breakpoints = {
      xs: '1rem',
      sm: '2rem',
      md: '3rem',
    };
    const expected = {
      '--gap-xs': '1rem',
      '--gap-sm': '2rem',
      '--gap-md': '3rem',
    };

    const result = buildCssBreakpointVariables('gap', breakpoints);

    expect(result).toEqual(expected);
  });

  it('should output variables with number values transformed', async () => {
    const breakpoints = {
      xs: 1,
      sm: 2,
      md: 3,
    };
    const expected = {
      '--gap-xs': '1px',
      '--gap-sm': '2px',
      '--gap-md': '3px',
    };

    const result = buildCssBreakpointVariables(
      'gap',
      breakpoints,
      value => `${value}px`,
    );

    expect(result).toEqual(expected);
  });

  it('should output variables with string values transformed', async () => {
    const breakpoints = {
      xs: '1',
      sm: '2',
      md: '3',
    };
    const expected = {
      '--gap-xs': 'var(--spacing-1)',
      '--gap-sm': 'var(--spacing-2)',
      '--gap-md': 'var(--spacing-3)',
    };

    const result = buildCssBreakpointVariables(
      'gap',
      breakpoints,
      value => `var(--spacing-${value})`,
    );

    expect(result).toEqual(expected);
  });

  it('should output a css string', async () => {
    const breakpoints = {
      xs: '1',
      sm: '2',
      md: '3',
    };
    const expected = `
    --gap-xs: var(--spacing-1);
    --gap-sm: var(--spacing-2);
    --gap-md: var(--spacing-3);
    `;

    const result = formatObjectToCssChunk(
      buildCssBreakpointVariables(
        'gap',
        breakpoints,
        value => `var(--spacing-${value})`,
      ),
    );

    expect(result).toEqual(formatCssString(expected));
  });
});

describe('validateBreakpointProp', () => {
  it('should return false for a single value', async () => {
    const prop = 0;
    expect(validateBreakpointProp(prop, value => value > 0)).toBeFalsy();
  });

  it('should return false for an object', async () => {
    const prop = {
      xs: 0,
    };
    expect(validateBreakpointProp(prop, value => value > 0)).toBeFalsy();
  });

  it('should return true for a single value', async () => {
    const prop = 1;
    expect(validateBreakpointProp(prop, value => value > 0)).toBeTruthy();
  });

  it('should return true for an object', async () => {
    const prop = {
      xs: 1,
    };
    expect(validateBreakpointProp(prop, value => value > 0)).toBeTruthy();
  });
});

const formatObjectToCssChunk = (cssProperties: Record<string, unknown>) => {
  return (
    Array.from(
      Object.entries(cssProperties).map(entry => entry.join(': ')),
    ).join(';\n') + ';'
  );
};

const formatCssString = (css: string) => {
  return css.trim().replace(/(?<!:) */g, '');
};
