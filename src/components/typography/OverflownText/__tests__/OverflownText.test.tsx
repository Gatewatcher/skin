import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { OverflownTextProps } from '..';
import OverflownText from '..';

describe('OverflownText', () => {
  const TEST_ID: TestId = 'overflown-text';

  const renderComponent = ({ ...props }: Partial<OverflownTextProps> = {}) =>
    render(
      <OverflownText data-testid={TEST_ID} {...props}>
        content
      </OverflownText>,
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
