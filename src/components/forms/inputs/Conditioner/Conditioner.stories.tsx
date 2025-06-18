import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Stack } from '@/skin/layout';

import type { ConditionerProps } from '.';
import Conditioner from '.';
import type { ConditionType, LogicalGroupType } from './types';

const initConditionsState: ConditionType[] = [
  { id: 'idDeTestCondition1' },
  { id: 'idDeTestCondition2' },
  { id: 'idDeTestCondition3' },
  { id: 'idDeTestCondition4' },
  { id: 'idDeTestCondition5' },
];

const uidLogicalGroup1 = 'idDeTestLogicalGroup1';
const uidLogicalGroup2 = 'idDeTestLogicalGroup2';
const uidLogicalGroup3 = 'idDeTestLogicalGroup3';
const uidLogicalGroup4 = 'idDeTestLogicalGroup4';
const uidLogicalGroup5 = 'idDeTestLogicalGroup5';

const initLogicalGroupsState: LogicalGroupType[] = [
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
    logic: 'and',
    subGroupOf: uidLogicalGroup1,
  },
  {
    conditionsId: [initConditionsState[2].id],
    id: uidLogicalGroup3,
    name: 'Condition 3',
    logic: 'or',
    subGroupOf: uidLogicalGroup2,
  },
  {
    conditionsId: [initConditionsState[3].id],
    id: uidLogicalGroup4,
    name: 'Condition 4',
    logic: 'and',
    subGroupOf: uidLogicalGroup3,
  },
  {
    conditionsId: [initConditionsState[4].id],
    id: uidLogicalGroup5,
    name: 'Condition 5',
    logic: 'and',
    subGroupOf: uidLogicalGroup4,
  },
];

const initNestedLogicalGroupsState: LogicalGroupType[] = [
  {
    conditionsId: [initConditionsState[0].id],
    id: uidLogicalGroup1,
    name: 'Condition 1',
    logic: 'or',
  },
  {
    conditionsId: [initConditionsState[1].id, initConditionsState[2].id],
    id: uidLogicalGroup2,
    name: 'Condition 2',
    logic: 'and',
    subGroupOf: uidLogicalGroup1,
  },
  {
    conditionsId: [initConditionsState[3].id],
    id: uidLogicalGroup3,
    name: 'Condition 3',
    logic: 'and',
  },
  {
    conditionsId: [initConditionsState[4].id],
    id: uidLogicalGroup4,
    name: 'Condition 4',
    logic: 'and',
    subGroupOf: uidLogicalGroup3,
  },
];

type TemplateProps = {
  isMulti?: boolean;
  initialConditions?: ConditionType[];
  initialLogicalGroups?: LogicalGroupType[];
  withControlledStates?: boolean;
  maxDepth?: number;
  unaryOperators?: string[];
  readonly?: boolean;
};

const Template = ({
  isMulti,
  initialConditions,
  initialLogicalGroups,
  withControlledStates = false,
  maxDepth,
  unaryOperators,
  readonly,
}: TemplateProps) => {
  let initialValues: [ConditionType[], LogicalGroupType[]] | undefined;

  if (initialConditions && initialLogicalGroups) {
    initialValues = [initialConditions, initialLogicalGroups];
  }

  const conditionsState = useState<ConditionType[]>(initialValues?.[0] || []);
  const logicalGroupsState = useState<LogicalGroupType[]>(
    initialValues?.[1] || [],
  );

  let controlledStates: ConditionerProps['controlledStates'];
  if (withControlledStates) {
    controlledStates = [...conditionsState, ...logicalGroupsState];
  }

  const handleOnSave = withControlledStates
    ? () => console.log(controlledStates?.[0], controlledStates?.[2])
    : console.log;

  return (
    <Conditioner
      observables={[
        { name: 'id', type: 'TEXT' },
        { name: 'created_at', type: 'DATE' },
        { name: 'ip', type: 'IP' },
        { name: 'boolean', type: 'BOOLEAN' },
        { name: 'number', type: 'NUMBER' },
      ]}
      controlledStates={controlledStates}
      initialValues={initialValues}
      isMulti={isMulti}
      maxDepth={maxDepth}
      readonly={readonly}
      unaryOperators={unaryOperators}
    >
      <Conditioner.Footer>
        <Conditioner.ClearAll />
        <Conditioner.AddGroup />
        {!isMulti && <Conditioner.Save onClick={handleOnSave} />}
      </Conditioner.Footer>
      {isMulti && (
        <Stack justifyContent="flex-end" margin={{ top: 9 }}>
          <Conditioner.Save onClick={handleOnSave} />
        </Stack>
      )}
    </Conditioner>
  );
};

export default {
  title: 'forms/inputs/Conditioner',
  component: Conditioner,
  args: {
    readonly: false,
  },
} as Meta<typeof Conditioner>;

export const Filter: Meta<typeof Template> = {
  render: Template,
};

export const FilterNested: Meta<typeof Template> = {
  render: Template,
  args: {
    maxDepth: 4,
    initialConditions: initConditionsState,
    initialLogicalGroups: initLogicalGroupsState,
  },
};

export const Variant: Meta<typeof Template> = {
  render: Template,
  args: {
    initialConditions: [initConditionsState[0]],
    initialLogicalGroups: [
      {
        conditionsId: [initConditionsState[0].id],
        id: uidLogicalGroup1,
        name: 'Condition 1',
      },
    ],
    isMulti: true,
    maxDepth: 1,
  },
};

export const VariantNested: Meta<typeof Template> = {
  render: Template,
  args: {
    initialConditions: initConditionsState,
    initialLogicalGroups: initNestedLogicalGroupsState,
    isMulti: true,
    maxDepth: 2,
    withControlledStates: true,
  },
};
