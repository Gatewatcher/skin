import type { Meta, StoryObj } from '@storybook/react';

import { addInlineRadio } from '@/storybook';

import type { ItemsPerPageProps } from '.';
import ItemsPerPage from '.';
import { DEFAULT_INITIAL_PER_PAGE } from '../LoadMore/constants';
import { DEFAULT_ITEMS_PER_PAGE_OPTIONS } from './constants';

type Story = StoryObj<typeof ItemsPerPage>;

export default {
  title: 'pagination/ItemsPerPage',
  component: ItemsPerPage,
  args: {
    value: DEFAULT_INITIAL_PER_PAGE,
    onChange: value => {
      console.log('on change', value);
    },
    options: DEFAULT_ITEMS_PER_PAGE_OPTIONS,
    totalItemsCount: 200,
  },
  argTypes: {
    ...addInlineRadio<ItemsPerPageProps>(
      'value',
      DEFAULT_ITEMS_PER_PAGE_OPTIONS,
    ),
  },
} as Meta<typeof ItemsPerPage>;

export const Default: Story = {
  args: {},
};
