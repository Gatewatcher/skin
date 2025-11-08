import type { Option, OptionsOrGroups } from '../select/SelectBase/types';

export type ConditionType = {
  observable?: Option;
  operator?: Option;
  format?: Option;
  value?: string;
  id: string;
  isElse?: boolean;
};

export type LogicalGroupType = {
  logic?: LogicType;
  conditionsId: string[];
  subGroupOf?: string;
  id: string;
  name: string;
  type?: 'if' | 'elif' | 'else';
};

export type LogicType = 'and' | 'or';

export type Operator = 'TEXT' | 'DATE' | 'NUMBER' | 'IP' | 'BOOLEAN' | 'ENUM';

export type Observable = { name: string; type: Operator; enum?: string[] };

export type Operators = {
  all?: OptionsOrGroups;
  boolean?: OptionsOrGroups;
  date?: OptionsOrGroups;
  ip?: OptionsOrGroups;
  number?: OptionsOrGroups;
  text?: OptionsOrGroups;
};
