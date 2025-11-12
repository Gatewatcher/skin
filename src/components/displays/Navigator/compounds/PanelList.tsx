import { Children, type ReactElement } from 'react';

import { useNavigatorContext } from '../context';
import type { NavigatorPanelGroupProps } from './PanelGroup';

export type NavigatorPanelListProps = {
  children:
    | ReactElement<NavigatorPanelGroupProps>
    | ReactElement<NavigatorPanelGroupProps>[];
};

const NavigatorPanelList = ({ children }: NavigatorPanelListProps) => {
  const { currentSection } = useNavigatorContext();

  return (
    <>
      {Children.map(children, item => item).find(
        (item, index) =>
          item.props.id === currentSection || currentSection === index,
      )}
    </>
  );
};

export default NavigatorPanelList;
