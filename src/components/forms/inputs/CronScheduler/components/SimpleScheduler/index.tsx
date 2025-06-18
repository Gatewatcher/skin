import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ChangeEvent } from 'react';

import { Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import type { Period, Schedule, WeekDays } from '../../types';
import { isDaySchedule, isEverySchedule } from '../../utils';
import DaysSelector from '../DaysSelector';
import { PERIOD_OPTIONS } from './constants';

export type SchedulerProps = DataTestId & {
  onChange: (schedule: Schedule) => void;
  value: Schedule;
  weekDays?: WeekDays;
};

const SimpleScheduler = ({
  'data-testid': testId = 'simple-scheduler',
  onChange,
  value,
  weekDays,
}: SchedulerProps) => {
  const schedule = value;

  const handlePeriodChange = (period: Period | undefined) => {
    if (!period || period === schedule.period) return;

    const shouldResetDayParams = isDaySchedule({ period });
    const shouldKeepEveryParams =
      isEverySchedule({ period }) && !isDaySchedule(schedule);

    onChange({
      period: period,
      ...(shouldKeepEveryParams && { every: schedule.every }),
      ...(shouldResetDayParams && { hours: 0, minutes: 0 }),
      days: schedule.days,
    });
  };

  const getChangeValueHandler = (key: string) => {
    return ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(target.value, 10);

      onChange({
        ...schedule,
        [key]: isNaN(value) ? undefined : value,
      });
    };
  };

  const handleChangeEvery = getChangeValueHandler('every');
  const handleChangeHours = getChangeValueHandler('hours');
  const handleChangeMinutes = getChangeValueHandler('minutes');

  const handleChangeDays = (days: number[]) => {
    onChange({ ...schedule, days });
  };

  const hoursOrMinutesMax = schedule.period === 'hours' ? 23 : 59;

  return (
    <Stack data-testid={testId} direction="column">
      <Stack gap={8}>
        <Stack.Item flexBasis="0px" flexGrow={1} flexShrink={0}>
          <Input.Select
            isClearable={false}
            label="Period"
            onChange={value => handlePeriodChange(value?.value)}
            options={PERIOD_OPTIONS}
            value={schedule?.period}
            required
          />
        </Stack.Item>
        <Stack.Item flexBasis="0px" flexGrow={1} flexShrink={0}>
          {isDaySchedule(schedule) ? (
            <Stack gap={8}>
              <Stack.Item flexBasis="0px" flexGrow={1} flexShrink={0}>
                <Input.Number
                  label="Hours"
                  max={23}
                  meta={{ helpers: ['Min: 0, Max: 23'] }}
                  min={0}
                  onChange={handleChangeHours}
                  value={schedule.hours}
                  required
                />
              </Stack.Item>
              <Stack.Item flexBasis="0px" flexGrow={1} flexShrink={0}>
                <Input.Number
                  label="Minutes"
                  max={59}
                  meta={{ helpers: ['Min: 0, Max: 59'] }}
                  min={0}
                  onChange={handleChangeMinutes}
                  value={schedule.minutes}
                  required
                />
              </Stack.Item>
            </Stack>
          ) : (
            <Input.Number
              disabled={!schedule}
              label="Every"
              max={hoursOrMinutesMax}
              meta={{ helpers: [`Min: 1, Max: ${hoursOrMinutesMax}`] }}
              min={1}
              onChange={handleChangeEvery}
              value={schedule.every ?? ''}
              required
            />
          )}
        </Stack.Item>
      </Stack>
      <DaysSelector
        label="On"
        onChange={handleChangeDays}
        value={schedule?.days ?? []}
        weekDays={weekDays}
      />
    </Stack>
  );
};

export default SimpleScheduler;
