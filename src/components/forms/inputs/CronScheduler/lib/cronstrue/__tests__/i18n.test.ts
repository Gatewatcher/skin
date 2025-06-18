import cronstrue from '../i18n';

describe('i18n', () => {
  describe('fr', () => {
    it('* * * * *', async () => {
      expect(cronstrue.toString('* * * * *', { locale: 'fr' })).toEqual(
        'Toutes les minutes',
      );
    });

    it('*/5 15 * * MON-FRI', async () => {
      expect(
        cronstrue.toString('*/5 15 * * MON-FRI', { locale: 'fr' }),
      ).toEqual('Toutes les 5 minutes, de 15:00 à 15:59, de lundi à vendredi');
    });
  });
});
