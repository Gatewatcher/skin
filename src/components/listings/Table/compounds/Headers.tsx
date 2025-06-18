import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import { useListingSortsContext } from '../../Listing/context';
import { DEFAULT_WITH_STICKY_HEADERS } from '../constants';

import styles from '../styles.module.scss';

export type TableHeadersProps = DataTestId & {
  children: ReactNode;
  isMultipleSorting?: boolean;
  withStickyPosition?: boolean;
};

const TableHeaders = ({
  children,
  'data-testid': testId = 'table-headers',
  isMultipleSorting = false,
  withStickyPosition = DEFAULT_WITH_STICKY_HEADERS,
}: TableHeadersProps) => {
  const { isMultiple } = useListingSortsContext();
  isMultiple.current = isMultipleSorting;

  const ref = useRef<HTMLTableSectionElement>(null);

  return (
    <thead
      ref={ref}
      className={classNames(
        styles.Headers,
        withStickyPosition && styles.HeadersSticky,
      )}
      data-testid={testId}
    >
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHeaders;
