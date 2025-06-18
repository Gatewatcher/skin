import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { User } from '@/mocks/types';
import { addInlineRadio } from '@/storybook';

import type { EllipsisDataPopoverProps } from '.';
import EllipsisDataPopover from '.';
import AvatarUsername from '../../AvatarUsername';
import type { EllipsedDataProps } from '../EllipsedData';
import {
  DEFAULT_COUNT_POSITION,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
  ELLIPSED_DATA_COUNT_POSITIONS,
  ELLIPSED_DATA_DIRECTIONS,
} from '../EllipsisDataBase/constants';

type Story = StoryObj<typeof EllipsisDataPopover<User>>;

faker.seed(10);

const createData = (count = 6): User[] =>
  range({ stop: count }).map(id => ({
    age: faker.number.int(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    firstname: faker.person.firstName(),
    id,
    lastname: faker.person.lastName(),
  }));

export default {
  title: 'displays/ellipsis/EllipsisDataPopover',
  component: EllipsisDataPopover,
  args: {
    children: item => (
      <AvatarUsername key={item.id} username={item.firstname} />
    ),
    data: createData(),
    limit: DEFAULT_LIMIT,
    direction: DEFAULT_DIRECTION,
    countPosition: DEFAULT_COUNT_POSITION,
  },
  argTypes: {
    ...addInlineRadio<EllipsedDataProps<unknown>>(
      'direction',
      ELLIPSED_DATA_DIRECTIONS,
    ),
    ...addInlineRadio<EllipsedDataProps<unknown>>(
      'countPosition',
      ELLIPSED_DATA_COUNT_POSITIONS,
    ),
  },
} as Meta<typeof EllipsisDataPopover<User>>;

const Template: StoryFn<typeof EllipsisDataPopover<User>> = (
  args: EllipsisDataPopoverProps<User>,
) => <EllipsisDataPopover {...args} />;

export const Default: Story = {
  render: Template,
};

export const WithBadge: Story = {
  render: Template,
  args: {
    moreText: count => <EllipsisDataPopover.BadgeCount count={count} />,
  },
};

export const CustomEllipsis: Story = {
  render: Template,
  args: {
    ellipsis: () => <div>ok</div>,
  },
};

export const ChildrenAsNode: Story = {
  render: Template,
  args: {
    children: 'item',
    ellipsis: {
      children: item => (
        <AvatarUsername key={item.id} username={item.firstname} />
      ),
      direction: 'column',
    },
  },
};
