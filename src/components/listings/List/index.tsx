import { type ReactNode } from 'react';

import { Grid } from '@/skin/layout';
import type { ContainerProps as GridContainerProps } from '@/skin/layout/Grid/types';
import type { LoadMoreProps } from '@/skin/pagination/LoadMore';
import LoadMore from '@/skin/pagination/LoadMore';
import { useLoadMoreContext } from '@/skin/pagination/LoadMore/context';

import type { ListingProps } from '../Listing';
import Listing from '../Listing';
import type { ListingSortProps } from '../Listing/compounds/Sort';
import ListingSort from '../Listing/compounds/Sort';
import type { DataItem, ListingLoadMoreProps } from '../Listing/types';
import ListItem from './compounds/Item';
import { DEFAULT_GAP } from './constants';

import styles from './styles.module.scss';

export type ListProps<T extends DataItem> = LoadMoreProps<T> &
  ListingProps<T> &
  ListingLoadMoreProps &
  Pick<ListingSortProps, 'onSort'> &
  Omit<GridContainerProps, 'isContainer' | 'isItem' | 'as'>;

type BaseComponentProps = {
  children: ReactNode;
};

const RowComponent = ({ children, ...rest }: BaseComponentProps) => (
  <Grid {...rest} as="li" isItem>
    {children}
  </Grid>
);

type RootComponentProps = { children: ReactNode } & Partial<GridContainerProps>;

const RootComponent = ({ children, ...rest }: RootComponentProps) => {
  return (
    <Grid {...rest} as="ul" isContainer>
      {children}
    </Grid>
  );
};

export const ListContent = <T extends DataItem>({
  'data-testid': testId = 'list',
  data,
  gap = DEFAULT_GAP,
  isLoading,
  repeatAuto,
  ...rest
}: ListProps<T>) => {
  const { firstLoadingDone } = useLoadMoreContext();

  const getRepeatAutoValue = () => {
    if (!data?.length) return 'fit';
    if (isLoading && !firstLoadingDone) return 'fit';
    if (isLoading) return 'fill';

    return repeatAuto;
  };

  return (
    <Listing
      {...rest}
      renderRoot={(children, args) => (
        <RootComponent gap={gap} repeatAuto={getRepeatAutoValue()} {...args}>
          {children}
        </RootComponent>
      )}
      className={styles.List}
      data-testid={testId}
      renderRowComponent={children => <RowComponent>{children}</RowComponent>}
    />
  );
};

const List = <T extends DataItem>({
  loadMoreOptions,
  loadMoreType,
  onSort,
  ...rest
}: ListProps<T>) => {
  return (
    <ListingSort onSort={onSort}>
      <LoadMore options={loadMoreOptions} type={loadMoreType} {...rest}>
        <ListContent
          loadMoreOptions={loadMoreOptions}
          loadMoreType={loadMoreType}
          {...rest}
        />
      </LoadMore>
    </ListingSort>
  );
};

List.Item = ListItem;

export default List;
