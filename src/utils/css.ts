import {
  clamp,
  isDefined,
  isNumber,
  isObject,
  isString,
} from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';

import { BREAKPOINTS, MAX_SPACING } from '@/constants';
import type { Gap } from '@/skin/layout/Grid/types';
import type { BreakpointProp } from '@/types';

import type { GapXY } from './../components/layout/Grid/types';

const defaultTransform = <T extends string | number>(
  value: T,
): string | number => (isString(value) ? value : value.toString());

export const buildCssBreakpointVariables = <T extends string | number>(
  prefix: string,
  breakpoints: BreakpointProp<T> = {},
  transformValue: typeof defaultTransform<T> = defaultTransform,
): Record<string, string> => {
  if (isString(breakpoints) || isNumber(breakpoints)) {
    return overrideSmallestBreakpoint(prefix, breakpoints, transformValue);
  }

  return Object.entries(breakpoints).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(isDefined(value) &&
        buildCssVariable(`${prefix}-${key}`, value, transformValue)),
    }),
    {},
  );
};

export const buildCssVariable = <T extends string | number>(
  name: string,
  value?: T,
  transformValue: typeof defaultTransform<T> = defaultTransform,
): Record<string, unknown> => ({
  ...(value && {
    [`--${name.replace(/^--/, '')}`]: transformValue(value).toString(),
  }),
});

const overrideSmallestBreakpoint = <T extends string | number>(
  prefix: string,
  value: T,
  transformValue: typeof defaultTransform<T>,
) => {
  const breakpointKey = `--${prefix}-${BREAKPOINTS[0]}`;

  return {
    [breakpointKey]: transformValue(value).toString(),
  };
};

export const validateBreakpointProp = (
  prop: BreakpointProp | undefined,
  validate: (value: string | number) => boolean,
): boolean => {
  if (isString(prop) || isNumber(prop)) {
    return validate(prop);
  }

  if (isObject(prop)) {
    return Object.values(prop).filter(value => !validate(value)).length === 0;
  }

  return true;
};

export const buildGapStyles = (
  prefix: string,
  gap?: Gap,
): Record<string, unknown> | undefined => {
  const transform = (value: number) =>
    `var(--spacing-${clamp(value, 0, MAX_SPACING)})`;

  if (!gapIsValid(gap)) {
    consoleWarn(
      `Gap values should be comprised in between 0 and ${MAX_SPACING}, included. Current:`,
      gap,
    );
  }

  if (!isDefined(gap)) return {};

  const gapXY = gap as GapXY;
  const isShortcut = !gapXY.x && !gapXY.y;

  return {
    ...buildCssBreakpointVariables(
      `${prefix}-x`,
      isShortcut ? (gap as BreakpointProp) : (gapXY.x as BreakpointProp),
      transform,
    ),
    ...buildCssBreakpointVariables(
      `${prefix}-y`,
      isShortcut ? (gap as BreakpointProp) : (gapXY.y as BreakpointProp),
      transform,
    ),
  };
};

export const gapIsValid = (gap?: Gap) => {
  const validation = (value: string | number) => {
    const val = parseInt(value.toString(), 10);
    return val >= 0 && val <= MAX_SPACING;
  };

  const gapXY = gap as GapXY;

  if (isObject(gap) && (gapXY.x || gapXY.y)) {
    return (
      validateBreakpointProp(gapXY.x, validation) &&
      validateBreakpointProp(gapXY.y, validation)
    );
  }

  return validateBreakpointProp(gap as BreakpointProp, validation);
};
