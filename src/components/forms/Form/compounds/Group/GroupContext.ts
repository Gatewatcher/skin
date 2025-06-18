import { createContext } from 'react';

export interface GroupContextProps {
  isGroupField: boolean;
}

const GroupContext = createContext<GroupContextProps | null>(null);

export default GroupContext;
