import PanelContentLayout, {
  type PanelContentLayoutProps,
} from '../../PanelContentLayout';

const Content = ({
  children,
  'data-testid': testId = 'side-panel',
}: PanelContentLayoutProps) => {
  return (
    <PanelContentLayout data-testid={testId}>{children}</PanelContentLayout>
  );
};

export default Content;
