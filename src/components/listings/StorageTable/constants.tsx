import { formatNumber } from '@gatewatcher/bistoury/utils-lang';

import type { StorageRow } from '@/skin/listings/StorageTable/types';
import { Text } from '@/skin/typography';

import Table from '../Table';

export const DEFAULT_RENDER_FUNCTION =
  <T extends string>(key: T) =>
  (row: StorageRow<T>) => {
    const detail = row.details?.find(detail => detail.key === key);

    if (!detail) {
      return (
        <Table.Cell>
          <Text>-</Text>
        </Table.Cell>
      );
    }

    return (
      <Table.Cell>
        <Text size="small">
          {formatNumber(detail.size, {
            unit: 'B',
          })}
        </Text>
      </Table.Cell>
    );
  };
