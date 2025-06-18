import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { User } from '@/mocks/types';
import { FloatingActions } from '@/skin/actions';
import { OverflownText, Text } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import type { EllipsisDataModalProps } from '.';
import EllipsisDataModal from '.';
import AvatarUsername from '../../AvatarUsername';
import type { EllipsedDataProps } from '../EllipsedData';
import { ExampleFloatingActions } from '../EllipsedData/examples/ExampleFloatingActions';
import {
  DEFAULT_COUNT_POSITION,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
  ELLIPSED_DATA_COUNT_POSITIONS,
  ELLIPSED_DATA_DIRECTIONS,
} from '../EllipsisDataBase/constants';

type Story = StoryObj<typeof EllipsisDataModal<User>>;

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
  title: 'displays/ellipsis/EllipsisDataModal',
  component: EllipsisDataModal,
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
  args: {
    children: item => (
      <AvatarUsername key={item.id} username={item.firstname} />
    ),
    data: createData(),
    limit: DEFAULT_LIMIT,
    direction: DEFAULT_DIRECTION,
    countPosition: DEFAULT_COUNT_POSITION,
  },
} as Meta<typeof EllipsisDataModal<User>>;

const Template: StoryFn<typeof EllipsisDataModal<User>> = (
  args: EllipsisDataModalProps<User>,
) => <EllipsisDataModal {...args} />;

export const Default: Story = {
  render: Template,
};

export const Inline: Story = {
  render: Template,
  args: {
    direction: 'row',
    ellipsis: {
      direction: 'column',
    },
  },
};

export const WithText: Story = {
  render: Template,
  args: {
    children: item => (
      <Text key={item.id}>{`${item.firstname} ${item.lastname}`}</Text>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    modal: {
      title: 'Users',
    },
  },
};

export const WithFloatingActions: StoryObj<typeof EllipsisDataModal<string>> = {
  args: {
    data: range({ stop: 5 }).map(() => faker.lorem.text()),
    children: item => (
      <ExampleFloatingActions
        key={item}
        header={<FloatingActions.Header>{item}</FloatingActions.Header>}
      >
        <OverflownText isDisabled>{item}</OverflownText>
      </ExampleFloatingActions>
    ),
    ellipsis: {
      children: item => (
        <ExampleFloatingActions key={item}>
          <Text>{item}</Text>
        </ExampleFloatingActions>
      ),
    },
  },
  decorators: [
    Story => (
      <div style={{ width: 200, whiteSpace: 'nowrap' }}>
        <Story />
      </div>
    ),
  ],
};
