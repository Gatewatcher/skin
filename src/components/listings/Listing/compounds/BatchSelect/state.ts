import type { ListingBatchSelectionState } from '../../context';

export const initialState: ListingBatchSelectionState = {
  allSelected: false,
  hasSelection: false,
  itemsCount: 0,
  selectedIds: [],
  unselectedIds: [],
};
