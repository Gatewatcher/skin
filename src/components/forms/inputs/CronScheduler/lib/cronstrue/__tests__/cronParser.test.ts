import { CronParser } from '../cronParser';

describe('CronParser', () => {
  describe('parse', () => {
    it('should parse 5 part cron', () => {
      expect(new CronParser('* * * * *').parse().length).toEqual(7);
    });

    it('should parse 6 part cron with year', () => {
      expect(new CronParser('* * * * * 2015').parse()[6]).toEqual('2015');
      expect(new CronParser('* * * * * 2015').parse()[0]).toEqual('');
      expect(new CronParser('0/5 8-17 ? * MON-FRI *').parse()[2]).toEqual(
        '8-17',
      );
      expect(new CronParser('0 8 1 * ? *').parse()[2]).toEqual('8');
    });

    it('should error if expression is not a cron schedule', () => {
      expect(() => {
        new CronParser('sdlksCRAPdlkskl- dds').parse();
      }).toThrow('Expression has only 2 parts. At least 5 parts are required.');
    });

    it('should error if DOW part is not valid', () => {
      expect(() => {
        new CronParser('* * * * MO').parse();
      }).toThrow(`DOW part contains invalid values: 'MO'`);
    });

    it('should parse cron with multiple spaces between parts', () => {
      expect(new CronParser('30  2  *    *  *').parse().length).toEqual(7);
      expect(new CronParser('* *  * *  * 2015').parse().length).toEqual(7);
    });

    it('should parse cron with multiple commas', () => {
      expect(new CronParser('5-45/10,*/5,9 * * * *').parse().length).toEqual(7);
    });

    it('dayOfWeek specified as comma', () => {
      expect(new CronParser('*/5 * * * * ,').parse()[5]).toEqual('*');
    });

    it('dayOfWeek dangling comma', () => {
      expect(new CronParser('*/5 * * * * ,2').parse()[5]).toEqual('2');
    });
  });
});
