import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button } from '@/skin/actions';
import { addBoolean } from '@/storybook';

import type { DropdownSelectProps } from '.';
import DropdownSelect from '.';

type Story<T = string> = StoryObj<typeof DropdownSelect<T>>;

export default {
  title: 'forms/DropdownSelect/Single',
  component: DropdownSelect,
  argTypes: {
    onChange: { action: 'value changed' },
    ...addBoolean<DropdownSelectProps<string>>('isOpened'),
  },
  args: {
    options: [
      { label: 'Id', value: 'id' },
      { label: 'Name', value: 'name' },
      { label: 'Gcap', value: 'gcap' },
      { label: 'Assignees', value: 'assignees' },
    ],
    children: <Button startIcon="Filters">Columns</Button>,
  },
} as Meta<typeof DropdownSelect>;

const Template: StoryFn<typeof DropdownSelect<string>> = <T,>(
  args: DropdownSelectProps<T>,
) => <DropdownSelect {...args} />;

export const Default: Story = {
  render: Template,
};

export const WithInitialValues: Story = {
  render: Template,
  args: {
    initialValue: 'id',
  },
};

export const WithInfiniteScroll: Story = {
  render: Template,
  args: {
    options: range({ stop: 100 }).map(item => ({
      label: item.toString(),
      value: item.toString(),
    })),
  },
};
