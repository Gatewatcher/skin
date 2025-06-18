import { type HTMLInputTypeAttribute } from 'react';

import { type PinCodeType } from './types';

export const PIN_CODE_TYPES = ['digits', 'letters', 'any'] as const;

export const DEFAULT_PIN_CODE_LENGTH = 6;
export const DEFAULT_PIN_CODE_TYPE: PinCodeType = 'digits';

export const REGEX_BY_TYPE: Record<PinCodeType, RegExp> = {
  any: /^[a-z0-9]+$/i,
  digits: /^[0-9]+$/,
  letters: /^[a-z]+$/i,
};

export const INPUT_MODE_BY_TYPE: Record<PinCodeType, HTMLInputTypeAttribute> = {
  any: 'text',
  digits: 'number',
  letters: 'text',
};
