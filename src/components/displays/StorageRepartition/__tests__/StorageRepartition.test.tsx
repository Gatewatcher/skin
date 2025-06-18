import { screen } from '@testing-library/react';

import { renderWithThemeProvider } from '@/tests';

import type { StorageRepartitionProps } from '..';
import StorageRepartition from '..';

describe('StorageRepartition', () => {
  const renderComponent = (props: StorageRepartitionProps) =>
    renderWithThemeProvider(<StorageRepartition {...props} />);

  const getStorageRepartition = () => screen.getByTestId('storage-repartition');

  it('should render', async () => {
    renderComponent({ storageUsage: [], totalSize: 10000 });
    expect(getStorageRepartition()).toBeVisible();
  });
});
