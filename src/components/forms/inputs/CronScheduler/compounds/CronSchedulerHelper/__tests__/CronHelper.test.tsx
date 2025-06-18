import { render } from '@testing-library/react';

import CronSchedulerHelper from '..';
import { importCronSchedulerHelperLocale } from '../../../lib/utils';

describe('CronHelper unit tests', () => {
  it('should say "Every hour"', async () => {
    const { container } = render(<CronSchedulerHelper cronExp="0 */1 * * *" />);

    expect(container).toHaveTextContent(/every hour/i);
  });

  it('should display the default empty placeholder', async () => {
    const { container } = render(<CronSchedulerHelper cronExp="" />);

    expect(container).toHaveTextContent(/no schedule selected/i);
  });

  it('should display the default error message', async () => {
    const { container } = render(
      <CronSchedulerHelper cronExp="invalid cron expression" />,
    );

    expect(container).toHaveTextContent(/this expression is invalid/i);
  });

  it('should display a custom empty placeholder', async () => {
    const { container } = render(
      <CronSchedulerHelper cronExp="" emptyMessage="Custom empty message" />,
    );

    expect(container).toHaveTextContent(/custom empty message/i);
  });

  it('should display a custom error message', async () => {
    const { container } = render(
      <CronSchedulerHelper
        cronExp="invalid cron expression"
        errorMessage="Custom error message"
      />,
    );

    expect(container).toHaveTextContent(/custom error message/i);
  });

  it('should say "Toutes les heures"', async () => {
    await importCronSchedulerHelperLocale('fr');
    const { container } = render(
      <CronSchedulerHelper cronExp="0 */1 * * *" locale="fr" />,
    );

    expect(container).toHaveTextContent(/toutes les heures/i);
  });
});
