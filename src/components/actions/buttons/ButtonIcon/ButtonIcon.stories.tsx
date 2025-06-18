import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { ButtonIconProps } from '.';
import ButtonIcon from '.';
import {
  BUTTON_BEHAVIORS,
  BUTTON_VARIANTS,
  DEFAULT_BEHAVIOR,
  DEFAULT_VARIANT,
} from './../ButtonBase/constants';
import {
  BUTTON_SIZES,
  BUTTON_TYPES,
  DEFAULT_SIZE,
  DEFAULT_TYPE,
} from './constants';

type Story = StoryObj<typeof ButtonIcon>;

export default {
  title: 'actions/buttons/ButtonIcon',
  component: ButtonIcon,
  args: {
    behavior: DEFAULT_BEHAVIOR,
    disabled: false,
    icon: 'Phone',
    type: DEFAULT_TYPE,
    size: DEFAULT_SIZE,
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<ButtonIconProps>('behavior', BUTTON_BEHAVIORS),
    ...addInlineRadio<ButtonIconProps>('type', BUTTON_TYPES),
    ...addInlineRadio<ButtonIconProps>('variant', BUTTON_VARIANTS),
    ...addInlineRadio<ButtonIconProps>(
      'size',
      [...BUTTON_SIZES].sort((a, b) => b.localeCompare(a)),
    ),
  },
} as Meta<typeof ButtonIcon>;

export const Default: Story = {
  render: args => <ButtonIcon {...args} />,
};

export const All: Story = {
  render: args => (
    <Stack gap={5}>
      {BUTTON_TYPES.map(type => (
        <Stack key={type} direction="column" gap={5}>
          {BUTTON_VARIANTS.map(variant => (
            <ButtonIcon key={variant} {...args} type={type} variant={variant} />
          ))}
        </Stack>
      ))}
    </Stack>
  ),

  parameters: {
    controls: { exclude: ['type', 'variant'] },
  },
};

export const Outlined: Story = {
  render: args => (
    <Stack gap={5}>
      {BUTTON_TYPES.map(type => (
        <ButtonIcon key={type} {...args} type={type} />
      ))}
    </Stack>
  ),
  args: {
    variant: 'outlined',
  },
  parameters: {
    controls: { exclude: ['type', 'variant'] },
  },
};

export const Ghosted: Story = {
  render: (args: ButtonIconProps) => (
    <Stack gap={5}>
      {BUTTON_TYPES.map(type => (
        <ButtonIcon key={type} {...args} type={type} />
      ))}
    </Stack>
  ),
  args: {
    variant: 'ghosted',
  },
  parameters: {
    controls: { exclude: ['type', 'variant'] },
  },
};
