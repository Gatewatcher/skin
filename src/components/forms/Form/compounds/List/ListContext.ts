import type { Key } from 'react';
import { createContext } from 'react';

import type { InternalNamePath } from '../../interface';

export interface ListContextProps {
  getKey: (namePath: InternalNamePath) => [Key, InternalNamePath];
}

const ListContext = createContext<ListContextProps | null>(null);

export default ListContext;
