import type { Meta, StoryObj } from '@storybook/react';

import { Chip, TextIcon } from '@/skin/displays';

import ObjectGrid from '.';

type Story = StoryObj<typeof ObjectGrid>;

export default {
  title: 'displays/ObjectGrid',
  component: ObjectGrid,
  args: {
    data: {},
  },
} as Meta<typeof ObjectGrid>;

export const Default: Story = {
  args: {
    data: {
      test1: { a: 1, b: 2, c: 3, d: 4 },
      test2: { a: 1, d: 4 },
      test3: { a: 1, b: 2 },
      test4: { c: 3, d: 4 },
      test5: { e: 5 },
      test6: {},
    },
  },
};

export const WithReactNodes: Story = {
  args: {
    data: {
      test1: {
        a: <Chip type="low">1</Chip>,
        b: <TextIcon startIcon="Check">2</TextIcon>,
      },
      test2: { a: 1, d: 4 },
    },
  },
};
