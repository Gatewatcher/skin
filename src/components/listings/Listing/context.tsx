import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { BatchAction } from './compounds/BatchSelect/types';
import { DEFAULT_INITIAL_SORT } from './constants';
import type { SortValue } from './types';

// SORT
export type ListingSortsContextType = {
  currentSorts: SortValue[];
  initialSorts: MutableRefObject<SortValue[]>;
  isMultiple: MutableRefObject<boolean>;
  setCurrentSorts: Dispatch<SetStateAction<SortValue[]>>;
};

export const ListingSortsContext = createContext<ListingSortsContextType>({
  currentSorts: DEFAULT_INITIAL_SORT,
  initialSorts: { current: DEFAULT_INITIAL_SORT },
  isMultiple: { current: false },
  setCurrentSorts: () => {},
});

export const useListingSortsContext = () => useContext(ListingSortsContext);

// BATCH SELECTION
export type ListingBatchSelectionState = {
  allSelected: boolean;
  hasSelection: boolean;
  itemsCount: number;
  selectedIds: string[];
  unselectedIds: string[];
};
export type ListingBatchSelectionContextType = ListingBatchSelectionState & {
  dispatch: Dispatch<BatchAction>;
};

export type ListingBatchActions = {
  clear: () => void;
  selectAll: () => void;
};

export const ListingBatchSelectionContext =
  createContext<ListingBatchSelectionContextType>({
    allSelected: false,
    hasSelection: false,
    itemsCount: 0,
    selectedIds: [],
    unselectedIds: [],
    dispatch: () => {},
  });

export const useListingBatchSelectionContext = () =>
  useContext(ListingBatchSelectionContext);

// EDITION
export type ListingEditionContextType = {
  editingIds: string[];
  setEditingIdsRef: { current: Dispatch<SetStateAction<string[]>> };
};

export const ListingEditionContext = createContext<ListingEditionContextType>({
  editingIds: [],
  setEditingIdsRef: { current: () => {} },
});

export const useListingEditionContext = () => useContext(ListingEditionContext);
