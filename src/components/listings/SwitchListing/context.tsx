import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import { DEFAULT_SWITCH_LISTING_INITIAL_VIEW } from './constants';
import type { SwitchListingView } from './types';

export type SwitchListingContextType = {
  initialView?: SwitchListingView;
  currentView: SwitchListingView;
  setCurrentView: Dispatch<SetStateAction<SwitchListingView>>;
};

export const SwitchListingContext = createContext<SwitchListingContextType>({
  currentView: DEFAULT_SWITCH_LISTING_INITIAL_VIEW,
  setCurrentView: () => {},
});

export const useSwitchListingContext = () => useContext(SwitchListingContext);
