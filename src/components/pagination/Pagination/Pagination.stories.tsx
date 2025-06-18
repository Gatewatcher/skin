import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '.';

type Story = StoryObj<typeof Pagination>;

export default {
  title: 'pagination/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

export const Default: Story = {
  args: {
    pages: 10,
  },
};
