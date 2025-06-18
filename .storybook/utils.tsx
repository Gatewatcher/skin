import { ELEVATIONS } from 'hocs/withElevation/constants';
import { InputType } from 'storybook/internal/types';

const add = (
  propName: string,
  choices: readonly string[] | readonly number[],
  type: string | null,
  options: InputType,
) => ({
  [propName]: {
    control: type,
    options: choices,
    ...options,
  },
});

export const addText = <T extends object>(
  propName: keyof T,
  options: InputType,
) => ({
  [propName]: {
    control: 'text',
    ...options,
  },
});

export const addSelect = <T extends object>(
  propName: keyof T,
  choices: readonly string[] | readonly number[],
  options: InputType = {},
) => add(propName as string, choices, 'select', options);

export const addMultiSelect = <T extends object>(
  propName: keyof T,
  choices: readonly string[] | readonly number[],
  options: InputType = {},
) => add(propName as string, choices, 'multi-select', options);

export const addInlineRadio = <T extends object>(
  propName: keyof T,
  choices: readonly string[] | readonly number[],
  options: InputType = {},
) => add(propName as string, choices, 'inline-radio', options);

export const addNumber = <T extends object>(
  propName: keyof T,
  options: InputType & {
    min?: number;
    max?: number;
  } = {},
) => {
  const { min, max, ...otherOptions } = options;

  return {
    [propName]: {
      control: {
        type: 'number',
        min,
        max,
      },
      ...otherOptions,
    },
  };
};

export const addBoolean = <T extends object>(
  propName: keyof T,
  options: InputType = {},
) => ({
  [propName]: {
    control: { type: 'boolean' },
    ...options,
  },
});

export const addElevations = () =>
  add('elevation', ELEVATIONS, 'inline-radio', {});
