import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button } from '@/skin/actions';
import { Text } from '@/skin/typography';
import { addInlineRadio, addSelect } from '@/storybook';

import type { PopoverProps } from '.';
import Popover from '.';
import {
  DEFAULT_SIZE,
  DEFAULT_VALUES,
  DURATIONS,
  PLACEMENTS,
  SIZES,
} from '../Floating/constants';
import type { FloatingContextType } from '../Floating/context';

faker.seed(10);

type Story = StoryObj<typeof Popover>;

export default {
  title: 'displays/floating/Popover',
  component: Popover,
  args: {
    content: <Text>Popover content</Text>,
    children: <Button>Trigger Element</Button>,
    size: DEFAULT_SIZE,
    ...DEFAULT_VALUES,
  },
  argTypes: {
    ...addSelect<PopoverProps>('placement', PLACEMENTS),
    ...addInlineRadio<PopoverProps>('size', SIZES),
    ...addInlineRadio<PopoverProps>('duration', DURATIONS),
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
} as Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = ({
  children,
  ...args
}: PopoverProps) => <Popover {...args}>{children}</Popover>;

export const Default: Story = {
  render: Template,
  args: {
    isDisabled: false,
  },
};

export const ContentAsFunction: Story = {
  render: Template,

  args: {
    content: ({ opened, close }: FloatingContextType) => (
      <div>
        <Text>Popover : {opened ? 'opened' : 'not opened'}</Text>
        <Button onClick={close} size="small">
          Close
        </Button>
      </div>
    ),
  },
  parameters: { controls: { exclude: ['content'] } },
};

export const Large: Story = {
  render: Template,
  args: {
    size: 'large',
    content: faker.lorem.paragraphs(3),
  },
};

export const Compounds: Story = {
  render: Template,
  args: {
    content: (
      <>
        <Popover.Header>
          <Popover.Title>Title</Popover.Title>
        </Popover.Header>
        <Popover.Body>{faker.lorem.paragraph(3)}</Popover.Body>
      </>
    ),
  },
};

export const WithTooManyItems: Story = {
  render: Template,
  args: {
    content: faker.lorem.paragraphs(100),
  },
};
