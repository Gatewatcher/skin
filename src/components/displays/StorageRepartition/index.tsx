import { formatNumber } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useMemo } from 'react';

import { Stack } from '@/skin/layout';
import { Text, Title } from '@/skin/typography';

import { StorageBar } from './compounds/StorageBar';
import type { StorageUsage } from './types';

export type StorageRepartitionProps = DataTestId & {
  totalSize: number;
  storageUsage: StorageUsage[];
  onViewDetailsClick?: () => void;
  withViewDetails?: boolean;
};

const StorageRepartition = ({
  'data-testid': testId = 'storage-repartition',
  totalSize,
  storageUsage,
  withViewDetails = false,
  onViewDetailsClick,
}: StorageRepartitionProps) => {
  const totalUsed = useMemo(
    () => storageUsage.reduce((acc, { size }) => acc + size, 0),
    [storageUsage],
  );

  return (
    <div data-testid={testId}>
      <Stack alignItems="flex-end" justifyContent="space-between">
        <Stack alignItems="flex-end" gap={2}>
          <Title>{formatNumber(totalUsed, { unit: 'B' })}</Title>
          <Text>used of {formatNumber(totalSize, { unit: 'B' })}</Text>
        </Stack>
        <Text>{Math.round((totalUsed * 100) / totalSize)}%</Text>
      </Stack>
      <StorageBar
        onViewDetailsClick={onViewDetailsClick}
        storageUsage={storageUsage}
        totalSize={totalSize}
        totalUsed={totalUsed}
        withViewDetails={withViewDetails}
      />
    </div>
  );
};

export default StorageRepartition;
