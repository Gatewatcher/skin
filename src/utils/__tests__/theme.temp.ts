import * as domUtils from '@gatewatcher/bistoury/utils-dom';
import { expect, vi } from 'vitest';

import { getColor, getThemeValue } from '../theme';

describe.skip('Theme utils', () => {
  const spy = vi.spyOn(domUtils, 'getPropertyValue');

  afterEach(() => {
    spy.mockRestore();
  });

  it('should return theme value', () => {
    spy.mockReturnValue('--spacing-6');
    const value = getThemeValue('--spacing-6');
    expect(value).toEqual('--spacing-6');
  });

  it('should return theme value without --', () => {
    spy.mockReturnValue('--spacing-6');
    const value = getThemeValue('--spacing-6');
    expect(value).toEqual('--spacing-6');
  });

  it('should return theme color - info', () => {
    spy.mockReturnValue('--color-info');
    const value = getColor('info');
    expect(value).toEqual('var(--color-info)');
  });

  it('should return theme color - info 300', () => {
    spy.mockReturnValue('--color-info-300');
    const value = getColor('info', { variant: 300 });
    expect(value).toEqual('var(--color-info-300)');
  });

  it('should return theme color - low risk 700', () => {
    spy.mockReturnValue('--color-low-risk-700');
    const value = getColor('low', { variant: 700 });
    expect(value).toEqual('var(--color-low-risk-700)');
  });
});
