import PanelContentLayout from '../PanelContentLayout';
import Panel from './Panel';
import Layout from './PanelLayout';
import Provider from './Provider';
import Close from './compounds/Close';
import Content from './compounds/Content';

const SidePanel = {
  Close,
  Content,
  Layout,
  Panel,
  ...PanelContentLayout,
  Provider,
};

export default SidePanel;

export { type SidePanelProps } from './Panel';
