import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { Grid } from '@/skin/layout';
import { Text } from '@/skin/typography';

import { DEFAULT_VALUE_FALLBACK } from './constants';

export type ObjectGridProps = DataTestId & {
  data: Record<string, { [key: string]: ReactNode }>;
  fallback?: ReactNode;
};

const ObjectGrid = ({
  'data-testid': testId = 'object-grid',
  data,
  fallback = DEFAULT_VALUE_FALLBACK,
}: ObjectGridProps) => {
  const rowHeaders = Object.keys(data);
  const colHeadersSet = new Set<string>();

  Object.values(data).forEach(obj => {
    Object.keys(obj).forEach(key => colHeadersSet.add(key));
  });

  const colHeaders = Array.from(colHeadersSet);

  return (
    <Grid columns={colHeaders.length + 1} data-testid={testId} isContainer>
      <div>&nbsp;</div>
      {colHeaders.map(colKey => (
        <Text key={colKey} weight="medium">
          {colKey}
        </Text>
      ))}
      {rowHeaders.map(rowKey => (
        <Fragment key={rowKey}>
          <Grid isItem>
            <Text weight="medium">{rowKey}</Text>
          </Grid>
          {colHeaders.map(colKey => (
            <Text key={`${rowKey}-${colKey}`}>
              {data[rowKey][colKey] ?? fallback}
            </Text>
          ))}
        </Fragment>
      ))}
    </Grid>
  );
};

export default ObjectGrid;
