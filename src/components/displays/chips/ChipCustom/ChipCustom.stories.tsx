import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { addInlineRadio } from '@/storybook';

import type { ChipCustomProps } from '.';
import ChipCustom from '.';
import { CHIP_SIZES, DEFAULT_SIZE } from '../ChipBase/constants';

type Story = StoryObj<typeof ChipCustom>;

export default {
  title: 'displays/chips/ChipCustom',
  component: ChipCustom,
  args: {
    children: 'value',
    size: DEFAULT_SIZE,
    backgroundColor: 'black',
    color: 'limegreen',
  },
  argTypes: {
    ...addInlineRadio<ChipCustomProps>('size', CHIP_SIZES),
  },
} as Meta<typeof ChipCustom>;

const Template: StoryFn<typeof ChipCustom> = ({
  children,
  ...args
}: ChipCustomProps) => <ChipCustom {...args}>{children}</ChipCustom>;

export const Default: Story = {
  render: Template,
  args: {
    // Explicit undefined to prevent Storybook's action handlers
    // to be sent in the corresponding props.
    onClose: undefined,
    onCloseButtonMouseDown: undefined,
    onCloseButtonTouchEnd: undefined,
  },
};

export const WithCustomColors: Story = {
  render: Template,
  args: {
    backgroundColor: 'black',
    color: 'limegreen',
  },
};

export const CustomColorFunction: Story = {
  render: Template,
  args: {
    backgroundColor: theme => (theme === 'dark' ? 'orange' : 'green'),
    color: theme => (theme === 'dark' ? 'black' : 'white'),
  },
};
