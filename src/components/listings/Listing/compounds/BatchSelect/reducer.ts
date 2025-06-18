import type { ListingBatchSelectionState } from '../../context';
import { initialState } from './state';
import type { BatchAction } from './types';
import { BatchActions } from './types';

export const reducer = (
  state: ListingBatchSelectionState,
  action: BatchAction,
): ListingBatchSelectionState => {
  switch (action.type) {
    case BatchActions.CLEAR:
      return initialState;

    case BatchActions.ADD_SELECTED_ITEM:
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload.id.toString()],
        itemsCount: state.itemsCount + 1,
        hasSelection: true,
      };

    case BatchActions.ADD_UNSELECTED_ITEM:
      return {
        ...state,
        unselectedIds: [...state.unselectedIds, action.payload.id.toString()],
        itemsCount: state.itemsCount - 1,
      };

    case BatchActions.REMOVE_SELECTED_ITEM:
      return {
        ...state,
        selectedIds: state.selectedIds.filter(
          id => id !== action.payload.id.toString(),
        ),
        itemsCount: state.itemsCount - 1,
        hasSelection: !!(state.itemsCount - 1),
      };

    case BatchActions.REMOVE_UNSELECTED_ITEM:
      return {
        ...state,
        unselectedIds: state.unselectedIds.filter(
          id => id !== action.payload.id.toString(),
        ),
        itemsCount: state.itemsCount + 1,
        hasSelection: true,
      };

    case BatchActions.DELETE_SELECTED_ITEM: {
      const deleteId = action.payload.id.toString();
      return {
        ...state,
        selectedIds: state.selectedIds.filter(id => id !== deleteId),
        unselectedIds: state.unselectedIds.filter(id => id !== deleteId),
        itemsCount: state.itemsCount - 1,
        hasSelection: !!(state.itemsCount - 1),
      };
    }

    case BatchActions.DELETE_UNSELECTED_ITEM: {
      return {
        ...state,
        unselectedIds: state.unselectedIds.filter(
          id => id !== action.payload.id.toString(),
        ),
      };
    }

    case BatchActions.ADD_PAGE_SELECTED:
      return {
        ...state,
        selectedIds: [
          ...new Set([...state.selectedIds, ...action.payload.ids]),
        ],
        itemsCount: new Set([...state.selectedIds, ...action.payload.ids]).size,
        hasSelection: true,
      };

    case BatchActions.ADD_PAGE_UNSELECTED:
      return {
        ...state,
        unselectedIds: [...state.unselectedIds, ...action.payload.ids],
        itemsCount: state.itemsCount - action.payload.ids.length,
      };

    case BatchActions.REMOVE_PAGE_SELECTED:
      return {
        ...state,
        selectedIds: state.selectedIds.filter(
          id => !action.payload.ids.includes(id.toString()),
        ),
        itemsCount: state.itemsCount - action.payload.ids.length,
        hasSelection: !!(state.itemsCount - action.payload.ids.length),
      };

    case BatchActions.REMOVE_PAGE_UNSELECTED:
      return {
        ...state,
        unselectedIds: state.unselectedIds.filter(
          id => !action.payload.ids.includes(id.toString()),
        ),
        itemsCount:
          state.itemsCount +
          state.unselectedIds.filter(id =>
            action.payload.ids.includes(id.toString()),
          ).length,
      };

    case BatchActions.SELECT_ALL:
      return {
        allSelected: true,
        hasSelection: true,
        itemsCount: action.payload.itemsCount,
        selectedIds: [],
        unselectedIds: [],
      };

    default:
      return state;
  }
};
