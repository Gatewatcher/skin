import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { DateTimeRelativeProps } from '..';
import DateTimeRelative from '..';

describe('DateTimeRelative', () => {
  const TEST_ID: TestId = 'date-time-relative';

  const renderComponent = ({
    date = 1695387600000, // 22 sept 2023, 15h00
    ...props
  }: Partial<DateTimeRelativeProps> = {}) =>
    render(<DateTimeRelative data-testid={TEST_ID} date={date} {...props} />);

  const user = userEvent.setup();

  const triggerTooltip = async () => {
    const triggerElement = await screen.findByTestId(
      suffixTestId(TEST_ID, 'trigger'),
    );
    await user.hover(triggerElement);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'trigger'));
  });

  it('should have tooltip', async () => {
    renderComponent();
    await triggerTooltip();
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'content'));
      await expectToBeVisibleInTheDocument(
        '22/09/2023 13:00:00',
        screen.findByText,
      );
    });
  });
});
