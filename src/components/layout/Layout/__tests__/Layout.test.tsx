import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { LayoutProps } from '..';
import Layout from '..';
import { buildPanelLayoutTestIds } from '../utils';

describe('Layout', () => {
  const TEST_ID: TestId = 'layout';
  const panelLayoutTestIds = buildPanelLayoutTestIds('panel-layout');
  const gridContainerTestId = `${panelLayoutTestIds.contentGrid}-container`;

  const renderComponent = ({ children, ...props }: Partial<LayoutProps> = {}) =>
    render(
      <Layout data-testid={TEST_ID} {...props}>
        {children}
      </Layout>,
    );

  const querySideNav = () => screen.queryByTestId('panel-layout-side-nav');
  const queryTopNav = () => screen.queryByTestId(panelLayoutTestIds.topNavZone);
  const getGrid = () => screen.getByTestId(gridContainerTestId);

  it('should not render sideNav', async () => {
    renderComponent();
    expect(querySideNav()).not.toBeInTheDocument();
  });

  it('should not render topNav', async () => {
    renderComponent();
    expect(queryTopNav()).not.toBeInTheDocument();
  });

  it('should render sideNav content', async () => {
    const content = (
      <div data-testid="panel-layout-side-nav">sideNav content text</div>
    );
    renderComponent({ sideNav: content });
    expect(querySideNav()).toHaveTextContent('sideNav content text');
  });

  it('should render topNav content', async () => {
    const contentText = 'topNav content text';
    renderComponent({ topNav: contentText });
    expect(queryTopNav()).toHaveTextContent(contentText);
  });

  it('should render children into the grid', async () => {
    const contentText = 'grid children content text';
    renderComponent({ children: contentText });
    expect(getGrid()).toHaveTextContent(contentText);
  });
});
