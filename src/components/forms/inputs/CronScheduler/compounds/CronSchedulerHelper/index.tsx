import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Helper } from '@/skin/displays';

import { getCronExpDescription } from '../../lib/utils';
import type { CronExpDescriptionOptions } from '../../types';

const DEFAULT_EMPTY_MESSAGE = 'No schedule selected';
const DEFAULT_ERROR_MESSAGE = 'This expression is invalid';

export type CronHelperProps = DataTestId & {
  emptyMessage?: string;
  errorMessage?: string;
  cronExp: string;
} & CronExpDescriptionOptions;

const CronSchedulerHelper = ({
  cronExp,
  'data-testid': testId = 'cron-scheduler-helper',
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  errorMessage = DEFAULT_ERROR_MESSAGE,
  locale,
  verbose,
}: CronHelperProps) => {
  const { description = cronExp ? errorMessage : emptyMessage, isValid } =
    getCronExpDescription(cronExp, { locale, verbose });

  return (
    <Helper
      data-testid={testId}
      variant={cronExp && !isValid ? 'error' : 'info'}
      withClose={false}
    >
      {description}
    </Helper>
  );
};

export default CronSchedulerHelper;
