import type { Meta, StoryObj } from '@storybook/react';

import { ICON_SIZES } from '@/constants';
import { addInlineRadio } from '@/storybook';

import ButtonClose from '.';
import { DEFAULT_SIZE } from '../ButtonIcon/constants';

type Story = StoryObj<typeof ButtonClose>;

export default {
  title: 'actions/buttons/ButtonClose',
  component: ButtonClose,
  argTypes: {
    ...addInlineRadio('size', ICON_SIZES),
  },
} as Meta<typeof ButtonClose>;

export const Default: Story = {
  args: {
    disabled: false,
    rounded: false,
    size: DEFAULT_SIZE,
  },
};
