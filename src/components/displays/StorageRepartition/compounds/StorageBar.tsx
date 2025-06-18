import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { formatNumber } from '@gatewatcher/bistoury/utils-lang';

import { Button } from '@/skin/actions';
import { Popover } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text, Title } from '@/skin/typography';

import type { StorageUsage } from '../types';

import styles from '../styles.module.scss';

type StorageBarProps = {
  storageUsage: StorageUsage[];
  totalSize: number;
  totalUsed: number;
  onViewDetailsClick?: () => void;
  withViewDetails: boolean;
};

type StoragePopoverContentProps = {
  label: string;
  size: number;
  description?: string;
};

export const StoragePopoverContent = ({
  label,
  description,
  size,
}: StoragePopoverContentProps) => {
  return (
    <Stack direction="column">
      <Text color="grey" size="small" transform="uppercase" weight="semibold">
        {label}
      </Text>
      <Title as="h3">{formatNumber(size, { unit: 'B' })}</Title>
      <Text size="small">{description}</Text>
    </Stack>
  );
};

export const StorageBar = ({
  storageUsage,
  totalSize,
  totalUsed,
  onViewDetailsClick,
  withViewDetails,
}: StorageBarProps) => {
  return (
    <Stack direction="column">
      <Stack alignItems="center" margin={{ y: 4 }}>
        {storageUsage.map((data, index) => (
          <Stack.Item
            key={`storage-bar-${index}`}
            className={styles.StorageBarContainer}
            flexBasis={`${Math.round((data.size * 100) / totalSize)}%`}
          >
            <Popover
              triggerClassName={classNames(
                styles.StorageBar,
                styles[`StorageBar-${index}`],
              )}
              content={<StoragePopoverContent {...data} />}
              triggerOn="hover"
            >
              <div />
            </Popover>
          </Stack.Item>
        ))}
        <Stack.Item
          key="available-bar"
          flexBasis={`${Math.round(
            ((totalSize - totalUsed) * 100) / totalSize,
          )}%`}
          className={styles.StorageBarContainer}
        >
          <Popover
            content={
              <StoragePopoverContent
                description="Available space"
                label="Available"
                size={totalSize - totalUsed}
              />
            }
            triggerClassName={classNames(
              styles.StorageBar,
              styles.StorageBarAvailable,
            )}
            triggerOn="hover"
          >
            <div />
          </Popover>
        </Stack.Item>
      </Stack>
      <Stack justifyContent="space-between">
        <Stack alignItems="flex-start" gap={{ y: 10 }} wrap="wrap">
          {storageUsage.map((data, index) => (
            <Stack key={`storage-legend-${index}`} alignItems="center" gap={3}>
              <div
                className={classNames(
                  styles.StorageIcon,
                  styles[`StorageIcon-${index}`],
                )}
              />
              <Text size="extra-small" transform="capitalize">
                {data.label} ({formatNumber(data.size, { unit: 'B' })})
              </Text>
            </Stack>
          ))}
        </Stack>
        {withViewDetails && (
          <Stack>
            <Button onClick={onViewDetailsClick} variant="transparent">
              View details
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
