import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { DateTimeProps } from '..';
import DateTime from '..';

describe('DateTime', () => {
  const TEST_ID: TestId = 'date-time';

  const renderComponent = ({
    date = 1695387600000, // 22 sept 2023, 15h00
    ...props
  }: Partial<DateTimeProps> = {}) =>
    render(<DateTime data-testid={TEST_ID} date={date} {...props} />);

  const user = userEvent.setup();

  const trigger = async () => {
    const triggerElement = await screen.findByTestId(
      suffixTestId(TEST_ID, 'trigger'),
    );
    await user.hover(triggerElement);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render date', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('22/09/2023', screen.findByText);
  });

  it('should render tooltip', async () => {
    renderComponent({
      tooltipFormat: 'L',
    });
    await trigger();
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'content'));
    });
  });

  it('should render tooltip with custom format', async () => {
    renderComponent({ mode: 'absolute', tooltipFormat: 'L' });
    await expectToBeVisibleInTheDocument('22/09/2023', screen.findByText);
    await trigger();
    await waitFor(async () => {
      expect(await screen.findAllByText('22/09/2023')).toHaveLength(2);
    });
  });

  it('should not stop event propagation', async () => {
    const onClick = vi.fn();
    render(
      <div onClick={onClick}>
        <DateTime date={Date.now()} tooltipFormat="L" />
      </div>,
    );

    await user.click(await screen.findByTestId('date-time-trigger'));
    expect(onClick).toHaveBeenCalled();
  });
});
