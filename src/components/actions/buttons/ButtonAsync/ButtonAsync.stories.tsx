import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { ButtonAsyncProps } from '.';
import ButtonAsync from '.';
import { BUTTON_SIZES, DEFAULT_SIZE } from '../Button/constants';
import {
  BUTTON_BEHAVIORS,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
  DEFAULT_BEHAVIOR,
  DEFAULT_TYPE,
  DEFAULT_VARIANT,
} from '../ButtonBase/constants';

type Story = StoryObj<typeof ButtonAsync>;

export default {
  title: 'actions/buttons/ButtonAsync',
  component: ButtonAsync,
  args: {
    behavior: DEFAULT_BEHAVIOR,
    children: 'Async button',
    disabled: false,
    fill: false,
    type: DEFAULT_TYPE,
    size: DEFAULT_SIZE,
    variant: DEFAULT_VARIANT,
  },
  argTypes: {
    ...addInlineRadio<ButtonAsyncProps>('behavior', BUTTON_BEHAVIORS),
    ...addInlineRadio<ButtonAsyncProps>('type', BUTTON_TYPES),
    ...addInlineRadio<ButtonAsyncProps>('variant', BUTTON_VARIANTS),
    ...addInlineRadio<ButtonAsyncProps>('size', BUTTON_SIZES),
  },
} as Meta<typeof ButtonAsync>;

const Template: StoryFn<typeof ButtonAsync> = args => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = () =>
    new Promise<void>(resolve => {
      setIsLoading(true);
      setTimeout(() => {
        resolve();
        setIsLoading(false);
      }, 3000);
    });

  return <ButtonAsync {...args} isLoading={isLoading} onClick={onClick} />;
};

export const Default: Story = {
  render: Template,
  args: {},
};

const Item = (props: ButtonAsyncProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = () =>
    new Promise<void>(resolve => {
      setIsLoading(true);
      setTimeout(() => {
        resolve();
        setIsLoading(false);
      }, 3000);
    });

  return <ButtonAsync {...props} isLoading={isLoading} onClick={onClick} />;
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
              <Item
                key={variant}
                {...args}
                fill={fill}
                type={type}
                variant={variant}
              >
                {children}
              </Item>
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
