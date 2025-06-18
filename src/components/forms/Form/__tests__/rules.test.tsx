import { render, screen } from '@testing-library/react';

import { Input } from '@/skin/forms';

import Form from '../';
import type { RuleObject } from '../interface';

const renderFormWithInput = (
  props?: Record<string, string | number | boolean>,
  rules?: RuleObject,
) => {
  render(
    <Form>
      <Form.Field name={'value1'} rules={[rules ? rules : {}]}>
        <Input.Number {...props} data-testid="form-input" />
      </Form.Field>
    </Form>,
  );
};

describe('Field props and rules', () => {
  const props = { min: 1, max: 10 };
  it('should set props through Input', () => {
    renderFormWithInput(props);

    expect(
      screen.getByTestId('form-input').querySelector('input'),
    ).toHaveAttribute('min', '1');
    expect(
      screen.getByTestId('form-input').querySelector('input'),
    ).toHaveAttribute('max', '10');
  });
});

describe('required rules', () => {
  const renderForm = (rules?: RuleObject, input = <Input.Number />) =>
    render(
      <Form>
        <Form.Field name="value" rules={[rules ? rules : {}]} required>
          {input}
        </Form.Field>
      </Form>,
    );

  it('should be required', async () => {
    renderForm();
    expect(
      await screen.findByRole('spinbutton', { name: /value/ }),
    ).toBeRequired();
  });

  it('should be required with other rules', async () => {
    renderForm({ min: 3 });
    const input = await screen.findByRole('spinbutton', { name: /value/ });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('min', '3');
  });

  describe('vanilla rules', () => {
    it('min', async () => {
      renderForm({ min: 3, type: 'string' }, <Input.Text />);
      const input = await screen.findByRole('textbox', { name: /value/ });
      expect(input).toHaveAttribute('minlength', '3');
    });

    it('len', async () => {
      renderForm({ len: 4, type: 'string' });
      const input = await screen.findByRole('spinbutton', { name: /value/ });
      expect(input).toHaveAttribute('minlength', '4');
      expect(input).toHaveAttribute('maxlength', '4');
    });
  });
});
