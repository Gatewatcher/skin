import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '@/tests';

import type { LinkProps } from '..';
import Link from '..';

describe('Link', () => {
  const renderComponent = ({ to, ...props }: Partial<LinkProps> = {}) =>
    renderWithRouter(
      <Link to={to || '/user'} {...props}>
        link
      </Link>,
    );

  const getLink = async () => await screen.findByRole('link');

  it('should not have preventScrollReset and relatve attributes for external links', async () => {
    renderComponent({
      to: 'https://www.google.com',
      preventScrollReset: true,
      relative: 'test',
    });
    const link = await getLink();
    expect(link).not.toHaveAttribute('relative');
  });

  it('should render internal link', async () => {
    renderComponent({ to: '/user' });
    await expectToBeVisibleInTheDocument('link-internal');
  });

  it('should render external link', async () => {
    renderComponent({ to: 'https://www.google.com' });
    await expectToBeVisibleInTheDocument('link-external');
  });

  it('should detect special link', async () => {
    renderComponent({ to: 'mailto:test@test.com' });
    await expectToBeVisibleInTheDocument('link-external');
  });

  it('should have icon first', async () => {
    renderComponent({
      to: 'mailto:test@test.com',
      startIcon: 'Action',
      withIcon: { end: false },
    });

    expect(await screen.findByTestId('icon')).toHaveClass('iconStart');
  });

  it('should not render icon', async () => {
    renderComponent({ to: 'https://www.google.com', withIcon: false });
    await expectNotToBeVisibleInTheDocument('icon');
  });

  it('should have download property', async () => {
    renderComponent({ to: 'https://download.pdf', download: true });
    const link = await getLink();
    expect(link).toHaveAttribute('download');
  });
});
