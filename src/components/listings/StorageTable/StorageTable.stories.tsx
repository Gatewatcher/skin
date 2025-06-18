import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import type { StorageTableProps } from '.';
import { StorageTable } from '.';

type DetailedColumnKey = 'my_usage' | 'other_usage';

const DEFAULT_STORAGE: StorageTableProps<DetailedColumnKey>['storageUsage'] = [
  { label: 'RAG', size: 10_000, details: [{ key: 'my_usage', size: 7_500 }] },
  {
    label: 'Swagger',
    size: 25_000,
    details: [
      { key: 'my_usage', size: 10_000 },
      { key: 'other_usage', size: 15_000 },
    ],
  },
  {
    label: 'Telemetry',
    size: 17_000,
    details: [
      { key: 'my_usage', size: 7_000 },
      { key: 'other_usage', size: 5_000 },
    ],
  },
  { label: 'Structured Data', size: 32_000 },
  { label: 'Batches', size: 16_000 },
];

type Story<T extends string = DetailedColumnKey> = StoryObj<
  typeof StorageTable<T>
>;

export default {
  title: 'Listings/StorageTable',
  component: StorageTable,
  args: {
    storageUsage: DEFAULT_STORAGE,
    totalSize: 100_000,
  },
  decorators: [withRouter],
} as Meta<StorageTableProps<DetailedColumnKey>>;

export const Default: Story = {};

export const WithCustomColumns: Story = {
  render: args => {
    return (
      <StorageTable
        {...args}
        detailedColumns={[
          { key: 'my_usage', header: 'My usage' },
          { key: 'other_usage', header: 'Other usage' },
        ]}
      />
    );
  },
};
