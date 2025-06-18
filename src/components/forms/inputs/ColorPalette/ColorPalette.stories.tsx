import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';

import type { ColorPaletteProps } from '.';
import ColorPalette from '.';

type Story = StoryObj<typeof ColorPalette>;

export default {
  title: 'forms/inputs/ColorPalette',
  component: ColorPalette,
  argTypes: {
    onColorChange: { action: 'color changed' },
  },
  args: {
    withLabel: false,
  },
} as Meta<typeof ColorPalette>;

const ControlledPalette = withControlledValue(ColorPalette, {
  valuePropName: 'value',
});

const Template: StoryFn<typeof ColorPalette> = (args: ColorPaletteProps) => (
  <ControlledPalette {...args} />
);

export const Default: Story = {
  render: Template,
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const Checked: Story = {
  render: Template,
  args: {
    value: 'yellow',
  },
};

export const Test: Story = {
  render: ColorPalette,
};
