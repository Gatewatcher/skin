import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { act } from 'react';

import { Button } from '@/skin/actions';

import type { RangeDatepickerProps } from '../';
import RangeDatepicker from '../';

describe('RangeDatepicker', () => {
  const TEST_ID: TestId = 'datepicker';
  const TRIGGER_TEST_ID: TestId = 'open-datepicker';

  const user = userEvent.setup();

  beforeAll(() => {
    vi.useFakeTimers({ now: new Date('March 8, 2024 12:00:00').getTime() });
  });

  const renderComponent = (
    {
      children,
      withApply,
      ...props
    }: Partial<RangeDatepickerProps> & { withApply?: boolean } = {
      withApply: true,
    },
  ) =>
    render(
      <RangeDatepicker data-testid={TEST_ID} {...props}>
        {children || (
          <>
            <RangeDatepicker.Presets>
              <RangeDatepicker.PresetToday />
              <RangeDatepicker.PresetYesterday />
              <RangeDatepicker.PresetLastTwoDays />
              <RangeDatepicker.PresetLastTwoWeeks />
              <RangeDatepicker.PresetCustomRange />
            </RangeDatepicker.Presets>
            <RangeDatepicker.Main>
              <RangeDatepicker.Calendars />
              <RangeDatepicker.Footer>
                <RangeDatepicker.Clear />
                <RangeDatepicker.Actions>
                  <RangeDatepicker.Close />
                  {withApply && <RangeDatepicker.Apply onApply={console.log} />}
                </RangeDatepicker.Actions>
              </RangeDatepicker.Footer>
            </RangeDatepicker.Main>
          </>
        )}
      </RangeDatepicker>,
    );

  const floating: RangeDatepickerProps['floating'] = {
    trigger: <Button data-testid={TRIGGER_TEST_ID}>open</Button>,
  };

  const openRangeDatePicker = async () => {
    const btn = await screen.findByTestId(TRIGGER_TEST_ID);
    await user.click(btn);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it.skip('should render floating', async () => {
    renderComponent({ floating });
    await openRangeDatePicker();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should reduce range if out of min max', async () => {
    const { rerender } = renderComponent();
    let start = await screen.findByTestId(
      dayjs().subtract(4, 'day').format('DD-MM'),
    );
    let end = await screen.findByTestId(dayjs().add(4, 'day').format('DD-MM'));
    act(() => {
      fireEvent.click(start);
    });
    act(() => {
      fireEvent.click(end);
    });
    expect(start).toHaveClass('DayRangeBounds');
    expect(end).toHaveClass('DayRangeBounds');

    rerender(
      <RangeDatepicker
        max={dayjs().add(2, 'day').toDate()}
        min={dayjs().subtract(2, 'day').toDate()}
      >
        <RangeDatepicker.Calendars />
      </RangeDatepicker>,
    );

    start = await screen.findByTestId(
      dayjs().subtract(2, 'day').format('DD-MM'),
    );
    end = await screen.findByTestId(dayjs().add(2, 'day').format('DD-MM'));
    expect(start).toHaveClass('DayRangeBounds');
    expect(end).toHaveClass('DayRangeBounds');
  });
});
