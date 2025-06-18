import type { ReactNode } from 'react';
import { useState } from 'react';

import { DEFAULT_SWITCH_LISTING_INITIAL_VIEW } from '../constants';
import type { SwitchListingContextType } from '../context';
import { SwitchListingContext } from '../context';
import type { SwitchListingView } from '../types';

export type SwitchListingProviderProps = {
  children: ReactNode;
  initialView?: SwitchListingView;
};

const SwitchListingProvider = ({
  initialView = DEFAULT_SWITCH_LISTING_INITIAL_VIEW,
  children,
}: SwitchListingProviderProps) => {
  const [currentView, setCurrentView] =
    useState<SwitchListingView>(initialView);

  const contextValue: SwitchListingContextType = {
    currentView,
    setCurrentView,
  };

  return (
    <SwitchListingContext.Provider value={contextValue}>
      {children}
    </SwitchListingContext.Provider>
  );
};

export default SwitchListingProvider;
