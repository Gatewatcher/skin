import { useDidMountEffect } from '@gatewatcher/bistoury/hooks';
import type { ReactNode } from 'react';
import { useReducer } from 'react';

import type { ListingBatchSelectionContextType } from '../../context';
import { ListingBatchSelectionContext } from '../../context';
import { reducer } from './reducer';
import { initialState } from './state';
import type { OnBatchSelectParams } from './types';

export type ListingBatchSelectProps = {
  children: ReactNode;
  onBatchSelect?: (params: OnBatchSelectParams) => void;
};

const ListingBatchSelect = ({
  children,
  onBatchSelect,
}: ListingBatchSelectProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue: ListingBatchSelectionContextType = {
    ...state,
    dispatch,
  };

  useDidMountEffect(() => {
    onBatchSelect?.(state);
  }, [state]);

  return (
    <ListingBatchSelectionContext.Provider value={contextValue}>
      {children}
    </ListingBatchSelectionContext.Provider>
  );
};

export default ListingBatchSelect;
