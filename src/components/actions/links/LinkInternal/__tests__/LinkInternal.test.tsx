import { screen } from '@testing-library/react';

import { renderWithRouter } from '@/tests';

import type { LinkInternalProps } from '..';
import LinkInternal from '..';

describe('LinkInternal', () => {
  const renderComponent = ({ to, ...props }: Partial<LinkInternalProps> = {}) =>
    renderWithRouter(
      <LinkInternal to={to || '/user'} {...props}>
        link
      </LinkInternal>,
      { initialEntries: ['/user'] },
    );

  const getLink = async () => await screen.findByRole('link');

  it('should render with to as string', async () => {
    renderComponent({ to: '/test' });
    const link = await getLink();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should render with to as object', async () => {
    renderComponent({
      to: { pathname: '/user', search: 'john=doe' },
    });
    const link = await getLink();
    expect(link).toHaveAttribute('href', '/user?john=doe');
  });

  it('should open in same tab', async () => {
    renderComponent();
    const link = await getLink();
    expect(link).toHaveAttribute('target', '_self');
  });

  it('should have activeClassName', async () => {
    renderComponent({ as: 'navlink', activeClassName: 'active-link' });
    const link = await getLink();
    expect(link).toHaveClass('active-link');
  });
});
