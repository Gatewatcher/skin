import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import { useMemo } from 'react';

import { ButtonClose } from '@/skin/actions';
import { Grid, Stack } from '@/skin/layout';

import Section from '../../Section';
import { useFloatingContext } from '../../floating/Floating/context';
import { DEFAULT_PANEL_WIDTH } from '../constants';
import type { FinderPanelsContextType } from '../contexts';
import { FinderPanelsContext } from '../contexts';

export type FinderPanelsProps = DataTestId & {
  children: ReactElement[];
  count: number;
  maxHeight?: number;
  searchBar?: ReactNode;
  searchResults?: ReactNode;
  title?: string;
  width?: number;
};

const Panels = ({
  children,
  count,
  'data-testid': testId = 'finder-panels',
  maxHeight = 200,
  searchBar,
  searchResults,
  title = 'Finder',
  width = DEFAULT_PANEL_WIDTH,
}: FinderPanelsProps) => {
  const { close } = useFloatingContext();

  const contextValue = useMemo<FinderPanelsContextType>(
    () => ({ maxHeight, width }),
    [maxHeight, width],
  );

  return (
    <FinderPanelsContext.Provider value={contextValue}>
      <Section data-testid={testId} variant="tertiary">
        <Section.Header>
          <Section.Title>{title}</Section.Title>
          <ButtonClose onClick={close} />
        </Section.Header>
        <Section.Body>
          <Stack direction="column" gap={9}>
            {searchBar}
            <Grid
              gap={7}
              style={{ gridTemplateColumns: `repeat(${count}, ${width}px)` }}
              isContainer
            >
              {searchResults ? (
                <Grid colSpan={count} isItem>
                  {searchResults}
                </Grid>
              ) : (
                <>
                  {children.map((child, index) => (
                    <Grid key={index} isItem>
                      {child}
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Stack>
        </Section.Body>
      </Section>
    </FinderPanelsContext.Provider>
  );
};

export default Panels;
