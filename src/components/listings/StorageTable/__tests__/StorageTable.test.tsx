import { screen } from '@testing-library/react';

import { renderWithThemeProvider } from '@/tests';

import type { StorageTableProps } from '..';
import { StorageTable } from '..';

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

describe('StorageTable', () => {
  const renderComponent = (props: StorageTableProps<DetailedColumnKey>) =>
    renderWithThemeProvider(<StorageTable {...props} />);

  const getStorageRepartition = () => screen.getByTestId('storage-table');

  it('should render', async () => {
    renderComponent({
      storageUsage: DEFAULT_STORAGE,
      totalSize: 10000,
      detailedColumns: [
        { key: 'my_usage', header: 'My usage' },
        { key: 'other_usage', header: 'Other usage' },
      ],
    });
    expect(getStorageRepartition()).toBeVisible();
  });
});
