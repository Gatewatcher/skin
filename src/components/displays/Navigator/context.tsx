import { createContext, useContext } from 'react';

import type { NavId } from './types';

export type NavigatorContextType = {
  currentSection: NavId;
  currentNavItem: NavId;
  onNavItemChange: (activeItem: { sectionId: NavId; navItemId: NavId }) => void;
  setCurrentSection: (id: NavId) => void;
  setCurrentNavItem: (id: NavId) => void;
};

export const NavigatorContext = createContext<NavigatorContextType>({
  currentSection: 0,
  currentNavItem: 0,
  onNavItemChange: () => {},
  setCurrentSection: () => {},
  setCurrentNavItem: () => {},
});

export const useNavigatorContext = () => useContext(NavigatorContext);
