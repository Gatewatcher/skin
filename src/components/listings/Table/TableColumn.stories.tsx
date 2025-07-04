import { faker } from '@faker-js/faker';
import { useToggle } from '@gatewatcher/bistoury/hooks';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import type { User } from '@/mocks/types';
import { Button } from '@/skin/actions';
import { Avatar } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { DEFAULT_ITEMS_PER_PAGE_OPTIONS } from '@/skin/pagination/ItemsPerPage/constants';
import {
  DEFAULT_INITIAL_PER_PAGE,
  DEFAULT_LOAD_MORE_TYPE,
  LOAD_MORE_TYPES,
} from '@/skin/pagination/LoadMore/constants';
import { addInlineRadio } from '@/storybook';

import type { TableColumnsProps, TableProps } from '.';
import Table from '.';
import {
  DEFAULT_PLACEHOLDER_SIZE,
  PLACEHOLDER_SIZES,
} from '../Listing/constants';
import type { TableDataItem } from '../Listing/types';
import { DEFAULT_LAYOUT, DEFAULT_VARIANT, LAYOUTS } from './constants';

faker.seed(10);

function generateUsers<User>(count = 100): User[] {
  return range({ stop: count }).map(nb => ({
    id: nb,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 1, max: 99 }),
  })) as User[];
}

type Story<T extends TableDataItem = User> = StoryObj<TableColumnsProps<T>>;

export default {
  title: 'Listings/TableColumn',
  component: Table,
  args: {
    onParamsChange: undefined,
    data: generateUsers(10),
    columns: [
      { header: 'Id', key: 'id' },
      { header: 'Firstname', key: 'firstname' },
    ],
    emptyMessage: 'EMPTY DATA',
    perPage: DEFAULT_INITIAL_PER_PAGE,
    loadMoreType: DEFAULT_LOAD_MORE_TYPE,
    error: 'some error message',
    layout: DEFAULT_LAYOUT,
    variant: DEFAULT_VARIANT,
    placeholderSize: DEFAULT_PLACEHOLDER_SIZE,
    onReady: () => {},
  },
  argTypes: {
    ...addInlineRadio<TableProps<TableDataItem>>(
      'loadMoreType',
      LOAD_MORE_TYPES,
    ),
    ...addInlineRadio<TableProps<TableDataItem>>('layout', LAYOUTS),
    ...addInlineRadio<TableProps<TableDataItem>>(
      'placeholderSize',
      PLACEHOLDER_SIZES,
    ),
    ...addInlineRadio<TableProps<TableDataItem>>(
      'initialPerPage',
      DEFAULT_ITEMS_PER_PAGE_OPTIONS,
    ),
  },
  parameters: {
    controls: {
      exclude: /^initial/,
    },
  },
  decorators: [withRouter],
} as Meta<TableColumnsProps<User>>;

export const Default: Story = {};

export const Complex: Story = {
  render: args => {
    const [avatarEnabled, toggleAvatarEnabled] = useToggle(false);

    return (
      <Stack direction="column" gap={4}>
        <Button onClick={toggleAvatarEnabled}>
          {avatarEnabled ? 'Hide avatar' : 'Show avatar'}
        </Button>

        <Table
          {...args}
          columns={[
            {
              key: 'avatar',
              header: 'Avatar',
              render: user => (
                <Table.Cell>
                  <Avatar username={`${user.firstname} ${user.lastname}`} />
                </Table.Cell>
              ),
              hidden: !avatarEnabled,
            },
            { key: 'id', header: 'Id' },
            {
              key: 'firstname',
              header: () => (
                <Table.HeaderCell key="firstname">Firstname</Table.HeaderCell>
              ),
            },
            { key: 'lastname', header: 'Lastname' },
            { key: 'age', header: 'Age' },
          ]}
        />
      </Stack>
    );
  },
};
