import cronstrue from '..';

describe('Cronstrue', () => {
  describe('every', () => {
    it('* * * * * *', async () => {
      expect(cronstrue.toString('* * * * * *')).toBe('Every second');
    });

    it('* * * * *', async () => {
      expect(cronstrue.toString('* * * * *')).toEqual('Every minute');
    });

    it('0 * * * * (verbose)', async () => {
      expect(cronstrue.toString('0 * * * *', { verbose: true })).toEqual(
        'Every hour, every day',
      );
    });

    it('* * * * * (verbose)', async () => {
      expect(cronstrue.toString('* * * * *', { verbose: true })).toEqual(
        'Every minute, every hour, every day',
      );
    });

    it('*/1 * * * *', async () => {
      expect(cronstrue.toString('*/1 * * * *')).toEqual('Every minute');
    });

    it('*/5 * * * *', async () => {
      expect(cronstrue.toString('*/5 * * * *')).toEqual('Every 5 minutes');
    });

    it('0 0/1 * * * ?', async () => {
      expect(cronstrue.toString('0 0/1 * * * ?')).toEqual('Every minute');
    });

    it('0 0 * * * ?', async () => {
      expect(cronstrue.toString('0 0 * * * ?')).toEqual('Every hour');
    });

    it('0 0 0/1 * * ?', async () => {
      expect(cronstrue.toString('0 0 0/1 * * ?')).toEqual('Every hour');
    });

    it('* * * 3 *', async () => {
      expect(cronstrue.toString('* * * 3 *')).toEqual(
        'Every minute, only in March',
      );
    });

    it('* * * 3,6 *', async () => {
      expect(cronstrue.toString('* * * 3,6 *')).toEqual(
        'Every minute, only in March and June',
      );
    });

    it('* * * * * * 2013', async () => {
      expect(cronstrue.toString('* * * * * * 2013')).toEqual(
        'Every second, only in 2013',
      );
    });

    it('* * * * * 2013', async () => {
      expect(cronstrue.toString('* * * * * 2013')).toEqual(
        'Every minute, only in 2013',
      );
    });

    it('* * * * * 2013,2014', async () => {
      expect(cronstrue.toString('* * * * * 2013,2014')).toEqual(
        'Every minute, only in 2013 and 2014',
      );
    });
  });

  describe('interval', () => {
    it('*/45 * * * * *', async () => {
      expect(cronstrue.toString('*/45 * * * * *')).toEqual('Every 45 seconds');
    });

    it('*/5 * * * *', async () => {
      expect(cronstrue.toString('*/5 * * * *')).toEqual('Every 5 minutes');
    });

    it('*/10 * * * *', async () => {
      expect(cronstrue.toString('*/10 * * * *')).toEqual('Every 10 minutes');
    });

    it('0 */5 * * * *', async () => {
      expect(cronstrue.toString('0 */5 * * * *')).toEqual('Every 5 minutes');
    });

    it('0 9-17 * * *', async () => {
      expect(cronstrue.toString('0 9-17 * * *')).toEqual(
        'Every hour, between 09:00 AM and 05:00 PM',
      );
    });

    it('0 * ? * 2/1 *', async () => {
      expect(cronstrue.toString('0 * ? * 2/1 *')).toEqual(
        'Every hour, Tuesday through Saturday',
      );
    });

    it('0 * ? * 1/1', async () => {
      expect(cronstrue.toString('0 * ? * 1/1')).toEqual(
        'Every hour, Monday through Saturday',
      );
    });

    it('0 * ? * 2/1', async () => {
      expect(cronstrue.toString('0 * ? * 2/1')).toEqual(
        'Every hour, Tuesday through Saturday',
      );
    });

    it('0 52 13 ? * 3/1', async () => {
      expect(cronstrue.toString('0 52 13 ? * 3/1')).toEqual(
        'At 01:52 PM, Wednesday through Saturday',
      );
    });
  });

  describe('ranges', () => {
    it('0 23 ? * MON-FRI', async () => {
      expect(cronstrue.toString('0 23 ? * MON-FRI')).toEqual(
        'At 11:00 PM, Monday through Friday',
      );
    });

    it('30 11 * * 1-5', async () => {
      expect(cronstrue.toString('30 11 * * 1-5')).toEqual(
        'At 11:30 AM, Monday through Friday',
      );
    });

    it('0-10 11 * * *', async () => {
      expect(cronstrue.toString('0-10 11 * * *')).toEqual(
        'Every minute between 11:00 AM and 11:10 AM',
      );
    });

    it('23 12 * Jan-Mar *', async () => {
      expect(cronstrue.toString('23 12 * Jan-Mar *')).toEqual(
        'At 12:23 PM, January through March',
      );
    });

    it('23 12 * JAN-FEB *', async () => {
      expect(cronstrue.toString('23 12 * JAN-FEB *')).toEqual(
        'At 12:23 PM, January through February',
      );
    });

    it('1 1,3-4 * * *', async () => {
      expect(cronstrue.toString('1 1,3-4 * * *')).toEqual(
        'At 1 minutes past the hour, at 01:00 AM and 03:00 AM through 04:59 AM',
      );
    });

    it('* 0 */4 * * *', async () => {
      expect(cronstrue.toString('* 0 */4 * * *')).toEqual(
        'Every second, at 0 minutes past the hour, every 4 hours',
      );
    });

    it('*/10 0 * * * *', async () => {
      expect(cronstrue.toString('*/10 0 * * * *')).toEqual(
        'Every 10 seconds, at 0 minutes past the hour',
      );
    });

    it('* 0 0 * * *', async () => {
      expect(cronstrue.toString('* 0 0 * * *')).toEqual(
        'Every second, at 0 minutes past the hour, between 12:00 AM and 12:00 AM',
      );
    });

    it('* 0 * * *', async () => {
      expect(cronstrue.toString('* 0 * * *')).toEqual(
        'Every minute, between 12:00 AM and 12:59 AM',
      );
    });

    it('* 0 * * * *', async () => {
      expect(cronstrue.toString('* 0 * * * *')).toEqual(
        'Every second, at 0 minutes past the hour',
      );
    });
  });

  describe('at', () => {
    it('30 11 * * *', async () => {
      expect(
        cronstrue.toString('30 11 * * *', {
          tzOffset: 3,
        }),
      ).toEqual('At 02:30 PM');
    });

    it('31 10 * * *', async () => {
      expect(
        cronstrue.toString('31 10 * * *', {
          tzOffset: 5.5,
        }),
      ).toEqual('At 04:01 PM');
    });

    it('29 10 * * *', async () => {
      expect(
        cronstrue.toString('29 10 * * *', {
          tzOffset: 5.5,
        }),
      ).toEqual('At 03:59 PM');
    });

    it('30 10 * * *', async () => {
      expect(
        cronstrue.toString('30 10 * * *', {
          tzOffset: 5.5,
        }),
      ).toEqual('At 04:00 PM');
    });

    it('31 10 * * *', async () => {
      expect(
        cronstrue.toString('31 10 * * *', {
          tzOffset: -1.5,
        }),
      ).toEqual('At 09:01 AM');
    });

    it('29 10 * * *', async () => {
      expect(
        cronstrue.toString('29 10 * * *', {
          tzOffset: -1.5,
        }),
      ).toEqual('At 08:59 AM');
    });

    it('30 10 * * *', async () => {
      expect(
        cronstrue.toString('30 10 * * *', {
          tzOffset: -1.5,
        }),
      ).toEqual('At 09:00 AM');
    });

    it('30 11 * * *', async () => {
      expect(
        cronstrue.toString('30 11 * * *', {
          tzOffset: 3,
          use24HourTimeFormat: true,
        }),
      ).toEqual('At 14:30');
    });

    it('30 3 * * *', async () => {
      expect(
        cronstrue.toString('30 3 * * *', {
          tzOffset: -5,
          use24HourTimeFormat: true,
        }),
      ).toEqual('At 22:30');
    });

    it('10 11 * * *', async () => {
      expect(
        cronstrue.toString('10 11 * * *', {
          tzOffset: -4,
          verbose: true,
        }),
      ).toEqual('At 07:10 AM, every day');
    });

    it('30 22 * * *', async () => {
      expect(
        cronstrue.toString('30 22 * * *', {
          tzOffset: 5,
          use24HourTimeFormat: true,
        }),
      ).toEqual('At 03:30');
    });

    it('5 1 * * 1', async () => {
      expect(
        cronstrue.toString('5 1 * * 1', {
          tzOffset: -2,
        }),
      ).toEqual('At 11:05 PM, only on Sunday');
    });

    it('5 23 * * 1', async () => {
      expect(
        cronstrue.toString('5 23 * * 1', {
          tzOffset: 2,
        }),
      ).toEqual('At 01:05 AM, only on Tuesday');
    });

    it('30 11 * * *', async () => {
      expect(cronstrue.toString('30 11 * * *')).toEqual('At 11:30 AM');
    });

    it('23 12 * * SUN', async () => {
      expect(cronstrue.toString('23 12 * * SUN')).toEqual(
        'At 12:23 PM, only on Sunday',
      );
    });

    it('30 02 14 * * *', async () => {
      expect(cronstrue.toString('30 02 14 * * *')).toEqual('At 02:02:30 PM');
    });

    it('0 0 6 1/1 * ?', async () => {
      expect(cronstrue.toString('0 0 6 1/1 * ?')).toEqual('At 06:00 AM');
    });

    it('0 5 0/1 * * ?', async () => {
      expect(cronstrue.toString('0 5 0/1 * * ?')).toEqual(
        'At 5 minutes past the hour',
      );
    });

    it('46 9 * * 1', async () => {
      expect(cronstrue.toString('46 9 * * 1')).toEqual(
        'At 09:46 AM, only on Monday',
      );
    });

    it('46 9 * * 7', async () => {
      // 7 should mean sunday.
      expect(cronstrue.toString('46 9 * * 7')).toEqual(
        'At 09:46 AM, only on Sunday',
      );
    });

    it('23 12 15 * *', async () => {
      expect(cronstrue.toString('23 12 15 * *')).toEqual(
        'At 12:23 PM, on day 15 of the month',
      );
    });

    it('23 12 * JAN *', async () => {
      expect(cronstrue.toString('23 12 * JAN *')).toEqual(
        'At 12:23 PM, only in January',
      );
    });

    it('23 12 ? JAN *', async () => {
      expect(cronstrue.toString('23 12 ? JAN *')).toEqual(
        'At 12:23 PM, only in January',
      );
    });

    it('0 7 * * *', async () => {
      // Trailing space.
      expect(cronstrue.toString('0 7 * * *')).toEqual('At 07:00 AM');
    });

    it('30 14,16 * * *', async () => {
      expect(cronstrue.toString('30 14,16 * * *')).toEqual(
        'At 02:30 PM and 04:30 PM',
      );
    });

    it('30 6,14,16 * * *', async () => {
      expect(cronstrue.toString('30 6,14,16 * * *')).toEqual(
        'At 06:30 AM, 02:30 PM and 04:30 PM',
      );
    });

    it('0 * 31 * 1', async () => {
      expect(cronstrue.toString('0 * 31 * 1')).toEqual(
        'Every hour, on day 31 of the month, and on Monday',
      );
    });

    it('0 45 12 22,17,6,30,26 * *', async () => {
      expect(cronstrue.toString('0 45 12 22,17,6,30,26 * *')).toEqual(
        'At 12:45 PM, on day 6, 17, 22, 26, and 30 of the month',
      );
    });
  });

  describe('weekday', () => {
    it('* * LW * *', async () => {
      expect(cronstrue.toString('* * LW * *')).toEqual(
        'Every minute, on the last weekday of the month',
      );
    });

    it('* * WL * *', async () => {
      expect(cronstrue.toString('* * WL * *')).toEqual(
        'Every minute, on the last weekday of the month',
      );
    });

    it('* * 1W * *', async () => {
      expect(cronstrue.toString('* * 1W * *')).toEqual(
        'Every minute, on the first weekday of the month',
      );
    });

    it('* * 13W * *', async () => {
      expect(cronstrue.toString('* * 13W * *')).toEqual(
        'Every minute, on the weekday nearest day 13 of the month',
      );
    });

    it('* * W1 * *', async () => {
      expect(cronstrue.toString('* * W1 * *')).toEqual(
        'Every minute, on the first weekday of the month',
      );
    });

    it('* * 5W * *', async () => {
      expect(cronstrue.toString('* * 5W * *')).toEqual(
        'Every minute, on the weekday nearest day 5 of the month',
      );
    });

    it('* * W5 * *', async () => {
      expect(cronstrue.toString('* * W5 * *')).toEqual(
        'Every minute, on the weekday nearest day 5 of the month',
      );
    });
  });

  describe('last', () => {
    it('* * * * 4L', async () => {
      expect(cronstrue.toString('* * * * 4L')).toEqual(
        'Every minute, on the last Thursday of the month',
      );
    });

    it('*/5 * L JAN *', async () => {
      expect(cronstrue.toString('*/5 * L JAN *')).toEqual(
        'Every 5 minutes, on the last day of the month, only in January',
      );
    });

    it('0 20 15,L * *', async () => {
      expect(cronstrue.toString('0 20 15,L * *')).toEqual(
        'At 08:00 PM, on day 15 and the last day of the month',
      );
    });

    it('0 20 1-10,20-L * *', async () => {
      expect(cronstrue.toString('0 20 1-10,20-L * *')).toEqual(
        'At 08:00 PM, on day 1 through 10 and 20 through the last day of the month',
      );
    });

    it('0 15 10 * * L', async () => {
      expect(cronstrue.toString('0 15 10 * * L')).toEqual(
        'At 10:15 AM, only on Saturday',
      );
    });

    it('0 15 10 L * *', async () => {
      expect(cronstrue.toString('0 15 10 L * *')).toEqual(
        'At 10:15 AM, on the last day of the month',
      );
    });

    it('0 0 0 L-5 * ?', async () => {
      expect(cronstrue.toString('0 0 0 L-5 * ?')).toEqual(
        'At 12:00 AM, 5 days before the last day of the month',
      );
    });
  });

  describe('dayOfWeekStartIndexZero=false', () => {
    it('23 12 * * 1#2', async () => {
      expect(
        cronstrue.toString('23 12 * * 1#2', {
          dayOfWeekStartIndexZero: false,
        }),
      ).toEqual('At 12:23 PM, on the second Sunday of the month');
    });

    it('* * * ? * 2-6/2', async () => {
      expect(
        cronstrue.toString('* * * ? * 2-6/2', {
          dayOfWeekStartIndexZero: false,
        }),
      ).toEqual(
        'Every second, every 2 days of the week, Monday through Friday',
      );
    });

    it('* * * ? * 7', async () => {
      expect(
        cronstrue.toString('* * * ? * 7', {
          dayOfWeekStartIndexZero: false,
        }),
      ).toEqual('Every second, only on Saturday');
    });

    it('* * * ? * 1,2,3,4,5', async () => {
      expect(
        cronstrue.toString('* * * ? * 1,2,3,4,5', {
          dayOfWeekStartIndexZero: false,
        }),
      ).toEqual(
        'Every second, only on Sunday, Monday, Tuesday, Wednesday, and Thursday',
      );
    });

    it('0 * ? * 1/1', async () => {
      expect(
        cronstrue.toString('0 * ? * 1/1', {
          dayOfWeekStartIndexZero: false,
        }),
      ).toEqual('Every hour, Sunday through Saturday');
    });

    it('0 * ? * 2/1', async () => {
      expect(
        cronstrue.toString('0 * ? * 2/1', {
          dayOfWeekStartIndexZero: false,
        }),
      ).toEqual('Every hour, Monday through Saturday');
    });
  });

  describe('monthStartIndexZero=true', () => {
    it('* * * 7 *', async () => {
      expect(
        cronstrue.toString('* * * 7 *', {
          monthStartIndexZero: true,
        }),
      ).toEqual('Every minute, only in August');
    });

    it('30 * * 6-8 *', async () => {
      expect(
        cronstrue.toString('30 * * 6-8 *', {
          monthStartIndexZero: true,
        }),
      ).toEqual('At 30 minutes past the hour, July through September');
    });

    it('30 * * 1-10/2 *', async () => {
      expect(
        cronstrue.toString('30 * * 1-10/2 *', {
          monthStartIndexZero: true,
        }),
      ).toEqual(
        'At 30 minutes past the hour, every 2 months, February through November',
      );
    });

    it('30 * * 4,5,6 *', async () => {
      expect(
        cronstrue.toString('30 * * 4,5,6 *', {
          monthStartIndexZero: true,
        }),
      ).toEqual('At 30 minutes past the hour, only in May, June, and July');
    });

    it('30 * * JAN *', async () => {
      expect(
        cronstrue.toString('30 * * JAN *', {
          monthStartIndexZero: true,
        }),
      ).toEqual('At 30 minutes past the hour, only in January');
    });
  });

  describe('non-trivial expressions', () => {
    it('*/5 15 * * MON-FRI', async () => {
      expect(cronstrue.toString('*/5 15 * * MON-FRI')).toEqual(
        'Every 5 minutes, between 03:00 PM and 03:59 PM, Monday through Friday',
      );
    });

    it('* * * * MON#3', async () => {
      expect(cronstrue.toString('* * * * MON#3')).toEqual(
        'Every minute, on the third Monday of the month',
      );
    });

    it('* * * * MON#3,THU#1', async () => {
      expect(cronstrue.toString('* * * * MON#3,THU#1')).toEqual(
        'Every minute, on the third Monday and first Thursday of the month',
      );
    });

    it('5-10 * * * * *', async () => {
      expect(cronstrue.toString('5-10 * * * * *')).toEqual(
        'Seconds 5 through 10 past the minute',
      );
    });

    it('5-10 30-35 10-12 * * *', async () => {
      expect(cronstrue.toString('5-10 30-35 10-12 * * *')).toEqual(
        'Seconds 5 through 10 past the minute, minutes 30 through 35 past the hour, between 10:00 AM and 12:59 PM',
      );
    });

    it('30 */5 * * * *', async () => {
      expect(cronstrue.toString('30 */5 * * * *')).toEqual(
        'At 30 seconds past the minute, every 5 minutes',
      );
    });

    it('10 0/5 * * * ?', async () => {
      expect(cronstrue.toString('10 0/5 * * * ?')).toEqual(
        'At 10 seconds past the minute, every 5 minutes',
      );
    });

    it('2-59/3 1,9,22 11-26 1-6 ?', async () => {
      expect(cronstrue.toString('2-59/3 1,9,22 11-26 1-6 ?')).toEqual(
        'Every 3 minutes, minutes 2 through 59 past the hour, at 01:00 AM, 09:00 AM, and 10:00 PM, between day 11 and 26 of the month, January through June',
      );
    });

    it('23 12 * JAN-FEB * 2013-2014', async () => {
      expect(cronstrue.toString('23 12 * JAN-FEB * 2013-2014')).toEqual(
        'At 12:23 PM, January through February, 2013 through 2014',
      );
    });

    it('23 12 * JAN-MAR * 2013-2015', async () => {
      expect(cronstrue.toString('23 12 * JAN-MAR * 2013-2015')).toEqual(
        'At 12:23 PM, January through March, 2013 through 2015',
      );
    });

    it('12-50 0-10 6 * * * 2022', async () => {
      expect(cronstrue.toString('12-50 0-10 6 * * * 2022')).toEqual(
        'Seconds 12 through 50 past the minute, minutes 0 through 10 past the hour, at 06:00 AM, only in 2022',
      );
    });

    it('0 0/30 8-9 5,20 * ?', async () => {
      expect(cronstrue.toString('0 0/30 8-9 5,20 * ?')).toEqual(
        'Every 30 minutes, between 08:00 AM and 09:59 AM, on day 5 and 20 of the month',
      );
    });

    it('23 12 * * SUN#2', async () => {
      expect(cronstrue.toString('23 12 * * SUN#2')).toEqual(
        'At 12:23 PM, on the second Sunday of the month',
      );
    });

    it('0 25 7-19/8 ? * *', async () => {
      expect(cronstrue.toString('0 25 7-19/8 ? * *')).toEqual(
        'At 25 minutes past the hour, every 8 hours, between 07:00 AM and 07:59 PM',
      );
    });

    it('0 25 7-20/13 ? * *', async () => {
      expect(cronstrue.toString('0 25 7-20/13 ? * *')).toEqual(
        'At 25 minutes past the hour, every 13 hours, between 07:00 AM and 08:59 PM',
      );
    });

    it('0 0 8 1/3 * ? *', async () => {
      expect(cronstrue.toString('0 0 8 1/3 * ? *')).toEqual(
        'At 08:00 AM, every 3 days',
      );
    });

    it('0 15 10 ? * */3', async () => {
      expect(cronstrue.toString('0 15 10 ? * */3')).toEqual(
        'At 10:15 AM, every 3 days of the week',
      );
    });

    it('* * * ? * 1-5/2', async () => {
      expect(cronstrue.toString('* * * ? * 1-5/2')).toEqual(
        'Every second, every 2 days of the week, Monday through Friday',
      );
    });

    it('0 5 7 2 1/3 ? *', async () => {
      expect(cronstrue.toString('0 5 7 2 1/3 ? *')).toEqual(
        'At 07:05 AM, on day 2 of the month, every 3 months',
      );
    });

    it('0 15 6 1 1 ? 1/2', async () => {
      expect(cronstrue.toString('0 15 6 1 1 ? 1/2')).toEqual(
        'At 06:15 AM, on day 1 of the month, only in January, every 2 years',
      );
    });

    it('2,4-5 1 * * *', async () => {
      expect(cronstrue.toString('2,4-5 1 * * *')).toEqual(
        'At 2 and 4 through 5 minutes past the hour, at 01:00 AM',
      );
    });

    it('2,26-28 18 * * *', async () => {
      expect(cronstrue.toString('2,26-28 18 * * *')).toEqual(
        'At 2 and 26 through 28 minutes past the hour, at 06:00 PM',
      );
    });

    it('5/30 * * * * ?', async () => {
      expect(cronstrue.toString('5/30 * * * * ?')).toEqual(
        'Every 30 seconds, starting at 5 seconds past the minute',
      );
    });

    it('0 5/30 * * * ?', async () => {
      expect(cronstrue.toString('0 5/30 * * * ?')).toEqual(
        'Every 30 minutes, starting at 5 minutes past the hour',
      );
    });

    it('* * 5/8 * * ?', async () => {
      expect(cronstrue.toString('* * 5/8 * * ?')).toEqual(
        'Every second, every 8 hours, starting at 05:00 AM',
      );
    });

    it('0 5 7 2/3 * ? *', async () => {
      expect(cronstrue.toString('0 5 7 2/3 * ? *')).toEqual(
        'At 07:05 AM, every 3 days, starting on day 2 of the month',
      );
    });

    it('0 5 7 ? 3/2 ? *', async () => {
      expect(cronstrue.toString('0 5 7 ? 3/2 ? *')).toEqual(
        'At 07:05 AM, every 2 months, March through December',
      );
    });

    it('0 5 7 ? * 2/3 *', async () => {
      expect(cronstrue.toString('0 5 7 ? * 2/3 *')).toEqual(
        'At 07:05 AM, every 3 days of the week, Tuesday through Saturday',
      );
    });

    it('0 5 7 ? * ? 2016/4', async () => {
      expect(cronstrue.toString('0 5 7 ? * ? 2016/4')).toEqual(
        'At 07:05 AM, every 4 years, 2016 through 9999',
      );
    });

    it('0 30 10-13 ? * wed,FRI', async () => {
      expect(cronstrue.toString('0 30 10-13 ? * wed,FRI')).toEqual(
        'At 30 minutes past the hour, between 10:00 AM and 01:59 PM, only on Wednesday and Friday',
      );
    });

    it('0 00 10 ? * MON-THU,SUN *', async () => {
      expect(cronstrue.toString('0 00 10 ? * MON-THU,SUN *')).toEqual(
        'At 10:00 AM, only on Monday through Thursday and Sunday',
      );
    });

    it('0 0 0 1,2,3 * WED,FRI', async () => {
      expect(cronstrue.toString('0 0 0 1,2,3 * WED,FRI')).toEqual(
        'At 12:00 AM, on day 1, 2, and 3 of the month, and on Wednesday and Friday',
      );
    });

    it('0 2,16 1,8,15,22 * 1,2', async () => {
      expect(cronstrue.toString('0 2,16 1,8,15,22 * 1,2')).toEqual(
        'At 02:00 AM and 04:00 PM, on day 1, 8, 15, and 22 of the month, and on Monday and Tuesday',
      );
    });

    it('0 */4,6 * * * ', async () => {
      expect(cronstrue.toString('0 */4,6 * * * ')).toEqual(
        'At 0 minutes past the hour, every 4 hours and at 06:00 AM',
      );
    });

    it('5 30 6,14,16 5 * *', async () => {
      expect(cronstrue.toString('5 30 6,14,16 5 * *')).toEqual(
        'At 5 seconds past the minute, at 30 minutes past the hour, at 06:00 AM, 02:00 PM, and 04:00 PM, on day 5 of the month',
      );
    });

    it('0-20/3 9 * * *', async () => {
      expect(cronstrue.toString('0-20/3 9 * * *')).toEqual(
        'Every 3 minutes, minutes 0 through 20 past the hour, between 09:00 AM and 09:59 AM',
      );
    });

    it('5-45/10,*/5,9 * * * *', async () => {
      expect(cronstrue.toString('5-45/10,*/5,9 * * * *')).toEqual(
        'Every 10 minutes, minutes 5 through 45 past the hour, every 5 minutes, and at 9 minutes past the hour',
      );
    });
  });

  describe('verbose', () => {
    it('30 4 1 * *', async () => {
      expect(cronstrue.toString('30 4 1 * *', { verbose: true })).toEqual(
        'At 04:30 AM, on day 1 of the month',
      );
    });

    it('0 13 * * 1', async () => {
      expect(cronstrue.toString('0 13 * * 1', { verbose: true })).toEqual(
        'At 01:00 PM, only on Monday',
      );
    });
  });

  describe('errors', () => {
    it('second out of range', async () => {
      expect(() => {
        cronstrue.toString('61 * * * * *');
      }).toThrow('seconds part must be >= 0 and <= 59');
    });

    it('minute out of range', async () => {
      expect(() => {
        cronstrue.toString('0 -1 * * * *');
      }).toThrow('minutes part must be >= 0 and <= 59');
    });

    it('hour out of range', async () => {
      expect(() => {
        cronstrue.toString('0 0 24 * * *');
      }).toThrow('hours part must be >= 0 and <= 23');
    });

    it('dayOfMonth out of range', async () => {
      expect(() => {
        cronstrue.toString('0 0 0 32 * *');
      }).toThrow('DOM part must be >= 1 and <= 31');
    });

    it('month out of range', async () => {
      expect(() => {
        cronstrue.toString('0 0 0 1 13 *', { monthStartIndexZero: false });
      }).toThrow('month part must be >= 1 and <= 12');

      expect(() => {
        cronstrue.toString('0 0 0 1 13 *', { monthStartIndexZero: true });
      }).toThrow('month part must be >= 0 and <= 11');
    });

    it('dayOfWeek out of range', async () => {
      expect(() => {
        cronstrue.toString('0 0 0 1 12 8', { dayOfWeekStartIndexZero: true });
      }).toThrow('DOW part must be >= 0 and <= 6');

      expect(() => {
        cronstrue.toString('0 0 0 1 12 8', { dayOfWeekStartIndexZero: false });
      }).toThrow('DOW part must be >= 1 and <= 7');
    });

    it('garbage expression', async () => {
      expect(() => {
        cronstrue.toString('sdlksldksldksd');
      }).toThrow(
        'Error: Expression has only 1 part. At least 5 parts are required.',
      );
    });

    it('empty expression', async () => {
      expect(() => {
        cronstrue.toString('');
      }).toThrow('Error: cron expression is empty');
    });

    it('null expression', async () => {
      expect(() => {
        cronstrue.toString(null as unknown as string);
      }).toThrow('Error: cron expression is empty');
    });

    it('undefined expression', async () => {
      expect(() => {
        cronstrue.toString('');
      }).toThrow('Error: cron expression is empty');
    });

    it("'W' list is invalid", () => {
      expect(() => {
        cronstrue.toString('0 30 14 1W,15W * ? *');
      }).toThrow(
        "Error: The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.",
      );
    });

    it('garbage expression with option (throwExceptionOnParseError = false)', async () => {
      expect(
        cronstrue.toString('garbage', { throwExceptionOnParseError: false }),
      ).toEqual(
        'An error occured when generating the expression description.  Check the cron expression syntax.',
      );
    });
  });
});
