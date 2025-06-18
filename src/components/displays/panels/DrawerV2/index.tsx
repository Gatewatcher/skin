import PanelContentLayout from '../PanelContentLayout';
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

export default DrawerV2;

export {
  useDrawerV2,
  type UseDrawerV2Options,
  type UseDrawerV2Return,
} from './Provider/hooks/useDrawerV2';
export { useCurrentDrawer } from './Provider/hooks/useCurrentDrawer';
export { useDrawerPersistence } from './Provider/hooks/useDrawerPersistence';
export type { DrawerItem, DrawerMatch, DrawerMatches } from './Provider/types';
