import { cronExpToScheduleOrNull, scheduleToCronExpression } from '..';
import type { DaysSchedule, EverySchedule, Schedule } from '../../types';

describe('CronScheduler utils unit tests', () => {
  describe('scheduleToCronExp', () => {
    it('should convert from a "days schedule" (at HH:MM) - every day', async () => {
      const input: Schedule = {
        period: 'days',
        hours: 21,
        minutes: 30,
      };
      const result = scheduleToCronExpression(input);
      expect(result).toEqual('30 21 * * *');
    });

    it('should convert from a "days schedule" (at HH:MM) - some days', async () => {
      const input: Schedule = {
        period: 'days',
        hours: 21,
        minutes: 30,
        days: [0, 6],
      };
      const result = scheduleToCronExpression(input);
      expect(result).toEqual('30 21 * * 0,6');
    });

    it('should convert from an "hours schedule" (every N hours) - every day', async () => {
      const input: Schedule = {
        period: 'hours',
        every: 6,
      };
      const result = scheduleToCronExpression(input);
      expect(result).toEqual('0 */6 * * *');
    });

    it('should convert from an "hours schedule" (every N hours) - some days', async () => {
      const input: Schedule = {
        period: 'hours',
        every: 6,
        days: [0, 6],
      };
      const result = scheduleToCronExpression(input);
      expect(result).toEqual('0 */6 * * 0,6');
    });

    it('should convert from a "minutes schedule" (every N minutes) - every day', async () => {
      const input: Schedule = {
        period: 'minutes',
        every: 15,
      };
      const result = scheduleToCronExpression(input);
      expect(result).toEqual('*/15 * * * *');
    });

    it('should convert from a "minutes schedule" (every N minutes) - some days', async () => {
      const input: Schedule = {
        period: 'minutes',
        every: 15,
        days: [0, 6],
      };
      const result = scheduleToCronExpression(input);
      expect(result).toEqual('*/15 * * * 0,6');
    });
  });

  describe('cronExpToSchedule', () => {
    it('should convert to a "days schedule" (at HH:MM) - every day', async () => {
      const expected: DaysSchedule = {
        period: 'days',
        hours: 21,
        minutes: 45,
      };
      const result = cronExpToScheduleOrNull('45 21 * * *');

      expect(result).toEqual(expected);
    });

    it('should convert to a "days schedule" (at HH:MM) - some days', async () => {
      const expected: DaysSchedule = {
        period: 'days',
        hours: 21,
        minutes: 45,
        days: [0, 6],
      };
      const result = cronExpToScheduleOrNull('45 21 * * 0,6');

      expect(result).toEqual(expected);
    });

    it('should convert to an "hours schedule" (every N hours) - every day', async () => {
      const expected: EverySchedule = {
        period: 'hours',
        every: 2,
      };
      const result = cronExpToScheduleOrNull('0 */2 * * *');

      expect(result).toEqual(expected);
    });

    it('should convert to an "hours schedule" (every N hours) - some days', async () => {
      const expected: EverySchedule = {
        period: 'hours',
        every: 12,
        days: [0, 6],
      };
      const result = cronExpToScheduleOrNull('0 */12 * * 0,6');

      expect(result).toEqual(expected);
    });

    it('should convert to a "minutes schedule" (every N minutes) - every day', async () => {
      const expected: EverySchedule = {
        period: 'minutes',
        every: 5,
      };
      const result = cronExpToScheduleOrNull('*/5 * * * *');

      expect(result).toEqual(expected);
    });

    it('should convert to a "minutes schedule" (every N minutes) - some days', async () => {
      const expected: EverySchedule = {
        period: 'minutes',
        every: 25,
        days: [0, 6],
      };
      const result = cronExpToScheduleOrNull('*/25 * * * 0,6');

      expect(result).toEqual(expected);
    });

    it('should convert to a "minutes schedule" (every 1 minute) - every day', async () => {
      const expected: EverySchedule = {
        period: 'minutes',
        every: 1,
      };
      const result = cronExpToScheduleOrNull('* * * * *');

      expect(result).toEqual(expected);
    });

    it('should convert to a "minutes schedule" (every 1 minute) - every day', async () => {
      const expected: EverySchedule = {
        period: 'minutes',
        every: 1,
        days: [0, 6],
      };
      const result = cronExpToScheduleOrNull('* * * * 0,6');

      expect(result).toEqual(expected);
    });

    it('should not be representable with a schedule', async () => {
      let result = cronExpToScheduleOrNull('* 1 * * *');
      result &&= cronExpToScheduleOrNull('* * 1 * *');
      result &&= cronExpToScheduleOrNull('* * * 1 *');
      result &&= cronExpToScheduleOrNull('*/15 1 * * *');
      expect(result).toBeNull();
    });
  });
});
