import { useCallback, useMemo } from 'react';

import { useLoadMoreContext } from '@/skin/pagination/LoadMore/context';

import { DEFAULT_BATCH_SELECT_ID_EXTRACTOR } from '../Table/constants';
import type { IdExtractor } from './compounds/BatchSelect/types';
import { BatchActions } from './compounds/BatchSelect/types';
import {
  useListingBatchSelectionContext,
  useListingEditionContext,
} from './context';
import type { SortValue } from './types';
import { sortData } from './utils';

export function useSort<T = unknown>(data: T[], currentSort?: SortValue): T[] {
  return useMemo(() => sortData(data, currentSort), [data, currentSort]);
}

// INTERNAL HOOKS
export const useBatchSelection = () => {
  const { dispatch, allSelected, selectedIds, unselectedIds } =
    useListingBatchSelectionContext();
  const { data = [], totalItemsCount } = useLoadMoreContext();

  const addItem = (id: string) => {
    dispatch({ type: BatchActions.ADD_SELECTED_ITEM, payload: { id: id } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: BatchActions.REMOVE_SELECTED_ITEM, payload: { id } });
  };

  const addUnselectedItem = (id: string) => {
    dispatch({ type: BatchActions.ADD_UNSELECTED_ITEM, payload: { id } });
  };

  const deleteItem = (id: string) => {
    const isChecked = allSelected
      ? !unselectedIds.includes(id)
      : selectedIds.includes(id);

    dispatch({
      type: isChecked
        ? BatchActions.DELETE_SELECTED_ITEM
        : BatchActions.DELETE_UNSELECTED_ITEM,
      payload: { id },
    });
  };

  const removeUnselectedItem = (id: string) => {
    dispatch({ type: BatchActions.REMOVE_UNSELECTED_ITEM, payload: { id } });
  };

  const addAll = (
    idExtractor: IdExtractor = DEFAULT_BATCH_SELECT_ID_EXTRACTOR,
  ) => {
    const ids = data.map(idExtractor) as string[];

    dispatch({
      type: BatchActions.ADD_PAGE_SELECTED,
      payload: { ids },
    });
  };

  const removeAll = (
    idExtractor: IdExtractor = DEFAULT_BATCH_SELECT_ID_EXTRACTOR,
  ) => {
    const ids = data.map(idExtractor) as string[];
    dispatch({
      type: BatchActions.REMOVE_PAGE_SELECTED,
      payload: { ids },
    });
  };

  const addAllUnselected = (
    idExtractor: IdExtractor = DEFAULT_BATCH_SELECT_ID_EXTRACTOR,
  ) => {
    const ids = data.map(idExtractor) as string[];
    dispatch({
      type: BatchActions.ADD_PAGE_UNSELECTED,
      payload: { ids },
    });
  };

  const removeAllUnselected = (
    idExtractor: IdExtractor = DEFAULT_BATCH_SELECT_ID_EXTRACTOR,
  ) => {
    const ids = data.map(idExtractor) as string[];
    dispatch({
      type: BatchActions.REMOVE_PAGE_UNSELECTED,
      payload: { ids },
    });
  };

  const clear = () => {
    dispatch({ type: BatchActions.CLEAR });
  };

  const selectAll = () => {
    dispatch({
      type: BatchActions.SELECT_ALL,
      payload: { itemsCount: totalItemsCount },
    });
  };

  return {
    addItem,
    addUnselectedItem,
    addAll,
    addAllUnselected,
    removeItem,
    removeUnselectedItem,
    removeAll,
    removeAllUnselected,
    deleteItem,
    clear,
    selectAll,
  };
};

export const useEdition = () => {
  const { setEditingIdsRef } = useListingEditionContext();

  const addItem = useCallback(
    (id: string) => {
      setEditingIdsRef.current(prev => [...prev, id.toString()]);
    },
    [setEditingIdsRef],
  );

  const removeItem = useCallback(
    (id: string) => {
      setEditingIdsRef.current(prev => prev.filter(item => item !== id));
    },
    [setEditingIdsRef],
  );

  return { addItem, removeItem };
};
