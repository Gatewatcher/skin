import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { type ReactNode } from 'react';
import { type To } from 'react-router-dom';

import { Link } from '@/skin/actions';
import { type Theme, useThemeContext } from '@/skin/navigation/Theme';

import { DEFAULT_HOME_LINK } from '../constants';
import { useSidenavContext } from '../context';

type RenderOptions = {
  isOpened: boolean;
  theme: Theme;
};

export type SideNavHeaderProps = DataTestId & {
  children: ReactNode | ((options: RenderOptions) => ReactNode);
  homeLink?: To;
};

const SideNavHeader = ({
  'data-testid': testId = 'side-nav-header',
  children,
  homeLink = DEFAULT_HOME_LINK,
}: SideNavHeaderProps) => {
  const { isOpened } = useSidenavContext();
  const { theme } = useThemeContext();

  return (
    <Link data-testid={testId} to={homeLink} variant="bared">
      {isFunction(children) ? children({ isOpened, theme }) : children}
    </Link>
  );
};

export default SideNavHeader;
