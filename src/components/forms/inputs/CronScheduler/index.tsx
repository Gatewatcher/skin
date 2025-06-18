import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useState } from 'react';

import { Button } from '@/skin/actions';
import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import SimpleScheduler from './components/SimpleScheduler';
import CronSchedulerHelper from './compounds/CronSchedulerHelper';
import type { Schedule, WeekDays } from './types';
import {
  cronExpToScheduleOrNull,
  isScheduleValid,
  scheduleToCronExpression,
} from './utils';

export type CronSchedulerProps = DataTestId & {
  initialValue?: string;
  onChange?: (cronExp: string) => void;
  weekDays?: WeekDays;
};

const CronScheduler = ({
  'data-testid': testId = 'cron-scheduler',
  initialValue,
  onChange,
  weekDays,
}: CronSchedulerProps) => {
  const initialSchedule = initialValue
    ? cronExpToScheduleOrNull(initialValue)
    : {};

  const [isBasicView, setIsBasicView] = useState(!!initialSchedule);
  const [cronExp, setCronExp] = useState(initialValue);
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule ?? {});

  const handleToggleView = () => {
    setIsBasicView(!isBasicView);
    setSchedule({});
    handleCronExpChange('');
  };

  const handleScheduleChange = (schedule: Schedule) => {
    setSchedule(schedule);
    handleCronExpChange(
      isScheduleValid(schedule) ? scheduleToCronExpression(schedule) : '',
    );
  };

  const handleCronExpChange = (cronExp: string) => {
    setCronExp(cronExp);
    onChange?.(cronExp);
  };

  return (
    <Stack data-testid={testId} direction="column" gap={8}>
      <Button onClick={handleToggleView} variant="transparent">
        {`Switch to ${isBasicView ? 'cron' : 'basic'} view`}
      </Button>
      {isBasicView ? (
        <SimpleScheduler
          onChange={handleScheduleChange}
          value={schedule}
          weekDays={weekDays}
        />
      ) : (
        <Input.Text
          meta={{
            helpers: [
              'Example: * * * * * means every minute',
              'Example: 30 8 * * 1 means at 08:30 AM, only on Monday',
            ],
          }}
          label="Cron expression"
          onChange={({ target }) => handleCronExpChange(target.value)}
          placeholder="Enter your cron expression here..."
          value={cronExp}
        />
      )}
    </Stack>
  );
};

CronScheduler.Helper = CronSchedulerHelper;

export default CronScheduler;
