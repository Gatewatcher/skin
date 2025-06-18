import { classNames } from '@gatewatcher/bistoury/utils-dom';

import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import Table from '../../Table';

import styles from '../styles.module.scss';

type StorageTypeProps = {
  label: string;
  index: number;
};

export const StorageType = ({ label, index }: StorageTypeProps) => {
  return (
    <Table.Cell>
      <Stack alignItems="center" gap={6}>
        <div
          className={classNames(
            styles.StorageIcon,
            styles[`StorageIcon-${index}`],
          )}
        />
        <Text size="small">{label}</Text>
      </Stack>
    </Table.Cell>
  );
};
