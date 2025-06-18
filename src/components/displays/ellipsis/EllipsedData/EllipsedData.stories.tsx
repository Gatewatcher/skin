import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { User } from '@/mocks/types';
import { Modal, Popover } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { OverflownText, Text } from '@/skin/typography';
import { addInlineRadio } from '@/storybook';

import type { EllipsedDataProps } from '.';
import EllipsedData from '.';
import FloatingActions from '../../../actions/FloatingActions';
import Avatar from '../../Avatar';
import AvatarUsername from '../../AvatarUsername';
import {
  DEFAULT_COUNT_POSITION,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
  DEFAULT_MODAL_PROPS,
  ELLIPSED_DATA_DIRECTIONS,
} from '../EllipsisDataBase/constants';
import { ExampleFloatingActions } from './examples/ExampleFloatingActions';

type Story = StoryObj<typeof EllipsedData<User>>;

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
  title: 'displays/ellipsis/EllipsedData',
  component: EllipsedData,
  argTypes: {
    ...addInlineRadio<EllipsedDataProps<unknown>>(
      'direction',
      ELLIPSED_DATA_DIRECTIONS,
    ),
    ...addInlineRadio<EllipsedDataProps<unknown>>('ellipsisDirection', [
      ...ELLIPSED_DATA_DIRECTIONS,
    ]),
  },
  args: {
    data: createData(),
    containerProps: { gap: 4 },
    limit: DEFAULT_LIMIT,
    direction: DEFAULT_DIRECTION,
    countPosition: DEFAULT_COUNT_POSITION,
    modalProps: DEFAULT_MODAL_PROPS,
  },
} as Meta<typeof EllipsedData<User>>;

const Template: StoryFn<typeof EllipsedData<User>> = ({
  children,
  ...args
}: EllipsedDataProps<User>) => (
  <EllipsedData {...args}>{children}</EllipsedData>
);

export const Default: Story = {
  render: Template,
  args: {
    children: item => (
      <AvatarUsername key={item.id} username={item.firstname} />
    ),
  },
};

export const Inline: Story = {
  render: Template,
  args: {
    direction: 'row',
    children: item => <Avatar key={item.id} username={item.firstname} />,
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

export const WithTooManyItems: Story = {
  render: Template,
  args: {
    data: createData(100),
    children: item => (
      <AvatarUsername key={item.id} username={item.firstname} />
    ),
  },
};

export const WithPopover: Story = {
  render: Template,
  args: {
    data: createData(100),
    ellipsis: ({ children, restData, testId }) => {
      return (
        <Popover
          content={
            <Stack direction="column" gap={4}>
              {restData.map(item => (
                <Stack.Item key={item.id}>
                  <AvatarUsername username={item.firstname} />
                </Stack.Item>
              ))}
            </Stack>
          }
          data-testid={testId}
        >
          {children}
        </Popover>
      );
    },
    children: item => (
      <AvatarUsername key={item.id} username={item.firstname} />
    ),
  },
  parameters: {
    controls: {
      exclude: ['modalProps'],
    },
  },
};

export const WithHeader: Story = {
  args: {
    ellipsis: ({ children, content }) => (
      <Modal
        content={
          <>
            <Modal.Header>
              <Modal.Title>TItle</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
          </>
        }
      >
        {children}
      </Modal>
    ),
    children: item => (
      <AvatarUsername key={item.id} username={item.firstname} />
    ),
  },
};

export const WithModalTitle: Story = {
  render: Template,
  args: {
    data: createData(10),
    ellipsisTitle: 'Users',
    children: item => (
      <AvatarUsername key={item.id} username={item.firstname} />
    ),
  },
};

export const WithFloatingActions: StoryObj<typeof EllipsedData<string>> = {
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
    ellipsisChildren: item => (
      <ExampleFloatingActions key={item}>
        <Text>{item}</Text>
      </ExampleFloatingActions>
    ),
  },
  decorators: [
    Story => (
      <div style={{ width: 200, whiteSpace: 'nowrap' }}>
        <Story />
      </div>
    ),
  ],
};
