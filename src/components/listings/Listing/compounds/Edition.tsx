import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import type { ListingEditionContextType } from '../context';
import { ListingEditionContext, useListingEditionContext } from '../context';

export type ListingEditionProps = {
  children: ReactNode;
};

const ListingEdition = ({ children }: ListingEditionProps) => {
  const [editingIds, setEditingIds] = useState<string[]>([]);
  const { setEditingIdsRef } = useListingEditionContext();

  setEditingIdsRef.current = setEditingIds;

  const contextValue: ListingEditionContextType = useMemo(
    () => ({
      editingIds,
      setEditingIdsRef,
    }),
    [editingIds, setEditingIdsRef],
  );

  return (
    <ListingEditionContext.Provider value={contextValue}>
      {children}
    </ListingEditionContext.Provider>
  );
};

export default ListingEdition;
