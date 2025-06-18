import type { TestId } from '@gatewatcher/bistoury/utils-types';

import type { OptionsOrGroups } from '../select/SelectBase/types';
import type { LogicalGroupType, Operators } from './types';

export const DEFAULT_CONDITIONS = [{ id: 'defaultCondition1' }];
export const DEFAULT_LOGICAL_GROUPS: LogicalGroupType[] = [
  {
    conditionsId: ['defaultCondition1'],
    id: 'defaultGroup1',
    name: 'Condition 1',
  },
];

export const DEFAULT_MAX_DEPTH = 1;
export const DEFAULT_FORMAT_OPTIONS: OptionsOrGroups = [
  { label: 'IP', value: 'ip' },
  { label: 'Datetime', value: 'date-time' },
  { label: 'Date', value: 'date' },
  { label: 'Time', value: 'time' },
];

export enum DEFAULT_ADD_CONDITION_BUTTONS_LABEL {
  OR = 'OR',
  AND = 'AND',
}

export const TEXT_OPERATOR_OPTIONS: OptionsOrGroups = [
  { value: '=', label: 'Equal' },
  { value: '!=', label: 'Not equal' },
  { value: 'in', label: 'Is one of' },
  { value: 'not in', label: 'Is not one of' },
  { value: 'contains', label: 'Contains' },
  { value: '=*', label: 'Exists' },
  { value: '!=*', label: 'Does not exist' },
];

export const DATE_NUMBER_IP_OPERATOR_OPTIONS: OptionsOrGroups = [
  { value: '=', label: 'Equal' },
  { value: '!=', label: 'Not equal' },
  { value: 'in', label: 'Is one of' },
  { value: 'not in', label: 'Is not one of' },
  { value: '>', label: 'Greater than' },
  { value: '>=', label: 'Greater than equal' },
  { value: '<', label: 'Lesser than' },
  { value: '<=', label: 'Lesser than equal' },
  { value: '=*', label: 'Exists' },
  { value: '!=*', label: 'Does not exist' },
];

export const BOOLEAN_OPERATOR_OPTIONS: OptionsOrGroups = [
  { value: '=', label: 'Equal' },
  { value: '!=', label: 'Not equal' },
  { value: '=*', label: 'Exists' },
  { value: '!=*', label: 'Does not exist' },
];

export const ALL_OPERATOR_OPTIONS: OptionsOrGroups = [
  { value: '=', label: 'Equal' },
  { value: '!=', label: 'Not equal' },
  { value: 'in', label: 'Is one of' },
  { value: 'not in', label: 'Is not one of' },
  { value: 'contains', label: 'Contains' },
  { value: '>', label: 'Greater than' },
  { value: '>=', label: 'Greater than equal' },
  { value: '<', label: 'Lesser than' },
  { value: '<=', label: 'Lesser than equal' },
  { value: '=*', label: 'Exists' },
  { value: '!=*', label: 'Does not exist' },
];

export const DEFAULT_OPERATORS: Operators = {
  all: ALL_OPERATOR_OPTIONS,
  text: TEXT_OPERATOR_OPTIONS,
  boolean: BOOLEAN_OPERATOR_OPTIONS,
  date: DATE_NUMBER_IP_OPERATOR_OPTIONS,
  number: DATE_NUMBER_IP_OPERATOR_OPTIONS,
  ip: DATE_NUMBER_IP_OPERATOR_OPTIONS,
};

export const DEFAULT_CONDITION_PLACEHOLDER = 'Condition name';
export const DEFAULT_OBSERVABLE_PLACEHOLDER = 'Observable';
export const DEFAULT_FORMAT_PLACEHOLDER = 'Format';
export const DEFAULT_OPERATOR_PLACEHOLDER = 'Operator';
export const DEFAULT_VALUE_PLACEHOLDER = 'Value';

export const TEST_ID: TestId = 'conditioner';
export const SUFFIX_TEST_IDS = [
  'addOr',
  'addAnd',
  'operator',
  'observable',
  'format',
  'inputText',
  'inputBoolean',
  'inputNumber',
  'inputSelect',
  'delete',
  'clearAll',
  'save',
  'mainGroup',
  'subGroup',
  'subGroupLogic',
  'condition',
  'conditionLogic',
  'addElseIf',
  'addElse',
  'removeElseIf',
  'removeElse',
  'if',
  'elseIf',
  'else',
] as const;
