import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { MemoryRouterProps } from 'react-router-dom';

import { renderWithRouter } from '@/tests';

import type { LinkBaseInternalProps, LinkBaseProps } from '..';
import LinkBase from '..';

describe('LinkBase', () => {
  const content = 'Link';
  const url = 'https://www.google.com';

  const TEST_ID: TestId = 'link-base';

  const renderComponent = (
    { as, to, ...props }: Partial<LinkBaseProps & LinkBaseInternalProps> = {},
    router: MemoryRouterProps = {},
  ) =>
    renderWithRouter(
      <LinkBase
        as={as || 'link'}
        data-testid={TEST_ID}
        to={to || url}
        {...props}
      >
        {content}
      </LinkBase>,
      router,
    );

  const getLink = async () => await screen.findByRole('link');

  it('should render', async () => {
    renderComponent();
    const link = await getLink();
    expect(link).toBeInTheDocument();
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(content, screen.findByText);
  });

  it('should render a', async () => {
    renderComponent();
    const link = await getLink();
    expect(link.tagName).toBe('A');
  });

  it('should open in new tab', async () => {
    renderComponent({ target: '_blank' });
    const link = await getLink();
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should be primary variant', async () => {
    renderComponent();
    const link = await getLink();
    expect(link).toHaveClass('variantPrimary');
  });

  it('should be secondary variant', async () => {
    renderComponent({ variant: 'secondary' });
    const link = await getLink();
    expect(link).toHaveClass('variantSecondary');
  });

  it('should render custom class', async () => {
    renderComponent({ variant: 'bared', className: 'custom' });
    const link = await getLink();
    expect(link).toHaveClass('custom');
  });

  it('should be always underlined', async () => {
    renderComponent({ isAlwaysUnderlined: true });
    const link = await getLink();
    expect(link).toHaveClass('underlined');
  });

  it('should call onclick function', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderComponent({ onClick });

    const link = await getLink();
    await user.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be navlink', async () => {
    renderComponent({ as: 'navlink' });
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'nav'));
  });

  it('should have activeClassName', async () => {
    renderComponent(
      {
        activeClassName: 'active-link',
        as: 'navlink',
        to: { pathname: '/users' },
      },
      { initialEntries: ['/users'] },
    );
    const link = await getLink();
    expect(link).toHaveClass('active-link');
  });

  it('should have small size', async () => {
    renderComponent({ size: 'small' });
    const link = await getLink();
    expect(link).toHaveClass('sizeSmall');
  });

  it('should have className with bared variant', async () => {
    renderComponent({ variant: 'bared', className: 'classname' });

    const link = await getLink();
    expect(link).toHaveClass('classname');
  });

  it('should have start end endIcon', async () => {
    renderComponent({
      startIcon: 'Action',
      endIcon: 'Add',
    });

    expect(await screen.findAllByTestId('icon')).toHaveLength(2);
  });

  it('should be italic', async () => {
    renderComponent({
      italic: true,
    });

    const link = await getLink();
    expect(link).toHaveClass('italic');
  });
});
