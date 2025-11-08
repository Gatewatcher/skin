import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { act } from 'react';

import { Button } from '@/skin/actions';

import type { SingleDatepickerProps } from '..';
import SingleDatepicker from '..';

const TEST_ID: TestId = 'single-datepicker';
const TRIGGER_TEST_ID: TestId = 'datepicker-floating-trigger';

const floating: SingleDatepickerProps['floating'] = {
  trigger: <Button>open</Button>,
  triggerOn: 'click',
};

const Component = ({
  children,
  withApply,
  'data-testid': testId = TEST_ID,
  ...props
}: Partial<SingleDatepickerProps> & { withApply?: boolean }) => (
  <SingleDatepicker data-testid={testId} {...props}>
    {children || (
      <SingleDatepicker.Main>
        <SingleDatepicker.Calendar />
        <SingleDatepicker.Footer>
          <SingleDatepicker.Clear />
          <SingleDatepicker.Actions>
            <SingleDatepicker.Close />
            {withApply && <SingleDatepicker.Apply onApply={console.log} />}
          </SingleDatepicker.Actions>
        </SingleDatepicker.Footer>
      </SingleDatepicker.Main>
    )}
  </SingleDatepicker>
);

const renderComponent = (
  props?: Partial<SingleDatepickerProps> & { withApply?: boolean },
) => render(<Component {...props} />);

const openSingleDatePicker = async () => {
  const btn = await screen.findByTestId(TRIGGER_TEST_ID);
  act(() => {
    fireEvent.click(btn);
  });
};

const calendarDayClick = async () => {
  const day = await screen.findByTestId(
    dayjs().subtract(1, 'day').format('DD-MM'),
  );
  act(() => {
    fireEvent.click(day);
  });
};

const applyButtonClick = async () => {
  const apply = await screen.findByTestId('datepicker-apply');
  act(() => {
    fireEvent.click(apply);
  });
};

describe('SingleDatepicker', () => {
  beforeAll(() => {
    vi.useFakeTimers({ now: new Date('March 4, 2024 12:00:00').getTime() });
  });

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render floating', async () => {
    renderComponent({ floating });
    await openSingleDatePicker();

    await waitFor(() => {
      expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    });
  });

  it.skip('should close floating on value change if no apply compound', async () => {
    renderComponent({ floating, withApply: false });
    await openSingleDatePicker();
    await calendarDayClick();
    await expectNotToBeVisibleInTheDocument(TEST_ID);
  });

  it.skip('should close floating on apply click if apply compound', async () => {
    renderComponent({ floating });
    await openSingleDatePicker();
    await calendarDayClick();
    await expectToBeVisibleInTheDocument(TEST_ID);
    await applyButtonClick();
    await expectNotToBeVisibleInTheDocument(TEST_ID);
  });

  it('should reset date if out of min max', async () => {
    const { rerender } = renderComponent();
    let day = await screen.findByTestId(
      dayjs().subtract(2, 'day').format('DD-MM'),
    );
    act(() => {
      fireEvent.click(day);
    });
    expect(day).toHaveClass('DayRangeBounds');

    rerender(<Component min={new Date()} />);
    day = await screen.findByTestId(dayjs().subtract(2, 'day').format('DD-MM'));
    expect(day).not.toHaveClass('DayRangeBounds');
  });

  it('should not reset date if not out of min max', async () => {
    const { rerender } = renderComponent();
    let day = await screen.findByTestId(
      dayjs().subtract(2, 'day').format('DD-MM'),
    );
    act(() => {
      fireEvent.click(day);
    });
    expect(day).toHaveClass('DayRangeBounds');

    rerender(
      <Component
        max={dayjs().add(4, 'day').toDate()}
        min={dayjs().subtract(4, 'day').toDate()}
      />,
    );
    day = await screen.findByTestId(dayjs().subtract(2, 'day').format('DD-MM'));
    expect(day).toHaveClass('DayRangeBounds');
  });
});
