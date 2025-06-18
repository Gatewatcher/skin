import { formatNumber } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { LinearProgress } from '@/skin/feedback';

import Table from '../Table';
import { StorageType } from './compounds/StorageType';
import { DEFAULT_RENDER_FUNCTION } from './constants';
import type { StorageRow } from './types';

export type StorageTableProps<T extends string = string> = DataTestId & {
  storageUsage: StorageRow<T>[];
  detailedColumns?: {
    header: string;
    key: T;
    render?: (row: StorageRow<T>) => ReactNode;
  }[];
  totalSize: number;
};

export const StorageTable = <T extends string>({
  storageUsage,
  detailedColumns = [],
  totalSize,
  'data-testid': testId = 'storage-table',
}: StorageTableProps<T>) => {
  return (
    <Table
      columns={[
        {
          header: 'Type',
          key: 'type',
          render: row => <StorageType index={row.index} label={row.label} />,
        },
        ...detailedColumns.map(col => ({
          ...col,
          render: col.render ?? DEFAULT_RENDER_FUNCTION(col.key),
        })),
        {
          header: 'Consumption',
          key: 'consumption',
          render: row => (
            <Table.Cell>
              <LinearProgress
                endLabel={formatNumber(row.size, { unit: 'B' })}
                percentage={(row.size * 100) / totalSize}
                isInline
              />
            </Table.Cell>
          ),
        },
      ]}
      data={storageUsage.map((row, index) => ({ ...row, index }))}
      data-testid={testId}
    />
  );
};
