import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { Diff } from '@gatewatcher/bistoury/utils-types';

import LoadMore from '@/skin/pagination/LoadMore';

import type { ListProps } from '../List';
import { ListContent } from '../List';
import ListingBatchSelect from '../Listing/compounds/BatchSelect/BatchSelect';
import ListingEdition from '../Listing/compounds/Edition';
import ListingSort from '../Listing/compounds/Sort';
import type { RenderItem, TableDataItem } from '../Listing/types';
import type { TableProps } from '../Table';
import { TableContent } from '../Table';
import SwitchListingActions from './compounds/Actions';
import SwitchListingProvider from './compounds/Provider';
import { useSwitchListingContext } from './context';
import type { SwitchListingView } from './types';

export type SwitchListingProps<T extends TableDataItem> = Omit<
  TableProps<T> | ListProps<T>,
  'children' | 'columns' | 'persistenceKey'
> & {
  listProps?: Diff<ListProps<T>, TableProps<T>>;
  onSwitch?: (view: SwitchListingView) => void;
  persistenceKey?: string;
  renderListItem: RenderItem<T>;
  renderTableRow: RenderItem<T>;
  tableProps?: Omit<
    Diff<TableProps<T>, ListProps<T>>,
    'onRowClick' | 'onRowDoubleClick'
  >;
};

const SwitchListing = <T extends TableDataItem>({
  'data-testid': testId = 'switch-listing',
  loadMoreOptions,
  loadMoreType,
  listProps,
  renderListItem,
  renderTableRow,
  onSort,
  onSwitch,
  tableProps,
  ...rest
}: SwitchListingProps<T>) => {
  const { currentView } = useSwitchListingContext();

  useDidMountEffect(() => {
    onSwitch?.(currentView);
  }, [currentView]);

  return (
    <ListingBatchSelect onBatchSelect={tableProps?.onBatchSelect}>
      <ListingEdition>
        <ListingSort onSort={onSort}>
          <LoadMore options={loadMoreOptions} type={loadMoreType} {...rest}>
            {currentView === 'list' ? (
              <ListContent
                data-testid={suffixTestId(testId, 'list')}
                {...listProps}
                {...rest}
              >
                {renderListItem}
              </ListContent>
            ) : (
              <TableContent
                data-testid={suffixTestId(testId, 'table')}
                {...tableProps}
                {...rest}
              >
                {renderTableRow}
              </TableContent>
            )}
          </LoadMore>
        </ListingSort>
      </ListingEdition>
    </ListingBatchSelect>
  );
};

SwitchListing.Actions = SwitchListingActions;
SwitchListing.Provider = SwitchListingProvider;

export default SwitchListing;
