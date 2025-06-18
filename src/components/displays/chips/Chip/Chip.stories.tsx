import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { ChipProps } from '.';
import Chip from '.';
import { CHIP_SIZES, DEFAULT_SIZE } from '../ChipBase/constants';
import {
  CHIP_THEME_COLORS,
  CHIP_TYPES,
  CHIP_TYPES_BASE,
  DEFAULT_TYPE,
} from './constants';

type Story = StoryObj<typeof Chip>;

export default {
  title: 'displays/chips/Chip',
  component: Chip,
  args: {
    children: 'value',
    size: DEFAULT_SIZE,
    type: DEFAULT_TYPE,
  },
  argTypes: {
    ...addInlineRadio<ChipProps>('type', CHIP_TYPES),
    ...addInlineRadio<ChipProps>('size', CHIP_SIZES),
  },
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = ({ children, ...args }: ChipProps) => (
  <Chip {...args}>{children}</Chip>
);

const TemplateAll: StoryFn<typeof Chip> = ({
  children,
  ...args
}: Omit<ChipProps, 'type' | 'color' | 'backgroundColor'>) => (
  <Stack direction="column" gap={5}>
    <Stack gap={5}>
      {CHIP_TYPES_BASE.map(type => (
        <Chip key={type} {...args} type={type}>
          {children}
        </Chip>
      ))}
    </Stack>
    <Stack gap={5}>
      {CHIP_THEME_COLORS.map(type => (
        <Chip key={type} {...args} type={type}>
          {type}
        </Chip>
      ))}
    </Stack>
  </Stack>
);

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

export const WithCloseButton: Story = {
  render: Template,
};

export const All: Story = {
  render: TemplateAll,
  args: {
    ...Default.args,
    children: 'value',
  },
  parameters: {
    controls: { exclude: ['type'] },
  },
};

export const AllWithCloseButtons: Story = {
  render: TemplateAll,
  args: {
    children: 'value',
  },
  parameters: {
    controls: { exclude: ['type'] },
  },
};

export const WithVeryLongText: Story = {
  render: Template,
  args: {
    children: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, ex
        odit! Accusantium aliquid cumque distinctio enim fuga fugiat id,
        molestiae nesciunt quam quisquam reprehenderit sed sint tempora
        temporibus totam veniam?
      </>
    ),
  },
  decorators: [
    Story => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

// export const CustomColorFunction: Story = {
//   render: Template,
//   args: {
//     // type: 'custom',
//     backgroundColor: (theme: Theme) => (theme === 'dark' ? 'orange' : 'green'),
//     color: (theme: Theme) => (theme === 'dark' ? 'black' : 'white'),
//   },
// };
