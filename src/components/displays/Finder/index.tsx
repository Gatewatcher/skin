import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';

import { LoaderState } from '@/skin/feedback';

import Dropdown from '../floating/Dropdown';
import OpenButton from './compounds/OpenButton';
import Panel from './compounds/Panel';
import PanelItem from './compounds/PanelItem';
import PanelItemAll from './compounds/PanelItemAll';
import PanelName from './compounds/PanelName';
import PanelPlaceholder from './compounds/PanelPlaceholder';
import Panels from './compounds/Panels';
import Provider, { useFinder } from './compounds/Provider';
import Resume from './compounds/Resume';
import ResumeItem from './compounds/ResumeItem';
import SearchBar from './compounds/SearchBar';
import SearchResults from './compounds/SearchResults';
import { DEFAULT_IS_READY, DEFAULT_OFFSET } from './constants';

export type FinderProps = DataTestId & {
  isReady?: boolean;
  offset?: number;
  panels: ReactNode;
  resume: ReactElement;
};

const Finder = ({
  'data-testid': testId = 'finder',
  isReady = DEFAULT_IS_READY,
  offset = DEFAULT_OFFSET,
  panels,
  resume,
}: FinderProps) => {
  const contextValue = useFinder();

  return (
    <LoaderState isLoading={!isReady}>
      <Dropdown
        content={panels}
        data-testid={testId}
        isOpened={contextValue?.isOpened}
        maxHeight="fit"
        offset={offset}
        placement="bottom-start"
        setIsOpened={contextValue?.setIsOpened}
        triggerOn="click"
      >
        {resume}
      </Dropdown>
    </LoaderState>
  );
};

Finder.OpenButton = OpenButton;
Finder.Panel = Panel;
Finder.PanelItem = PanelItem;
Finder.PanelItemAll = PanelItemAll;
Finder.PanelName = PanelName;
Finder.Panels = Panels;
Finder.PanelPlaceholder = PanelPlaceholder;
Finder.Provider = Provider;
Finder.Resume = Resume;
Finder.ResumeItem = ResumeItem;
Finder.SearchBar = SearchBar;
Finder.SearchResults = SearchResults;

export default Finder;
