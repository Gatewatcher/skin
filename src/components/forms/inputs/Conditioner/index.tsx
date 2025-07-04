import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useMemo, useState } from 'react';

import type { OptionsOrGroups } from '../select/SelectBase/types';
import { Base } from './components/Base';
import { AddGroup } from './compounds/AddGroup';
import { ClearAll } from './compounds/ClearAll';
import { Footer } from './compounds/Footer';
import { Save } from './compounds/Save';
import {
  DEFAULT_CONDITIONS,
  DEFAULT_FORMAT_OPTIONS,
  DEFAULT_LOGICAL_GROUPS,
  DEFAULT_MAX_DEPTH,
  DEFAULT_OPERATORS,
  TEST_ID,
} from './constants';
import type { ConditionerContextType } from './context';
import { ConditionerContext } from './context';
import type {
  ConditionType,
  LogicType,
  LogicalGroupType,
  Observable,
  Operators,
} from './types';

export type ConditionerProps = DataTestId & {
  observables?: Observable[];
  initialValues?: [ConditionType[], LogicalGroupType[]];
  controlledStates?: [
    ConditionType[],
    Dispatch<SetStateAction<ConditionType[]>>,
    LogicalGroupType[],
    Dispatch<SetStateAction<LogicalGroupType[]>>,
  ];
  formatsOptions?: OptionsOrGroups;
  maxDepth?: number;
  isMulti?: boolean;
  children?: ReactNode;
  unaryOperators?: string[];
  readonly?: boolean;
  withoutDefaultOperators?: boolean;
  operators?: Partial<Operators>;
  restrictedLogicType?: LogicType;
};

const Conditioner = ({
  children,
  observables,
  controlledStates,
  initialValues = [DEFAULT_CONDITIONS, DEFAULT_LOGICAL_GROUPS],
  formatsOptions = DEFAULT_FORMAT_OPTIONS,
  maxDepth = DEFAULT_MAX_DEPTH,
  operators,
  isMulti = false,
  'data-testid': testId = TEST_ID,
  unaryOperators,
  readonly,
  restrictedLogicType,
  withoutDefaultOperators,
}: ConditionerProps) => {
  const [initConditions, initLogicalGroups] = initialValues;

  let conditionsState = useState<ConditionType[]>([
    ...initConditions.map(condition => ({ ...condition })),
  ]);
  let logicalGroupsState = useState<LogicalGroupType[]>([
    ...initLogicalGroups.map(logicalGroup => ({ ...logicalGroup })),
  ]);

  if (controlledStates) {
    const [
      controlledConditions,
      setControlledConditions,
      controlledLogicalGroups,
      setControlledLogicalGroups,
    ] = controlledStates;

    conditionsState = [controlledConditions, setControlledConditions];
    logicalGroupsState = [controlledLogicalGroups, setControlledLogicalGroups];
  }

  const [conditions, setConditions] = conditionsState;
  const [logicalGroups, setLogicalGroups] = logicalGroupsState;

  const contextValue: ConditionerContextType = useMemo(
    () => ({
      conditions,
      logicalGroups,
      setConditions,
      setLogicalGroups,
      observables,
      operators: {
        ...(withoutDefaultOperators ? operators : DEFAULT_OPERATORS),
        ...operators,
      },
      formatsOptions,
      maxDepth,
      isMulti,
      unaryOperators,
      readonly,
      restrictedLogicType,
    }),
    [
      conditions,
      formatsOptions,
      isMulti,
      logicalGroups,
      maxDepth,
      observables,
      operators,
      setConditions,
      setLogicalGroups,
      unaryOperators,
      readonly,
      restrictedLogicType,
      withoutDefaultOperators,
    ],
  );

  return (
    <ConditionerContext.Provider value={contextValue}>
      <Base data-testid={testId} />
      {children}
    </ConditionerContext.Provider>
  );
};

Conditioner.ClearAll = ClearAll;
Conditioner.Footer = Footer;
Conditioner.AddGroup = AddGroup;
Conditioner.Save = Save;

export default Conditioner;
