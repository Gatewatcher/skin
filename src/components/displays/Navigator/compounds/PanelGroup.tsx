import type { ReactElement } from 'react';
import { Children } from 'react';

import { useNavigatorContext } from '../context';
import type { NavIdProps } from '../types';
import type { NavigatorPanelProps } from './Panel';

export type NavigatorPanelGroupProps = NavIdProps & {
  children:
    | ReactElement<NavigatorPanelProps>
    | ReactElement<NavigatorPanelProps>[];
};

const NavigatorPanelGroup = ({ children }: NavigatorPanelGroupProps) => {
  const { currentNavItem } = useNavigatorContext();
  return (
    <>
      {Children.map(children, item => item).find(
        (item, index) =>
          item.props.id === currentNavItem || currentNavItem === index,
      )}
    </>
  );
};

export default NavigatorPanelGroup;
