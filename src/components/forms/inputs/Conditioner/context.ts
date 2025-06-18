import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { OptionsOrGroups } from '../select/SelectBase/types';
import type {
  ConditionType,
  LogicType,
  LogicalGroupType,
  Observable,
  Operators,
} from './types';

export type ConditionerContextType = {
  observables?: Observable[];
  conditions: ConditionType[];
  logicalGroups: LogicalGroupType[];
  setConditions: Dispatch<SetStateAction<ConditionType[]>>;
  setLogicalGroups: Dispatch<SetStateAction<LogicalGroupType[]>>;
  maxDepth: number;
  operators: Operators;
  formatsOptions?: OptionsOrGroups;
  isMulti: boolean;
  unaryOperators?: string[];
  readonly?: boolean;
  restrictedLogicType?: LogicType;
};

export const ConditionerContext = createContext<ConditionerContextType | null>(
  null,
);

export const useConditionerContext = () => {
  const context = useContext(ConditionerContext);

  if (!context) {
    throw new Error(
      'useConditionerContext() can only be used as a child of <Conditioner />',
    );
  }

  return context;
};
