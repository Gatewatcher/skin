import type { NavBarProps } from './NavBar';
import NavBar from './NavBar';
import type { NavigationItemProps } from './NavigationItem';
import NavigationItem from './NavigationItem';
import type { SideNavProps } from './SideNav';
import SideNav from './SideNav';
import type { SideNavFooterProps } from './SideNav/compounds/Footer';
import type { SideNavLinkProps } from './SideNav/compounds/Link';
import {
  ThemeContext,
  ThemeProvider,
  ThemeSwitch,
  useThemeContext,
} from './Theme';
import type { Theme } from './Theme';

export { useThemeContext };

export {
  NavBar,
  NavigationItem,
  SideNav,
  ThemeProvider,
  ThemeSwitch,
  ThemeContext,
};

export type {
  Theme,
  NavBarProps,
  NavigationItemProps,
  SideNavProps,
  SideNavLinkProps,
  SideNavFooterProps,
};
