import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { AdvancedFilterProps } from './AdvancedFilter';
import AdvancedFilter from './AdvancedFilter';
import {
  initConditionsState,
  initLogicalGroupsState,
  observables,
} from './DataStories';

type Story = StoryObj<typeof AdvancedFilter>;

export default {
  title: 'forms/inputs/AdvancedFilter',
  component: AdvancedFilter,
} as Meta<typeof Number>;

const Template: StoryFn<typeof AdvancedFilter> = (
  args: AdvancedFilterProps,
) => <AdvancedFilter {...args} onSave={console.log} />;

export const WithObservables: Meta<typeof Template> = {
  render: Template,
  args: {
    observables,
  },
};

export const WithNestedFilters: Meta<typeof Template> = {
  render: Template,
  args: {
    observables,
    initialAdvancedFilters: {
      idDeTestLogicalGroup1: {
        conditions: initConditionsState,
        logicalGroups: [initLogicalGroupsState[0]],
      },
      idDeTestLogicalGroup2: {
        conditions: initConditionsState,
        logicalGroups: [initLogicalGroupsState[1]],
      },
      idDeTestLogicalGroup3: {
        conditions: initConditionsState,
        logicalGroups: [initLogicalGroupsState[2]],
      },
      idDeTestLogicalGroup4: {
        conditions: initConditionsState,
        logicalGroups: [initLogicalGroupsState[3], initLogicalGroupsState[4]],
      },
      idDeTestLogicalGroup5: {
        conditions: initConditionsState,
        logicalGroups: [initLogicalGroupsState[5], initLogicalGroupsState[6]],
      },
      idDeTestLogicalGroup6: {
        conditions: initConditionsState,
        logicalGroups: [initLogicalGroupsState[5], initLogicalGroupsState[6]],
      },
    },
  },
};

export const Default: Story = {
  render: Template,
};
