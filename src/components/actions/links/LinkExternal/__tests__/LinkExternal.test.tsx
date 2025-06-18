import { expectNotToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';

import type { LinkExternalProps } from '..';
import LinkExternal from '..';

describe('LinkExternal', () => {
  const content = 'Link';

  const renderComponent = ({ ...props }: Partial<LinkExternalProps> = {}) =>
    render(
      <LinkExternal to="https://www.google.com" {...props}>
        {content}
      </LinkExternal>,
    );

  const getLink = async () => await screen.findByRole('link');

  it('should have icon', async () => {
    renderComponent();
    const icon = await screen.findByRole('img');
    expect(icon).toBeVisible();
  });

  it('should render external link with to as object', async () => {
    renderComponent({ to: { pathname: '/users', search: 'test=ok' } });
    const link = await getLink();
    expect(link).toHaveAttribute('href', '/users?test=ok');
  });

  it('should have security attributes', async () => {
    renderComponent();
    const link = await getLink();
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should not have end icon', async () => {
    renderComponent({ withIcon: { end: false } });
    await expectNotToBeVisibleInTheDocument('icon');
  });

  it('should not have icon', async () => {
    renderComponent({
      withIcon: false,
      startIcon: 'Action',
      endIcon: 'Action',
    });
    await expectNotToBeVisibleInTheDocument('icon');
  });

  it('should have download property', async () => {
    renderComponent({ download: true });
    const link = await getLink();
    expect(link).toHaveAttribute('download');
  });
});
