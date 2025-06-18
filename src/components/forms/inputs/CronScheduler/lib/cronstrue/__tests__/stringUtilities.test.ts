import { StringUtilities } from '../stringUtilities';

describe('StringUtilities', () => {
  describe('format', () => {
    it('should format a string with no replacements', async () => {
      expect(StringUtilities.format('Test')).toEqual('Test');
    });

    it('should format a string with one replacement', async () => {
      expect(StringUtilities.format('Test %s', 'one')).toEqual('Test one');
    });

    it('should format a string with multiple replacements', async () => {
      expect(
        StringUtilities.format('Test %s %s %s', 'one', 'two', 'three'),
      ).toEqual('Test one two three');
    });
  });
});
