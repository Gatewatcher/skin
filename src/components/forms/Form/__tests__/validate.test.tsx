import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Input as SkinInput } from '@/skin/forms';

import Form from '../';
import useForm from '../hooks/useForm';
import type { FormInstance, ValidateMessages } from '../interface';
import InfoField, { Input, matchError } from './utils';

describe('Form Validate', () => {
  const user = userEvent.setup();

  const getFirstTextbox = () => screen.getAllByRole('textbox').at(0);

  it('required', async () => {
    let form: FormInstance | null = {} as FormInstance;
    render(
      <Form
        ref={instance => {
          form = instance;
        }}
      >
        <InfoField name="username" rules={[{ required: true }]} />
      </Form>,
    );

    await user.type(screen.getByRole('textbox'), 'test');
    await user.clear(screen.getByRole('textbox'));
    await matchError(true);
    expect(form.getFieldError('username')).toEqual(['username is required']);
    expect(form.getFieldsError()).toEqual([
      {
        name: ['username'],
        errors: ['username is required'],
        warnings: [],
      },
    ]);

    // Contains not exists
    expect(form.getFieldsError(['username', 'not-exist'])).toEqual([
      {
        name: ['username'],
        errors: ['username is required'],
        warnings: [],
      },
      {
        name: ['not-exist'],
        errors: [],
        warnings: [],
      },
    ]);
  });

  describe('validateMessages', () => {
    const renderForm = (messages: ValidateMessages, fieldProps = {}) => {
      return render(
        <Form validateMessages={messages}>
          <InfoField
            name="username"
            rules={[{ required: true }]}
            {...fieldProps}
          />
        </Form>,
      );
    };

    it('template message', async () => {
      renderForm({ required: "You miss '${name}'!" });

      await user.type(screen.getByRole('textbox'), 'test');
      await user.clear(screen.getByRole('textbox'));
      await matchError("You miss 'username'!");
    });

    it('should be required', async () => {
      renderForm({ required: 'required' }, { required: true });

      await user.type(screen.getByRole('textbox'), 'test');
      await user.clear(screen.getByRole('textbox'));
      await matchError('required');
    });

    it('shoud be required with other rules', async () => {
      renderForm(
        {
          required: 'required',
          string: {
            min: 'min',
          },
        },
        { required: true, rules: [{ min: 6 }] },
      );

      await user.type(screen.getByRole('textbox'), 'test');
      await matchError('min');
      await user.clear(screen.getByRole('textbox'));
      await matchError('required');
    });

    it('function message', async () => {
      renderForm({ required: () => 'Bamboo & Light' });

      await user.type(screen.getByRole('textbox'), 'test');
      await user.clear(screen.getByRole('textbox'));
      await matchError('Bamboo & Light');
    });

    it('messageVariables', async () => {
      renderForm(
        { required: "You miss '${label}'!" },
        {
          messageVariables: {
            label: 'Light&Bamboo',
          },
        },
      );

      await user.type(screen.getByRole('textbox'), 'test');
      await user.clear(screen.getByRole('textbox'));
      await matchError("You miss 'Light&Bamboo'!");
    });
  });

  describe('customize validator', () => {
    it('work', async () => {
      render(
        <Form>
          <InfoField
            rules={[
              {
                async validator(_, value: string) {
                  if (value !== 'bamboo') {
                    return Promise.reject(new Error('should be bamboo!'));
                  }
                  return '';
                },
              },
            ]}
            name="username"
          />
        </Form>,
      );

      // Wrong value
      await user.type(screen.getByRole('textbox'), 'light');
      await matchError('should be bamboo!');

      // Correct value
      await user.clear(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), 'bamboo');
      await matchError(false);
    });

    it('should error if throw in validate', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Form>
          <InfoField
            rules={[
              {
                validator() {
                  throw new Error('without thinking');
                },
              },
            ]}
            name="username"
          />
        </Form>,
      );

      await user.type(screen.getByRole('textbox'), 'light');
      await matchError('Validation error on field username');

      const consoleErr = String(errorSpy.mock.calls[0][0]);
      expect(consoleErr).toBe('Error: without thinking');

      errorSpy.mockRestore();
    });
  });

  it('fail validate if throw', async () => {
    render(
      <Form>
        <InfoField
          rules={[
            {
              validator() {
                throw new Error('OPS');
              },
            },
          ]}
          name="username"
        />
      </Form>,
    );

    // Wrong value
    await user.type(screen.getByRole('textbox'), 'light');
    await matchError('Validation error on field username');
  });

  describe('callback', () => {
    it('warning if not return promise', async () => {
      const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Form>
          <InfoField
            rules={[
              {
                validator(_, value, callback) {
                  callback();
                },
              },
            ]}
            name="username"
          />
        </Form>,
      );

      await user.type(screen.getByRole('textbox'), 'light');
      expect(errorSpy).toHaveBeenCalledWith(
        '`callback` is deprecated. Please return a promise instead.',
      );

      errorSpy.mockRestore();
    });

    it('warning if both promise & callback exist', async () => {
      const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Form>
          <InfoField
            rules={[
              {
                async validator(_, __, callback) {
                  callback();
                  return new Promise(() => {});
                },
              },
            ]}
            name="username"
          />
        </Form>,
      );

      await user.type(screen.getByRole('textbox'), 'light');
      expect(errorSpy).toHaveBeenCalledWith(
        'Your validator function has already return a promise. `callback` will be ignored.',
      );

      errorSpy.mockRestore();
    });
  });

  describe('validateTrigger', () => {
    it('normal', async () => {
      let form: FormInstance | null = {} as FormInstance;
      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <InfoField
            rules={[
              { required: true, validateTrigger: 'onBlur' },
              {
                validator: async () => {
                  throw new Error('Not pass');
                },
                validateTrigger: 'onChange',
              },
            ]}
            name="test"
            validateTrigger={['onBlur', 'onChange']}
          >
            <Input />
          </InfoField>
        </Form>,
      );

      await user.type(screen.getByRole('textbox'), 'd');
      await user.clear(screen.getByRole('textbox'));
      expect(form.getFieldError('test')).toEqual(['Not pass']);

      // Blur
      await user.tab();
      expect(form.getFieldError('test')).toEqual(['test is required']);
    });

    it('change validateTrigger', async () => {
      let form: FormInstance | null = {} as FormInstance;

      const Test = ({ init = false }: { init?: boolean }) => (
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <Form.Field
            rules={[
              { required: true, message: 'Title is required' },
              { min: 3, message: 'Title should be 3+ characters' },
            ]}
            name="title"
            validateTrigger={init ? 'onChange' : 'onBlur'}
          >
            <Input />
          </Form.Field>
        </Form>
      );

      const { rerender } = render(<Test />);

      await user.clear(screen.getByRole('textbox'));
      await user.tab();
      expect(form.getFieldError('title')).toEqual(['Title is required']);

      rerender(<Test init />);
      await user.type(screen.getByRole('textbox'), '1');
      expect(form.getFieldValue('title')).toBe('1');
      expect(form.getFieldError('title')).toEqual([
        'Title should be 3+ characters',
      ]);
    });

    it('form context', async () => {
      const { rerender } = render(
        <Form validateTrigger="onBlur">
          <InfoField name="test" rules={[{ required: true }]} />
        </Form>,
      );

      // Not trigger validate since Form set `onBlur`
      await user.clear(screen.getByRole('textbox'));
      await matchError(false);

      // Trigger onBlur
      await user.tab();
      await matchError(true);

      // Update Form context
      rerender(
        <Form validateTrigger="onChange">
          <InfoField name="test" rules={[{ required: true }]} />
        </Form>,
      );
      await user.type(screen.getByRole('textbox'), '1');
      await matchError(false);
    });
  });

  describe('validate only accept exist fields', () => {
    it('skip init value', async () => {
      let form: FormInstance | null = {} as FormInstance;
      const onFinish = vi.fn();

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
          initialValues={{ user: 'light', pass: 'bamboo' }}
          onFinish={onFinish}
        >
          <InfoField name="user">
            <Input />
          </InfoField>
          <button type="submit">submit</button>
        </Form>,
      );

      // Validate callback
      expect(await form.validateFields(['user'])).toEqual({ user: 'light' });
      expect(await form.validateFields()).toEqual({ user: 'light' });

      // Submit callback
      await user.click(screen.getByRole('button'));
      expect(onFinish).toHaveBeenCalledWith({ user: 'light' });
    });

    it('remove from fields', async () => {
      const onFinish = vi.fn();
      render(
        <Form
          initialValues={{
            switch: true,
            ignore: 'test',
          }}
          onFinish={onFinish}
        >
          <InfoField name="switch" valuePropName="checked">
            <Input className="switch" type="checkbox" />
          </InfoField>
          <Form.Field shouldUpdate>
            {(_, __, { getFieldValue }) =>
              getFieldValue('switch') && (
                <InfoField name="ignore">
                  <Input className="ignore" />
                </InfoField>
              )
            }
          </Form.Field>
          <button type="submit">submit</button>
        </Form>,
      );

      // Submit callback
      await user.click(screen.getByRole('button'));
      expect(onFinish).toHaveBeenCalledWith({ switch: true, ignore: 'test' });
      onFinish.mockReset();

      // Hide one
      await user.click(screen.getByRole('checkbox'));
      await user.click(screen.getByRole('button'));
      expect(onFinish).toHaveBeenCalledWith({ switch: false });
    });

    it('validateFields should not pass when validateFirst is set', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <InfoField name="user" rules={[{ required: true }]} validateFirst>
            <Input />
          </InfoField>
        </Form>,
      );

      // Validate callback
      /* eslint-disable no-async-promise-executor */
      await new Promise(async resolve => {
        let failed = false;
        await act(
          async () =>
            await form
              ?.validateFields()
              .catch(() => {
                failed = true;
              })
              .then(() => {
                expect(failed).toBeTruthy();
                resolve('');
              }),
        );
      });
    });
  });

  describe('validateFirst', () => {
    it('work', async () => {
      let form: FormInstance | null = {} as FormInstance;
      let canEnd = false;
      const onFinish = vi.fn();

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
          onFinish={onFinish}
        >
          <InfoField
            rules={[
              // Follow promise will never end
              { required: true },
              {
                validator: () =>
                  new Promise(resolve => {
                    if (canEnd) {
                      resolve('');
                    }
                  }),
              },
            ]}
            name="username"
            validateFirst
          />
          <button type="submit"></button>
        </Form>,
      );

      // Not pass
      await user.type(screen.getByRole('textbox'), 't');
      await user.clear(screen.getByRole('textbox'));
      await matchError(true);
      expect(form.getFieldError('username')).toEqual(['username is required']);
      expect(form.getFieldsError()).toEqual([
        {
          name: ['username'],
          errors: ['username is required'],
          warnings: [],
        },
      ]);
      expect(onFinish).not.toHaveBeenCalled();

      // Should pass
      canEnd = true;
      await user.type(screen.getByRole('textbox'), 'test');
      await user.click(screen.getByRole('button'));

      await matchError(false);
      expect(onFinish).toHaveBeenCalledWith({ username: 'test' });
    });

    [
      {
        name: 'serialization',
        first: true,
        second: false,
        validateFirst: true,
      },
      {
        name: 'parallel',
        first: true,
        second: true,
        validateFirst: 'parallel' as const,
      },
    ].forEach(({ name, first, second, validateFirst }) => {
      it(name, async () => {
        let ruleFirst = false;
        let ruleSecond = false;

        render(
          <Form>
            <InfoField
              rules={[
                {
                  validator: async () => {
                    ruleFirst = true;
                    throw new Error('failed first');
                  },
                },
                {
                  validator: async () => {
                    ruleSecond = true;
                    throw new Error('failed second');
                  },
                },
              ]}
              name="username"
              validateFirst={validateFirst}
            />
          </Form>,
        );

        await user.type(screen.getByRole('textbox'), 'test');

        await matchError('failed first');

        expect(ruleFirst).toEqual(first);
        expect(ruleSecond).toEqual(second);
      });
    });
  });

  it('switch to remove errors', async () => {
    const Demo = () => {
      const [checked, setChecked] = useState(true);

      return (
        <Form>
          <button
            onClick={() => {
              setChecked(!checked);
            }}
            type="button"
          />
          <InfoField
            rules={
              checked
                ? [
                    {
                      validator(rule, value, callback) {
                        callback('Integer number only!');
                      },
                    },
                  ]
                : []
            }
            name={checked ? 'username' : 'age'}
          />
        </Form>
      );
    };
    render(<Demo />);

    await user.type(screen.getByRole('textbox'), '233');
    await matchError(true);

    await user.click(screen.getByRole('button'));
    await matchError(false);
  });

  it('submit should trigger Field re-render', async () => {
    const renderProps = vi.fn().mockImplementation(() => null);

    const Demo = () => {
      const [form] = useForm();

      return (
        <Form form={form}>
          <Form.Field
            rules={[
              { validator: async () => Promise.reject(new Error('Failed')) },
            ]}
            name="test"
          >
            {renderProps}
          </Form.Field>
          <button
            onClick={() => {
              form.submit();
            }}
            type="button"
          />
        </Form>
      );
    };

    render(<Demo />);
    renderProps.mockReset();

    // Should trigger validating
    await user.click(screen.getByRole('button'));
    expect(renderProps.mock.calls[0][1]).toEqual(
      expect.objectContaining({ validating: true }),
    );
  });

  it('renderProps should use latest rules', async () => {
    let failedTriggerTimes = 0;
    let passedTriggerTimes = 0;

    interface FormStore {
      username: string;
      password: string;
    }

    const Demo = () => (
      <Form>
        <InfoField name="username" />
        <Form.Field<FormStore>
          shouldUpdate={(prev, cur) => prev.username !== cur.username}
        >
          {(_, __, { getFieldValue }) => {
            const value = getFieldValue('username');

            if (value === 'removed') {
              return null;
            }

            return (
              <InfoField
                rules={
                  value !== 'light'
                    ? [
                        {
                          validator: async () => {
                            failedTriggerTimes += 1;
                            throw new Error('Failed');
                          },
                        },
                      ]
                    : [
                        {
                          validator: async () => {
                            passedTriggerTimes += 1;
                          },
                        },
                      ]
                }
                dependencies={['username']}
                name="password"
              />
            );
          }}
        </Form.Field>
      </Form>
    );

    render(<Demo />);

    expect(failedTriggerTimes).toEqual(0);
    expect(passedTriggerTimes).toEqual(0);

    // // Failed of second input
    await user.type(screen.getAllByRole('textbox')[1], 't');
    await user.clear(screen.getAllByRole('textbox')[1]);
    await matchError(true);

    expect(failedTriggerTimes).toEqual(2);
    expect(passedTriggerTimes).toEqual(0);

    // Changed first to trigger update
    let firstTextbox = getFirstTextbox();
    firstTextbox && (await user.type(firstTextbox, 'light'));
    await matchError(false);

    expect(failedTriggerTimes).toEqual(6);
    expect(passedTriggerTimes).toEqual(1);

    // Remove should not trigger validate
    firstTextbox = getFirstTextbox();
    firstTextbox && (await user.type(firstTextbox, 'removed'));

    expect(failedTriggerTimes).toEqual(13);
    expect(passedTriggerTimes).toEqual(1);
  });

  it('validate support recursive', async () => {
    let form: FormInstance | null = {} as FormInstance;
    render(
      <Form
        ref={instance => {
          form = instance;
        }}
      >
        <InfoField name={['username', 'do']} rules={[{ required: true }]} />
        <InfoField name={['username', 'list']} rules={[{ required: true }]} />
      </Form>,
    );

    let firstTextbox = getFirstTextbox();
    firstTextbox && (await user.type(firstTextbox, 'test'));

    firstTextbox = getFirstTextbox();
    firstTextbox && (await user.clear(firstTextbox));

    try {
      const values = await act(
        async () => await form?.validateFields(['username']),
      );
      expect(values.username.do).toBe('');
    } catch (error) {
      expect((error as { errorFields: string[] }).errorFields.length).toBe(2);
    }

    const values = await act(
      async () => await form?.validateFields(['username']),
    );
    expect(values.username.do).toBe('');
  });

  it('not trigger validator', async () => {
    render(
      <Form>
        <InfoField name="user" rules={[{ required: true }]} />
      </Form>,
    );
    await user.type(screen.getByRole('textbox'), 'light');
    await matchError(false);
  });

  it('filter empty rule', async () => {
    render(
      <Form>
        <InfoField name="user" rules={[{ required: true }]} />
      </Form>,
    );
    await user.type(screen.getByRole('textbox'), '1');
    await user.clear(screen.getByRole('textbox'));
    await matchError(true);
  });

  it('should trigger onFieldsChange 3 times', async () => {
    const onFieldsChange = vi.fn();

    render(
      <Form onFieldsChange={onFieldsChange}>
        <InfoField name="test" rules={[{ required: true }]}>
          <Input />
        </InfoField>
      </Form>,
    );

    await user.type(screen.getByRole('textbox'), '1');

    // `validated: false` -> `validated: false` -> `validated: true`
    // `validating: false` -> `validating: true` -> `validating: false`
    expect(onFieldsChange).toHaveBeenCalledTimes(3);
  });

  it('should not validate a required field that contains only spaces', async () => {
    const onFinish = vi.fn();

    render(
      <Form onFinish={onFinish}>
        <Form.Field name="firstname" required>
          <SkinInput.Text />
        </Form.Field>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    const input = await screen.findByRole('textbox', { name: /Firstname/i });
    await user.type(input, '  {Enter}');
    expect(onFinish).not.toHaveBeenCalled();
  });
});
