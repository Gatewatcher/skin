import type { Meta, StoryObj } from '@storybook/react';

import { ICON_SIZES, TYPES } from '@/constants';
import { Stack } from '@/skin/layout';
import { DEFAULT_SIZE, SIZE_VARIANTS } from '@/skin/typography/constants';
import { addInlineRadio } from '@/storybook';

import type { TextIconProps } from '.';
import TextIcon from '.';

type Story = StoryObj<typeof TextIcon>;

export default {
  title: 'displays/TextIcon',
  component: TextIcon,
  argTypes: {
    ...addInlineRadio<TextIconProps>('type', TYPES),
    ...addInlineRadio<TextIconProps>('iconSize', ICON_SIZES),
    ...addInlineRadio<TextIconProps>('size', SIZE_VARIANTS),
  },
  args: {
    asFragment: false,
    children: 'content',
    startIcon: 'CircleInfo',
    size: DEFAULT_SIZE,
  },
} as Meta<typeof TextIcon>;

export const Default: Story = {};

export const End: Story = {
  args: {
    endIcon: 'CircleInfo',
  },
  parameters: { controls: { exclude: ['startIcon'] } },
};

export const Both: Story = {
  args: {
    startIcon: 'CircleInfo',
  },
};

export const All: Story = {
  render: ({ children, ...args }) => {
    return (
      <Stack direction="column" gap={6}>
        {TYPES.map(type => (
          <TextIcon key={type} {...args} type={type}>
            {children}
          </TextIcon>
        ))}
      </Stack>
    );
  },

  args: {
    startIcon: 'CircleInfo',
  },
};
