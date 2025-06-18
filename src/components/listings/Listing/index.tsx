import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import { cloneElement } from 'react';

import { useLoadMoreContext } from '@/skin/pagination/LoadMore/context';

import ListingEmptyElement from './compounds/EmptyElement';
import ListingErrorElement from './compounds/ErrorElement';
import FirstLoader from './compounds/FirstLoader';
import { DEFAULT_PLACEHOLDER_SIZE } from './constants';
import type { DataItem, PlaceholderSizeProps, RenderItem } from './types';

export type ListingInternalProps = {
  className?: string;
  endElement?: ReactNode;
  renderRoot: (
    children: ReactNode,
    args: Record<string, unknown>,
  ) => ReactElement;
  renderRowComponent: (children: ReactNode) => ReactElement;
  startElement?: ReactNode;
};

export type ListingProps<T extends DataItem> = DataTestId &
  Partial<PlaceholderSizeProps> & {
    children: RenderItem<T>;
    emptyElement?: ReactNode | null;
    emptyMessage?: string;
    errorElement?: ReactNode;
    firstLoader?: ReactNode;
  };

const Listing = <T extends DataItem>({
  children,
  className,
  'data-testid': testId = 'listing',
  endElement,
  emptyMessage,
  emptyElement,
  errorElement,
  placeholderSize = DEFAULT_PLACEHOLDER_SIZE,
  renderRoot,
  renderRowComponent,
  startElement,
  firstLoader = <FirstLoader placeholderSize={placeholderSize} />,
  ...rest
}: ListingProps<T> & ListingInternalProps) => {
  const { data, error, isError, isLoading, firstLoadingDone, previousData } =
    useLoadMoreContext();

  const isFirstLoading = isLoading && !firstLoadingDone;
  const isEmpty = !isFirstLoading && !data?.length;

  let rows;

  if (isFirstLoading) {
    rows = renderRowComponent(firstLoader);
  } else if (isError) {
    rows = renderRowComponent(
      errorElement || (
        <ListingErrorElement error={error} placeholderSize={placeholderSize} />
      ),
    );
  } else if (isLoading && !!previousData?.length) {
    rows = previousData.map((item, index) => children(item, { index }));
  } else if (isEmpty) {
    rows = renderRowComponent(
      emptyElement !== undefined ? (
        emptyElement
      ) : (
        <ListingEmptyElement
          message={emptyMessage}
          placeholderSize={placeholderSize}
        />
      ),
    );
  } else {
    rows = data?.map((item, index) => children(item, { index }));

    if (!rows) {
      return null;
    }
  }

  return (
    <>
      {!isFirstLoading && startElement}
      {cloneElement(renderRoot(rows, rest), {
        className,
        'data-testid': testId,
      })}
      {!isFirstLoading && endElement}
    </>
  );
};

export default Listing;
