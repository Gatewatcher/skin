import type { Meta, StoryObj } from '@storybook/react';

import SelectableGrid from '.';

type Story = StoryObj<typeof SelectableGrid>;

export default {
  title: 'forms/inputs/SelectableGrid',
  component: SelectableGrid,
} as Meta<typeof SelectableGrid>;

export const Default: Story = {
  args: {
    mode: 'timetable',
    onChange: () => {},
  },
};
