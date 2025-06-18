import type { ListingBatchSelectionState } from '../../context';

export type IdExtractor = (row: Record<string, unknown>) => string | unknown;

export type OnBatchSelectParams = ListingBatchSelectionState;

export enum BatchActions {
  CLEAR = 'CLEAR',
  ADD_SELECTED_ITEM = 'ADD_SELECTED_ITEM',
  ADD_UNSELECTED_ITEM = 'ADD_UNSELECTED_ITEM',
  REMOVE_SELECTED_ITEM = 'REMOVE_SELECTED_ITEM',
  REMOVE_UNSELECTED_ITEM = 'REMOVE_UNSELECTED_ITEM',
  ADD_PAGE_SELECTED = 'ADD_PAGE_SELECTED',
  ADD_PAGE_UNSELECTED = 'ADD_PAGE_UNSELECTED',
  REMOVE_PAGE_SELECTED = 'REMOVE_PAGE_SELECTED',
  REMOVE_PAGE_UNSELECTED = 'REMOVE_PAGE_UNSELECTED',
  DELETE_SELECTED_ITEM = 'DELETE_SELECTED_ITEM',
  DELETE_UNSELECTED_ITEM = 'DELETE_UNSELECTED_ITEM',
  SELECT_ALL = 'SELECT_ALL',
}

export type BatchClearAction = {
  type: BatchActions.CLEAR;
};

export type BatchAddSelectedItemAction = {
  type: BatchActions.ADD_SELECTED_ITEM;
  payload: { id: string };
};

export type BatchAddUnselectedItemAction = {
  type: BatchActions.ADD_UNSELECTED_ITEM;
  payload: { id: string };
};

export type BatchRemoveSelectedItemAction = {
  type: BatchActions.REMOVE_SELECTED_ITEM;
  payload: { id: string };
};

export type BatchRemoveUnselectedItemAction = {
  type: BatchActions.REMOVE_UNSELECTED_ITEM;
  payload: { id: string };
};

export type BatchAddPageSelectedAction = {
  type: BatchActions.ADD_PAGE_SELECTED;
  payload: { ids: string[] };
};

export type BatchAddPageUnselectedAction = {
  type: BatchActions.ADD_PAGE_UNSELECTED;
  payload: { ids: string[] };
};

export type BatchRemovePageSelectedAction = {
  type: BatchActions.REMOVE_PAGE_SELECTED;
  payload: { ids: string[] };
};

export type BatchRemovePageUnselectedAction = {
  type: BatchActions.REMOVE_PAGE_UNSELECTED;
  payload: { ids: string[] };
};

export type BatchDeleteSelectedItemAction = {
  type: BatchActions.DELETE_SELECTED_ITEM;
  payload: { id: string };
};

export type BatchDeleteUnselectedItemAction = {
  type: BatchActions.DELETE_UNSELECTED_ITEM;
  payload: { id: string };
};

export type BatchSelectAllAction = {
  type: BatchActions.SELECT_ALL;
  payload: { itemsCount: number };
};

export type BatchAction =
  | BatchClearAction
  | BatchAddSelectedItemAction
  | BatchAddUnselectedItemAction
  | BatchRemoveSelectedItemAction
  | BatchRemoveUnselectedItemAction
  | BatchAddPageSelectedAction
  | BatchAddPageUnselectedAction
  | BatchRemovePageSelectedAction
  | BatchRemovePageUnselectedAction
  | BatchDeleteSelectedItemAction
  | BatchDeleteUnselectedItemAction
  | BatchSelectAllAction;
