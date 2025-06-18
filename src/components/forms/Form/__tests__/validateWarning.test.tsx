import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from '../';
import type { FormInstance, Rule } from '../interface';
import InfoField, { Input, expectToBeVisibleByText } from './utils';

describe('Form.WarningValidate', () => {
  const user = userEvent.setup();

  it('required', async () => {
    let form: FormInstance | null = {} as FormInstance;

    render(
      <Form
        ref={f => {
          form = f;
        }}
      >
        <InfoField
          rules={[
            {
              required: true,
              warningOnly: true,
            },
          ]}
          name="name"
        >
          <Input data-testid="input" />
        </InfoField>
      </Form>,
    );

    await user.type(screen.getByTestId('input'), 'plop');
    await user.clear(screen.getByTestId('input'));
    await expectToBeVisibleByText({ text: 'name is required' });

    expect(form.getFieldWarning('name')).toEqual(['name is required']);
  });

  describe('validateFirst should not block error', () => {
    const testValidateFirst = async (
      name: string,
      validateFirst: boolean | 'parallel',
      additionalRule?: Rule,
      errorMessage?: string,
    ) => {
      it(name, async () => {
        const rules = [
          additionalRule,
          {
            type: 'string',
            len: 10,
            warningOnly: true,
          },
          {
            type: 'url',
          },
          {
            type: 'string',
            len: 20,
            warningOnly: true,
          },
        ];

        render(
          <Form>
            <InfoField
              name="name"
              rules={rules.filter(r => r) as Rule[]}
              validateFirst={validateFirst}
            >
              <Input />
            </InfoField>
          </Form>,
        );

        const firstTextbox = screen.getAllByRole('textbox').at(0);
        firstTextbox && (await user.type(firstTextbox, 'bamboo'));
        await expectToBeVisibleByText({
          text: errorMessage || 'name is not a valid url',
        });
      });
    };

    testValidateFirst('default', true);
    testValidateFirst(
      'default',
      true,
      {
        type: 'string',
        len: 3,
      },
      'name must be exactly 3 characters',
    );
    testValidateFirst('parallel', 'parallel');
  });
});
