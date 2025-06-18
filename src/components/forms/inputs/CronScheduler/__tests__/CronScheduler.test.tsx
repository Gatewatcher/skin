import type { ByRoleOptions } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CronScheduler from '..';

describe('CronScheduler unit test', () => {
  it('should call onChange on basic view', async () => {
    const handleChange = vi.fn();
    render(<CronScheduler onChange={handleChange} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('combobox', { name: /period/i }));
    await user.click(screen.getByText(/days/i));
    await user.type(getNumberInputByLabel('hours'), '21');
    await user.type(getNumberInputByLabel('minutes'), '30');
    await user.click(getDaySelectorButton('sa'));
    await user.click(getDaySelectorButton('su'));

    expect(handleChange).toHaveBeenLastCalledWith('30 21 * * 0,6');
  });

  it('should call onChange on cron view', async () => {
    const handleChange = vi.fn();
    render(<CronScheduler onChange={handleChange} />);

    const user = userEvent.setup();
    await user.click(getViewSwitchButton('cron'));
    await user.type(getCronExpInput(), '30 21 * * 0,6');

    expect(handleChange).toHaveBeenLastCalledWith('30 21 * * 0,6');
  });

  it('should display and prefill the basic view', async () => {
    render(<CronScheduler initialValue="30 21 * * 0,6" />);

    expect(getViewSwitchButton('cron')).toBeVisible();
    expect(getNumberInputByLabel('hours')).toHaveValue(21);
    expect(getNumberInputByLabel('minutes')).toHaveValue(30);
    expectDaysToBeSelected(['sa', 'su']);
  });

  it('should display and prefill the cron view', async () => {
    render(<CronScheduler initialValue="30 */2 * * 0,6" />);

    expect(getViewSwitchButton('basic')).toBeVisible();
    expect(getCronExpInput()).toHaveValue('30 */2 * * 0,6');
  });

  it('should forward weekDays', async () => {
    render(<CronScheduler weekDays={[[1, 'Lu']]} />);

    expect(getDaySelectorButton('lu')).toBeVisible();
  });
});

const getViewSwitchButton = (toView?: 'basic' | 'cron') => {
  return screen.getByRole('button', {
    name: new RegExp(`switch to ${toView ?? '(basic|cron)'} view`, 'i'),
  });
};

const getNumberInputByLabel = (label: string) => {
  return screen.getByRole('spinbutton', { name: new RegExp(label, 'i') });
};

const getDaySelectorButton = (
  label: string,
  options?: Omit<ByRoleOptions, 'name'>,
) =>
  screen.getByRole('button', {
    ...options,
    name: new RegExp(`^${label}`, 'i'),
  });

const getCronExpInput = () =>
  screen.getByRole('textbox', { name: /cron expression/i });

const expectDaysToBeSelected = (days: string[]) => {
  days.forEach(day =>
    expect(getDaySelectorButton(day, { pressed: true })).toBeVisible(),
  );
};
