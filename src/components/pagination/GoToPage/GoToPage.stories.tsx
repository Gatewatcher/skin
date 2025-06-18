import type { Meta, StoryObj } from '@storybook/react';

import GoToPage from '.';

type Story = StoryObj<typeof GoToPage>;

export default {
  title: 'pagination/GoToPage',
  component: GoToPage,
} as Meta<typeof GoToPage>;

export const Default: Story = {
  args: {
    onChange: (value: number) => console.log(value),
    totalPages: 10,
    value: 1,
  },
};
