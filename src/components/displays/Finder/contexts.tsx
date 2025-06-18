import { createContext, useContext } from 'react';

import { DEFAULT_PANEL_WIDTH } from './constants';

export type FinderPanelContextType = {
  name: string;
};

export const FinderPanelContext = createContext<FinderPanelContextType>({
  name: '',
});

export const useFinderPanelContext = () => useContext(FinderPanelContext);

// ------------------

export type FinderPanelsContextType = {
  maxHeight: number;
  width: number;
};

export const FinderPanelsContext = createContext<FinderPanelsContextType>({
  maxHeight: 0,
  width: DEFAULT_PANEL_WIDTH,
});

export const useFinderPanelsContext = () => useContext(FinderPanelsContext);
