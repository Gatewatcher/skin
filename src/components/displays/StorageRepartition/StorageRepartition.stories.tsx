import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { StorageRepartitionProps } from '.';
import StorageRepartition from '.';

type Story = StoryObj<typeof StorageRepartition>;

const DEFAULT_STORAGE: StorageRepartitionProps['storageUsage'] = [
  { label: 'RAG', size: 10_000 },
  { label: 'Swagger', size: 25_000 },
  { label: 'Telemetry', size: 17_000 },
  { label: 'Structured Data', size: 32_000 },
  { label: 'Batches', size: 16_000 },
];

export default {
  title: 'displays/StorageRepartition',
  component: StorageRepartition,
  args: {
    storageUsage: DEFAULT_STORAGE,
    totalSize: 100_000,
    withViewDetails: false,
    onViewDetailsClick: () => null,
  },
} as Meta<typeof StorageRepartition>;

const Template: StoryFn<typeof StorageRepartition> = (
  args: StorageRepartitionProps,
) => <StorageRepartition {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    storageUsage: DEFAULT_STORAGE.slice(0, 3),
  },
};

export const Full: Story = {
  render: Template,
};
