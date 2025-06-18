import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { Button } from '@/skin/actions';

import type { SingleDatepickerProps } from '..';
import SingleDatepicker from '..';

describe('SingleDatepicker', () => {
  const TEST_ID: TestId = 'single-datepicker';
  const TRIGGER_TEST_ID: TestId = 'datepicker-floating-trigger';

  beforeAll(() => {
    vi.useFakeTimers({ now: new Date('March 4, 2024 12:00:00').getTime() });
  });

  const floating: SingleDatepickerProps['floating'] = {
    trigger: <Button>open</Button>,
    triggerOn: 'click',
  };

  const renderComponent = (
    {
      children,
      withApply,
      ...props
    }: Partial<SingleDatepickerProps> & { withApply?: boolean } = {
      withApply: true,
      'data-testid': TEST_ID,
    },
  ) =>
    render(
      <SingleDatepicker {...props}>
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
      </SingleDatepicker>,
    );

  const user = userEvent.setup();

  const openSingleDatePicker = async () => {
    const btn = await screen.findByTestId(TRIGGER_TEST_ID);
    await user.dblClick(btn);
  };

  const calendarDayClick = async () => {
    const day = await screen.findByTestId(
      dayjs().subtract(1, 'day').format('DD-MM'),
    );
    await user.click(day);
  };

  const applyButtonClick = async () => {
    const apply = await screen.findByTestId('datepicker-apply');
    await user.click(apply);
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it.skip('should render floating', async () => {
    renderComponent({ floating });
    await openSingleDatePicker();

    await expectToBeVisibleInTheDocument(TEST_ID);
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
});
