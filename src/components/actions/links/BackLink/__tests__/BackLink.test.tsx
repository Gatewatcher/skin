import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '@/tests';

import type { BackLinkProps } from '..';
import BackLink from '..';

describe('BackLink', () => {
  const TEST_ID: TestId = 'CHANGE_THIS';

  const renderComponent = ({
    children = 'link',
    to = '/users',
    ...props
  }: Partial<BackLinkProps> = {}) =>
    renderWithRouter(
      <BackLink data-testid={TEST_ID} to={to} {...props}>
        {children}
      </BackLink>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
    await expectToBeVisibleInTheDocument('link', screen.findByText);
  });

  it('should have start icon', async () => {
    renderComponent();
    expect(await screen.findByTestId('icon')).toHaveClass('iconStart');
    await expectToBeVisibleInTheDocument('icon-ChevronLeft');
  });

  it('should have custom icon', async () => {
    renderComponent({ startIcon: 'Action' });
    await expectToBeVisibleInTheDocument('icon-Action');
  });
});
