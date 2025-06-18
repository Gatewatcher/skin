import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { User } from '@/mocks/types';
import { Card, KeyValueDisplay } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import type { LoadMoreParams } from '@/skin/pagination';
import { usePagination } from '@/skin/pagination';
import { Text } from '@/skin/typography';

import type { SwitchListingProps } from '.';
import SwitchListing from '.';
import type { OnBatchSelectParams } from '../Listing/compounds/BatchSelect/types';
import Table from '../Table';

faker.seed(10);

const generateData = (count = 100): User[] =>
  range({ stop: count }).map((_, id) => {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();

    return {
      id,
      firstname,
      lastname,
      avatar: faker.internet.avatar(),
      age: faker.number.int({ min: 1, max: 99 }),
      email: faker.internet.email({ firstName: firstname, lastName: lastname }),
    };
  });

type Story = StoryObj<typeof SwitchListing<User>>;

export default {
  title: 'listings/SwitchListing',
  component: SwitchListing,
} as Meta<typeof SwitchListing<User>>;

const Template: StoryFn<typeof SwitchListing<User>> = ({
  data,
  tableProps,
  ...args
}: SwitchListingProps<User>) => {
  const [loadMoreParams, setLoadMoreParams] = useState<LoadMoreParams>();
  const [batchParams, setBatchParams] = useState<OnBatchSelectParams>();
  const slicedData = usePagination(data as User[], loadMoreParams);

  return (
    <SwitchListing.Provider>
      <Stack direction="column" gap={8}>
        <Stack justifyContent="space-between">
          <SwitchListing.Actions />
          {batchParams?.hasSelection && (
            <Text>{batchParams.itemsCount} item(s) selected</Text>
          )}
        </Stack>
        <SwitchListing
          {...args}
          tableProps={{
            ...tableProps,
            onBatchSelect: setBatchParams,
            persistenceKey: 'table',
          }}
          data={slicedData}
          onParamsChange={setLoadMoreParams}
          onReady={setLoadMoreParams}
        />
      </Stack>
    </SwitchListing.Provider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    data: generateData(100),
    totalItemsCount: 100,
    initialPerPage: 10,
    tableProps: {
      persistenceKey: 'table',
      headers: (
        <Table.Headers>
          <Table.HeaderSelectCell />
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Firstname</Table.HeaderCell>
          <Table.HeaderCell>Lastname</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Age</Table.HeaderCell>
        </Table.Headers>
      ),
    },
    listProps: {
      columnsMinSize: '400px',
    },
    renderTableRow: data => (
      <Table.Row key={data.id} id={data.id}>
        <Table.SelectCell id={data.id} />
        <Table.Cell>{data.id}</Table.Cell>
        <Table.Cell>{data.firstname}</Table.Cell>
        <Table.Cell>{data.lastname}</Table.Cell>
        <Table.Cell>{data.email}</Table.Cell>
        <Table.Cell>{data.age}</Table.Cell>
      </Table.Row>
    ),
    renderListItem: data => (
      <Card key={data.id}>
        <Card.Header>
          <Card.Title>
            <Stack alignItems="center" gap={4}>
              <div
                style={{
                  height: 24,
                  width: 24,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  flexShrink: 0,
                }}
              />
              <span>
                {data.firstname} {data.lastname}
              </span>
            </Stack>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <KeyValueDisplay
            data={[
              { label: 'Email', value: data.email },
              { label: 'Age', value: data.age },
              { label: 'Id', value: data.id },
            ]}
          />
        </Card.Body>
      </Card>
    ),
  },
};
