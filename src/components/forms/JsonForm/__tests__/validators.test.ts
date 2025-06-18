import { and, ifElse, not, or } from '../utils/validators/combinators';
import { createValidator } from '../utils/validators/validator';

const validators = {
  pass: () => createValidator(async () => {}),
  fail: (message?: string) =>
    createValidator(async () => {
      throw new Error(message);
    }),
};

describe('validators', () => {
  it('should fail', async () => {
    await expect(validators.fail()).rejects.toThrow(new Error());
  });

  it('should fail with custom message', async () => {
    await expect(validators.fail().message('Validator failed')).rejects.toThrow(
      new Error('Validator failed'),
    );
  });
});

describe('combinators', () => {
  describe('and', () => {
    it('should pass', async () => {
      const validator = and(
        validators.pass(),
        validators.pass(),
        validators.pass(),
      );

      await expect(validator()).resolves.not.toThrow();
    });

    it('should fail', async () => {
      const validator = and(
        validators.pass(),
        validators.fail('2'),
        validators.pass(),
      );

      await expect(validator()).rejects.toThrow(new Error('2'));
    });

    it('should fail with custom message', async () => {
      const validator = and(
        validators.pass(),
        validators.fail('2'),
        validators.pass(),
      ).message('AND failed');

      await expect(validator()).rejects.toThrow(new Error('AND failed'));
    });
  });

  describe('or', () => {
    it('should pass', async () => {
      const validator = or(
        validators.fail('1'),
        validators.pass(),
        validators.fail('2'),
      );

      await expect(validator()).resolves.not.toThrow();
    });

    it('should fail', async () => {
      const validator = or(
        validators.fail('1'),
        validators.fail('2'),
        validators.fail('3'),
      );

      await expect(validator()).rejects.toThrow(new Error('3'));
    });

    it('should fail with custom message', async () => {
      const validator = or(
        validators.fail('1'),
        validators.fail('2'),
        validators.fail('3'),
      ).message('OR failed');

      await expect(validator()).rejects.toThrow(new Error('OR failed'));
    });
  });

  describe('not', () => {
    it('should pass', async () => {
      const validator = not(validators.fail('1'));
      await expect(validator()).resolves.not.toThrow();
    });

    it('should fail', async () => {
      const validator = not(validators.pass());
      await expect(validator()).rejects.toThrow(new Error());
    });

    it('should fail with custom message', async () => {
      const validator = not(validators.pass()).message('NOT failed');
      await expect(validator()).rejects.toThrow(new Error('NOT failed'));
    });
  });

  describe('ifElse', () => {
    it('should pass', async () => {
      const validator = ifElse({
        if: validators.fail(),
        then: validators.pass(),
      });
      await expect(validator()).resolves.not.toThrow();
    });

    it('should fail', async () => {
      const validator = ifElse({
        if: validators.pass(),
        then: validators.fail(),
      });
      await expect(validator()).rejects.toThrow(new Error());
    });

    it('should fail with custom message', async () => {
      const validator = ifElse({
        if: validators.pass(),
        then: validators.fail(),
      }).message('IF failed');
      await expect(validator()).rejects.toThrow(new Error('IF failed'));
    });

    it('should fail the truthy path with custom message', async () => {
      const validator = ifElse({
        if: validators.pass(),
        then: validators.fail().message('IF(ok) failed'),
      });
      await expect(validator()).rejects.toThrow(new Error('IF(ok) failed'));
    });

    it('should fail the falsy path with custom message', async () => {
      const validator = ifElse({
        if: validators.fail(),
        then: validators.pass(),
        else: validators.fail().message('IF(error) failed'),
      });
      await expect(validator()).rejects.toThrow(new Error('IF(error) failed'));
    });
  });
});

describe('complex cases', () => {
  it('should pass', async () => {
    const validator = and(
      validators.pass(),
      not(validators.fail()),
      or(validators.fail(), validators.pass()),
      and(not(validators.fail()), not(not(validators.pass()))),
      not(and(validators.fail(), validators.pass())),
    );

    await expect(validator()).resolves.not.toThrow();
  });

  it('should fail with custom message', async () => {
    const validator = and(
      validators.pass(),
      validators.fail().message('Sub validator failed'),
      or(validators.fail(), validators.pass()),
      and(not(validators.fail()), not(not(validators.pass()))),
      not(and(validators.fail(), validators.pass())),
      ifElse({
        if: validators.pass(),
        then: validators.fail(),
      }),
    );

    await expect(validator()).rejects.toThrow(
      new Error('Sub validator failed'),
    );
  });

  it('should fail with custom message', async () => {
    const validator = and(
      validators.pass(),
      not(validators.fail()),
      or(
        validators.fail(),
        not(validators.pass()).message('Sub validator failed'),
      ),
      and(not(validators.fail()), not(not(validators.pass()))),
      not(and(validators.fail(), validators.pass())),
      ifElse({
        if: validators.pass(),
        then: validators.fail(),
      }),
    );

    await expect(validator()).rejects.toThrow(
      new Error('Sub validator failed'),
    );
  });

  it('should fail with custom message', async () => {
    const validator = and(
      validators.pass(),
      not(validators.fail()),
      or(
        validators.fail(),
        not(validators.pass()).message('Sub validator failed'),
      ).message('Middle validator failed'),
      and(not(validators.fail()), not(not(validators.pass()))),
      not(and(validators.fail(), validators.pass())),
      ifElse({
        if: validators.pass(),
        then: validators.fail(),
      }),
    );

    await expect(validator()).rejects.toThrow(
      new Error('Middle validator failed'),
    );
  });

  it('should fail with custom message', async () => {
    const validator = and(
      validators.pass(),
      not(validators.fail()),
      and(not(validators.fail()), not(not(validators.pass()))),
      or(
        validators.fail(),
        not(validators.pass()).message('Sub validator failed'),
      ),
      not(and(validators.fail(), validators.pass())),
      ifElse({
        if: validators.pass(),
        then: validators.fail(),
      }),
    ).message('Super validator failed');

    await expect(validator()).rejects.toThrow(
      new Error('Super validator failed'),
    );
  });
});
