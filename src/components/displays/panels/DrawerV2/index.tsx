import PanelContentLayout from '../PanelContentLayout';
import type { BodyProps } from '../PanelContentLayout/compounds/Body';
import type { FooterProps } from '../PanelContentLayout/compounds/Footer';
import type { HeaderProps } from '../PanelContentLayout/compounds/Header';
import type { SubHeaderProps } from '../PanelContentLayout/compounds/SubHeader';
import Layout from './PanelLayout';
import Content from './PanelLayout/compounds/Content';
import Provider from './Provider';

const DrawerV2 = {
  Content,
  Layout,
  Provider,
  ...Layout,
  ...PanelContentLayout,
};

DrawerV2.Header = ({
  'data-testid': testId = 'drawer-header',
  ...rest
}: HeaderProps) => <PanelContentLayout.Header data-testid={testId} {...rest} />;

DrawerV2.SubHeader = ({
  'data-testid': testId = 'drawer-sub-header',
  ...rest
}: SubHeaderProps) => (
  <PanelContentLayout.SubHeader data-testid={testId} {...rest} />
);

DrawerV2.Body = ({
  'data-testid': testId = 'drawer-sub-body',
  ...rest
}: BodyProps) => <PanelContentLayout.Body data-testid={testId} {...rest} />;

DrawerV2.Footer = ({
  'data-testid': testId = 'drawer-footer',
  ...rest
}: FooterProps) => <PanelContentLayout.Footer data-testid={testId} {...rest} />;

export default DrawerV2;

export { useCurrentDrawer } from './Provider/hooks/useCurrentDrawer';
export { useDrawerPersistence } from './Provider/hooks/useDrawerPersistence';
export {
  useDrawerV2,
  type UseDrawerV2Options,
  type UseDrawerV2Return,
} from './Provider/hooks/useDrawerV2';
export type { DrawerItem, DrawerMatch, DrawerMatches } from './Provider/types';
