import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button, ButtonIcon } from '@/skin/actions';
import { Text } from '@/skin/typography';
import { addInlineRadio, addSelect } from '@/storybook';

import type { TooltipProps } from '.';
import Tooltip from '.';
import Dropdown from '../Dropdown';
import type { FloatingProps } from '../Floating';
import {
  DEFAULT_SIZE,
  DEFAULT_VALUES,
  DURATIONS,
  PLACEMENTS,
  SIZES,
} from '../Floating/constants';

faker.seed(10);

type Story = StoryObj<typeof Tooltip>;

export default {
  title: 'displays/floating/Tooltip',
  component: Tooltip,
  args: {
    content: 'Tooltip content',
    children: <>Trigger Element</>,
    size: DEFAULT_SIZE,
    ...DEFAULT_VALUES,
  },
  argTypes: {
    ...addSelect<FloatingProps>('placement', PLACEMENTS),
    ...addInlineRadio<TooltipProps>('size', SIZES),
    ...addInlineRadio<TooltipProps>('duration', DURATIONS),
  },
  decorators: [
    Story => (
      <div
        style={{
          height: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = ({
  children,
  content,
  ...args
}: TooltipProps) => (
  <Tooltip {...args} content={content}>
    <Text>{children}</Text>
  </Tooltip>
);

export const Default: Story = {
  render: Template,
  args: {
    isDisabled: false,
  },
};

export const ComponentTrigger: Story = {
  render: Template,
  args: {
    children: <Button>Trigger element</Button>,
  },
  parameters: { controls: { exclude: ['children'] } },
};

export const Large: Story = {
  render: Template,
  args: {
    size: 'large',
    content: faker.lorem.paragraphs(3),
  },
};

export const Empty: Story = {
  render: Template,
  args: {
    content: '',
  },
};

export const WithDropdown: StoryObj<typeof Tooltip> = {
  render: ({ content, ...args }: TooltipProps) => (
    <>
      <Tooltip {...args} content={content} placement="bottom">
        <Text>Trigger tooltip</Text>
      </Tooltip>
      <Tooltip content="More settings" placement="bottom">
        <Dropdown
          content={
            <Dropdown.Content>
              <Dropdown.Button>some text</Dropdown.Button>
              <Dropdown.Button>some text</Dropdown.Button>
            </Dropdown.Content>
          }
          offset={8}
          placement="bottom-end"
          triggerOn="click"
        >
          <ButtonIcon
            icon="OverflowMenuHorizontal"
            type="neutral"
            variant="ghosted"
          />
        </Dropdown>
      </Tooltip>
    </>
  ),
};
