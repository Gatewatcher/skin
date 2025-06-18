import { isDefined, isString } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Grid, Stack } from '@/skin/layout';
import type { Gap } from '@/skin/layout/Grid/types';
import { Text, Title } from '@/skin/typography';

import KeyValue from '../KeyValue';
import {
  DEFAULT_COLUMNS,
  DEFAULT_VARIANT,
  DEFAULT_WITH_EMPTY_ELEMENTS,
} from './constants';
import type {
  KeyValueArrayPair,
  KeyValueColumns,
  KeyValueEntry,
  KeyValueFormat,
} from './types';

type KeyValueDisplayConditionalProps =
  | {
      emptyElement?: ReactNode;
      withEmptyElements?: true;
    }
  | {
      emptyElement?: never;
      withEmptyElements?: false;
    };

type KeyValueDisplayVariantConditionalProps =
  | {
      variant?: 'grid';
      columns?: KeyValueColumns;
    }
  | {
      variant?: 'list' | 'inline';
      columns?: never;
    };

export type KeyValueDisplayProps = DataTestId &
  KeyValueDisplayConditionalProps &
  KeyValueDisplayVariantConditionalProps & {
    data: KeyValueFormat;
    gap?: Gap;
    title?: ReactNode;
  };

const mapData = (keyValueArray: KeyValueArrayPair[]) => {
  return keyValueArray.map(([label, value]) => ({ label, value }));
};

const normalizeData = (data: KeyValueFormat): KeyValueEntry[] => {
  if (Array.isArray(data)) {
    return data;
  }

  return data instanceof Map
    ? mapData([...data])
    : mapData(Object.entries(data));
};

const KeyValueDisplay = ({
  columns = DEFAULT_COLUMNS,
  emptyElement,
  'data-testid': testId = 'key-value-display',
  data: dataProps,
  gap,
  title,
  variant = DEFAULT_VARIANT,
  withEmptyElements = DEFAULT_WITH_EMPTY_ELEMENTS,
}: KeyValueDisplayProps) => {
  const data = normalizeData(dataProps);
  const normalizedData: KeyValueEntry[] = data.reduce((acc, item) => {
    if (!isDefined(item.value) && !withEmptyElements) {
      return acc;
    }

    if (!isDefined(item.value) && emptyElement) {
      acc.push({ label: item.label, value: emptyElement });
    } else {
      acc.push(item);
    }

    return acc;
  }, [] as KeyValueEntry[]);

  return (
    <Stack data-testid={testId} direction="column" gap={7}>
      {title && <Title as="h3">{title}</Title>}

      {variant === 'grid' ? (
        <Grid
          columns={1}
          data-testid={suffixTestId(testId, variant)}
          gap={gap ?? 2}
          isContainer
        >
          {normalizedData.map(({ label, value }, index) => (
            <Grid key={index} columns={12} isContainer isItem>
              <Grid colSpan={columns.key} isItem>
                {isString(label) ? <Text as="strong">{label}</Text> : label}
              </Grid>
              <Grid colSpan={columns.value} isItem>
                {value}
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack
          data-testid={suffixTestId(testId, variant)}
          direction="column"
          gap={gap ?? (variant === 'inline' ? 2 : 7)}
        >
          {normalizedData.map(({ label, value }, index) => (
            <KeyValue
              key={index}
              label={label}
              value={value}
              variant={variant === 'inline' ? 'row' : 'column'}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default KeyValueDisplay;
