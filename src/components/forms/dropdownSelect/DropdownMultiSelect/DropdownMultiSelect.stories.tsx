import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button } from '@/skin/actions';
import { addBoolean } from '@/storybook';

import type { DropdownMultiSelectProps } from '.';
import DropdownMultiSelect from '.';

type Story<T = string> = StoryObj<typeof DropdownMultiSelect<T>>;

export default {
  title: 'forms/DropdownSelect/Multi',
  component: DropdownMultiSelect,
  argTypes: {
    onChange: { action: 'value changed' },
    ...addBoolean<DropdownMultiSelectProps<string>>('isOpened'),
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
} as Meta<typeof DropdownMultiSelect>;

const Template: StoryFn<typeof DropdownMultiSelect<string>> = <T,>(
  args: DropdownMultiSelectProps<T>,
) => <DropdownMultiSelect {...args} />;

export const Default: Story = {
  render: Template,
};

export const WithInitialValues: Story = {
  render: Template,
  args: {
    initialValue: ['id'],
  },
};

export const AllSelected: Story = {
  render: Template,
  args: {
    initialValue: ['id', 'name', 'gcap', 'assignees'],
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
