import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@/tests';

import type { OverflownLinkProps } from '..';
import OverflownLink from '..';

describe('OverflownLink', () => {
  const TEST_ID: TestId = 'CHANGE_THIS';

  const renderComponent = ({
    children = 'content',
    to = '/links',
    ...props
  }: Partial<OverflownLinkProps> = {}) =>
    renderWithRouter(
      <OverflownLink data-testid={TEST_ID} to={to} {...props}>
        {children}
      </OverflownLink>,
    );

  const user = userEvent.setup();

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be disabled', async () => {
    renderComponent({ isDisabled: true });
    await user.click(await screen.findByTestId(TEST_ID));

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'content'));
    });
  });
});
