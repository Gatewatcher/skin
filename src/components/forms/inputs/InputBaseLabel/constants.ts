import type { RuleItem } from 'async-validator';

import { STACK_DIRECTIONS } from '@/skin/layout/Stack/constants';

import type { LabelDirection } from './types';

export const VALID_PROPS_RULES = [
  'min',
  'max',
  'minLength',
  'maxLength',
  'len',
];

export const LABEL_DIRECTIONS = STACK_DIRECTIONS;
export const DEFAULT_LABEL_DIRECTION: LabelDirection = 'column';
export const DEFAULT_WITH_LABEL = true;
export const DEFAULT_WITH_FORMATTING = true;

export const STRING_RULES_TO_ATTRIBUTES: Record<
  keyof Pick<RuleItem, 'min' | 'max' | 'len'>,
  string[]
> = {
  min: ['minLength'],
  max: ['maxLength'],
  len: ['minLength', 'maxLength'],
};
