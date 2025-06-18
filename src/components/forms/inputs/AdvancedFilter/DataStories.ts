import type {
  ConditionType,
  LogicalGroupType,
  Observable,
} from '../Conditioner/types';

export const observables: Observable[] = [
  { name: 'id', type: 'TEXT' },
  { name: 'created_at', type: 'DATE' },
  { name: 'ip', type: 'IP' },
  { name: 'boolean', type: 'BOOLEAN' },
  { name: 'number', type: 'NUMBER' },
];

export const uidLogicalGroup1 = 'idDeTestLogicalGroup1';
export const uidLogicalGroup2 = 'idDeTestLogicalGroup2';
export const uidLogicalGroup3 = 'idDeTestLogicalGroup3';
export const uidLogicalGroup4 = 'idDeTestLogicalGroup4';
export const uidLogicalGroup5 = 'idDeTestLogicalGroup5';
export const uidLogicalGroup6 = 'idDeTestLogicalGroup6';
export const uidLogicalGroup7 = 'idDeTestLogicalGroup7';
export const uidLogicalGroup8 = 'idDeTestLogicalGroup8';
export const uidLogicalGroup9 = 'idDeTestLogicalGroup9';
export const uidLogicalGroup10 = 'idDeTestLogicalGroup10';

export const initConditionsState: ConditionType[] = [
  {
    id: uidLogicalGroup1,
    observable: { value: 'id', label: 'id' },
    operator: { value: '=', label: 'Equal' },
    value: 'test id 1',
  },
  {
    id: uidLogicalGroup2,
    observable: { value: 'boolean', label: 'boolean' },
    operator: { value: '=', label: 'Equal' },
    value: 'true',
  },
  {
    id: uidLogicalGroup3,
    observable: { value: 'number', label: 'number' },
    operator: { value: '=', label: 'Equal' },
    value: '1',
  },
  {
    id: uidLogicalGroup4,
    observable: { value: 'id', label: 'id' },
    operator: { value: '=', label: 'Equal' },
    value: 'test id 2',
  },
  {
    id: uidLogicalGroup5,
    observable: { value: 'created_at', label: 'created_at' },
    operator: { value: '=', label: 'Equal' },
    value: '2024-11-19',
  },
  {
    id: uidLogicalGroup6,
    observable: { value: 'id', label: 'id' },
    operator: { value: '=', label: 'Equal' },
    value: 'test id 3',
  },
  {
    id: uidLogicalGroup7,
    observable: { value: 'boolean', label: 'boolean' },
    operator: { value: '=', label: 'Equal' },
    value: 'false',
  },
  {
    id: uidLogicalGroup8,
    observable: { value: 'number', label: 'number' },
    operator: { value: '=', label: 'Equal' },
    value: '2',
  },
  {
    id: uidLogicalGroup9,
    observable: { value: 'id', label: 'id' },
    operator: { value: '=', label: 'Equal' },
    value: 'test id 4',
  },
  {
    id: uidLogicalGroup10,
    observable: { value: 'created_at', label: 'created_at' },
    operator: { value: '=', label: 'Equal' },
    value: '2024-11-19',
  },
];

export const initLogicalGroupsState: LogicalGroupType[] = [
  {
    conditionsId: [initConditionsState[0].id],
    id: uidLogicalGroup1,
    name: 'Condition 1',
    logic: 'or',
  },
  {
    conditionsId: [initConditionsState[1].id],
    id: uidLogicalGroup2,
    name: 'Condition 2',
    logic: 'or',
  },
  {
    conditionsId: [initConditionsState[2].id, initConditionsState[3].id],
    id: uidLogicalGroup3,
    name: 'Condition 3',
    logic: 'or',
  },
  {
    conditionsId: [initConditionsState[4].id],
    id: uidLogicalGroup4,
    name: 'Condition 4',
    logic: 'and',
  },
  {
    conditionsId: [initConditionsState[5].id, initConditionsState[6].id],
    id: uidLogicalGroup5,
    name: 'Condition 4',
    logic: 'or',
    subGroupOf: uidLogicalGroup4,
  },
  {
    conditionsId: [initConditionsState[7].id],
    id: uidLogicalGroup6,
    name: 'Condition 4',
    logic: 'or',
  },
  {
    conditionsId: [initConditionsState[8].id, initConditionsState[9].id],
    id: uidLogicalGroup7,
    name: 'Condition 4',
    logic: 'and',
    subGroupOf: uidLogicalGroup6,
  },
];
