import type { ReactElement, ReactNode } from 'react';
import { useMemo } from 'react';

import { Stack } from '@/skin/layout';
import type { TableRowsProps } from '@/skin/listings';
import { List } from '@/skin/listings';

import { EmptyElement, FirstLoader } from '../components/list';
import type { FinderPanelContextType } from '../contexts';
import { FinderPanelContext, useFinderPanelsContext } from '../contexts';
import type { ItemBase } from '../types';
import type { FinderPanelItemAllProps } from './PanelItemAll';
import type { FinderPanelNameProps } from './PanelName';

import styles from '../styles.module.scss';

export type FinderPanelProps<T extends ItemBase> = TableRowsProps<T> & {
  allItem?: ReactElement<FinderPanelItemAllProps>;
  disabled?: boolean;
  disabledPlaceholder?: ReactNode;
  name: ReactElement<FinderPanelNameProps>;
};

const Panel = <T extends ItemBase>({
  allItem,
  'data-testid': testId = 'finder-panel',
  data,
  disabled,
  disabledPlaceholder,
  name,
  emptyMessage = 'No data',
  ...rest
}: FinderPanelProps<T>) => {
  const contextValue = useMemo<FinderPanelContextType>(
    () => ({ name: name.props.children }),
    [name],
  );

  const { maxHeight } = useFinderPanelsContext();

  return (
    <FinderPanelContext.Provider value={contextValue}>
      <Stack data-testid={testId} direction="column" gap={5}>
        {name}
        {!disabled ? (
          <Stack
            className={styles.PanelsListContainer}
            direction="column"
            flexGrow={1}
            style={{ maxHeight }}
          >
            {data && data.length > 1 && (
              <Stack.Item margin={{ bottom: 2 }}>{allItem}</Stack.Item>
            )}
            <List<T>
              data={data}
              emptyElement={<EmptyElement>{emptyMessage}</EmptyElement>}
              firstLoader={<FirstLoader />}
              gap={2}
              {...rest}
              withControls={false}
            />
          </Stack>
        ) : (
          disabledPlaceholder
        )}
      </Stack>
    </FinderPanelContext.Provider>
  );
};

export default Panel;
