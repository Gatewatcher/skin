import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import { DEFAULT_INITIAL_SORT } from '../constants';
import type { ListingSortsContextType } from '../context';
import { ListingSortsContext } from '../context';
import type { SortValue } from '../types';

export type ListingSortProps = DataTestId & {
  children: ReactNode;
  initialSort?: SortValue[];
  onSort?: (currentSort?: SortValue[]) => void;
};

const ListingSort = ({
  children,
  initialSort = DEFAULT_INITIAL_SORT,
  onSort,
}: ListingSortProps) => {
  const [currentSorts, setCurrentSorts] = useState<SortValue[]>(initialSort);
  const initialSorts = useRef(initialSort);
  const isMultiple = useRef(false);

  const contextValue: ListingSortsContextType = {
    currentSorts,
    initialSorts,
    isMultiple,
    setCurrentSorts,
  };

  useDidMountEffect(() => {
    onSort?.(currentSorts);
  }, [currentSorts]);

  return (
    <ListingSortsContext.Provider value={contextValue}>
      {children}
    </ListingSortsContext.Provider>
  );
};

export default ListingSort;
