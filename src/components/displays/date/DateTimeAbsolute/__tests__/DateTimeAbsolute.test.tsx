import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { DateTimeAbsoluteProps } from '..';
import DateTimeAbsolute from '..';

describe('DateTimeAbsolute', () => {
  const TEST_ID: TestId = 'date-time-absolute';

  const renderComponent = ({
    date = 1695387600000, // 22 sept 2023, 15h00
    ...props
  }: Partial<DateTimeAbsoluteProps> = {}) =>
    render(<DateTimeAbsolute data-testid={TEST_ID} date={date} {...props} />);

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

  it('should render short format', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('22/09/2023', screen.findByText);
  });

  it('should render long format', async () => {
    renderComponent({ format: 'long' });
    await expectToBeVisibleInTheDocument(
      '22/09/2023 13:00:00',
      screen.findByText,
    );
  });

  it('should have tooltip - short', async () => {
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

  it('should have tooltip - long', async () => {
    renderComponent({ format: 'long' });
    await triggerTooltip();
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'content'));
      await expectToBeVisibleInTheDocument(
        '22/09/2023 13:00:00:000',
        screen.findByText,
      );
    });
  });
});
