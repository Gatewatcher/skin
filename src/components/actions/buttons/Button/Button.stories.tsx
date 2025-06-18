import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ICON_NAMES } from '@/constants';
import { Stack } from '@/skin/layout';
import { addInlineRadio, addSelect } from '@/storybook';

import type { ButtonProps } from '.';
import Button from '.';
import {
  BUTTON_BEHAVIORS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
  DEFAULT_BEHAVIOR,
  DEFAULT_SIZE,
  DEFAULT_TYPE,
  DEFAULT_VARIANT,
} from './../ButtonBase/constants';

type Story = StoryObj<typeof Button>;

export default {
  title: 'actions/buttons/Button',
  component: Button,
  args: {
    behavior: DEFAULT_BEHAVIOR,
    children: 'Button text',
    disabled: false,
    fill: false,
    type: DEFAULT_TYPE,
    size: DEFAULT_SIZE,
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<ButtonProps>('behavior', BUTTON_BEHAVIORS),
    ...addInlineRadio<ButtonProps>('type', BUTTON_TYPES),
    ...addInlineRadio<ButtonProps>('variant', BUTTON_VARIANTS),
    ...addInlineRadio<ButtonProps>('size', BUTTON_SIZES),
    ...addSelect<ButtonProps>('startIcon', ICON_NAMES),
    ...addSelect<ButtonProps>('endIcon', ICON_NAMES),
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({
  children,
  ...args
}: ButtonProps) => <Button {...args}>{children}</Button>;

export const Default: Story = {
  render: Template,
};

export const Outlined: Story = {
  render: Template,
  args: {
    variant: 'outlined',
  },
  parameters: {
    controls: { exclude: ['variant'] },
  },
};

export const Ghosted: Story = {
  render: Template,
  args: {
    variant: 'ghosted',
  },
  parameters: {
    controls: { exclude: ['variant'] },
  },
};

export const Full: Story = {
  render: Template,
  args: {
    fill: true,
  },
};

export const All: Story = {
  render: ({ children, fill, ...args }) => {
    const variants = BUTTON_VARIANTS.filter(variant => variant !== 'bared');
    return (
      <Stack gap={6}>
        {BUTTON_TYPES.map(type => (
          <Stack
            key={type}
            direction="column"
            gap={6}
            style={{ ...(fill && { width: '100%' }) }}
          >
            {variants.map(variant => (
              <Button
                key={variant}
                {...args}
                fill={fill}
                type={type}
                variant={variant}
              >
                {children}
              </Button>
            ))}
          </Stack>
        ))}
      </Stack>
    );
  },
  parameters: {
    controls: { exclude: ['type', 'variant'] },
  },
};

export const WithIcon: Story = {
  render: Template,
  args: {
    startIcon: 'Robot',
    endIcon: 'FileDownload',
  },
};
