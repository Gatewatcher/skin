import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addElevations, addInlineRadio } from '@/storybook';

import type { ButtonFloatProps } from '.';
import ButtonFloat from '.';
import { BUTTON_SIZES, BUTTON_VARIANTS, DEFAULT_SIZE } from './constants';

type Story = StoryObj<typeof ButtonFloat>;

export default {
  title: 'actions/buttons/ButtonFloat',
  component: ButtonFloat,
  args: {
    disabled: false,
    icon: 'ChevronDown',
    size: DEFAULT_SIZE,
    tooltipContent: 'This is a tooltip',
  },
  argTypes: {
    ...addInlineRadio<ButtonFloatProps>(
      'size',
      [...BUTTON_SIZES].sort((a, b) => b.localeCompare(a)),
    ),
    ...addInlineRadio<ButtonFloatProps>('variant', [...BUTTON_VARIANTS]),
    ...addElevations(),
  },
} as Meta<typeof ButtonFloat>;

export const Default: Story = {
  render: args => <ButtonFloat {...args} />,
};

export const All: Story = {
  render: args => (
    <Stack gap={5}>
      {BUTTON_VARIANTS.map(variant => {
        console.log('variant', variant);
        return BUTTON_SIZES.map(size => (
          <Stack key={size} direction="column" gap={5}>
            <ButtonFloat {...args} size={size} variant={variant} />
          </Stack>
        ));
      })}
    </Stack>
  ),

  parameters: {
    controls: { exclude: ['type', 'variant'] },
  },
};

export const Medium: Story = {
  render: args => (
    <Stack gap={5}>
      <ButtonFloat {...args} />
    </Stack>
  ),
  args: {
    size: 'medium',
  },
  parameters: {
    controls: { exclude: ['type', 'variant'] },
  },
};

export const Small: Story = {
  render: (args: ButtonFloatProps) => (
    <Stack gap={5}>
      <ButtonFloat {...args} />
    </Stack>
  ),
  args: {
    size: 'small',
  },
  parameters: {
    controls: { exclude: ['type', 'variant'] },
  },
};

export const Outlined: Story = {
  render: (args: ButtonFloatProps) => (
    <Stack gap={5}>
      <ButtonFloat {...args} />
    </Stack>
  ),
  args: {
    variant: 'outlined',
  },
  parameters: {
    controls: { exclude: ['type', 'variant'] },
  },
};
