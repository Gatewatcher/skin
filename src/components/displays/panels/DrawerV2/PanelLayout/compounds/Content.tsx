import PanelContentLayout, {
  type PanelContentLayoutProps,
} from '../../../PanelContentLayout';

const Content = ({
  children,
  'data-testid': testId = 'drawer',
}: PanelContentLayoutProps) => {
  return (
    <PanelContentLayout data-testid={testId}>{children}</PanelContentLayout>
  );
};

export default Content;
