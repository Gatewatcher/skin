import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { Button } from '@/skin/actions';
import { Title } from '@/skin/typography';

import type { RouteContainerProps } from '../';
import RouteContainer from '../';

describe('RouteContainer', () => {
  const TEST_ID: TestId = 'route-container';
  const HEADER_TEST_ID: TestId = 'route-container-header';
  const BODY_TEST_ID: TestId = 'route-container-body';
  const body = 'test content';

  const renderComponent = ({ children }: Partial<RouteContainerProps> = {}) =>
    render(
      <RouteContainer data-testid={TEST_ID}>
        {children || (
          <>
            <RouteContainer.Header title="Test"></RouteContainer.Header>
            <RouteContainer.Body>{body}</RouteContainer.Body>
          </>
        )}
      </RouteContainer>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(body, screen.findByText);
  });

  it('should have header', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(HEADER_TEST_ID);
  });

  it('should have body', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(BODY_TEST_ID);
  });

  it('should have title as h1 Title', async () => {
    renderComponent({
      children: <RouteContainer.Header title="title"></RouteContainer.Header>,
    });
    const title = await screen.findByRole('heading', { level: 1 });
    expect(title).toBeVisible();
  });

  it('should have subtitle as h2 Title', async () => {
    renderComponent({
      children: (
        <RouteContainer.Header
          subtitle="subtitle"
          title="title"
        ></RouteContainer.Header>
      ),
    });
    const subtitle = await screen.findByRole('heading', { level: 2 });
    expect(subtitle).toBeVisible();
  });

  it('should have action button working', async () => {
    const onClick = vi.fn();

    renderComponent({
      children: (
        <RouteContainer.Header
          actions={
            <>
              <Button onClick={onClick}>Click</Button>
            </>
          }
          title="Title"
        />
      ),
    });

    const btn = await screen.findByRole('button');
    await user.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render header without margin', async () => {
    renderComponent({
      children: (
        <RouteContainer.Header
          data-testid="header"
          title="header"
          withMarginBottom={false}
        />
      ),
    });
    const header = await screen.findByTestId('header');
    expect(header).not.toHaveClass('HeaderMargin');
  });

  it('should render subheader', async () => {
    renderComponent({
      children: (
        <RouteContainer.Subheader data-testid="subheader" title="subtitle" />
      ),
    });
    await expectToBeVisibleInTheDocument('subheader');
    await expectToBeVisibleInTheDocument('subtitle', screen.findByText);
  });

  it('should have custom title', async () => {
    renderComponent({
      children: (
        <RouteContainer.Header
          title={
            <Title as="h5" data-testid="custom-title">
              custom title
            </Title>
          }
        />
      ),
    });
    await expectToBeVisibleInTheDocument('custom-title');
    const title = await screen.findByTestId('custom-title');
    expect(title.tagName).toBe('H5');
  });
});
