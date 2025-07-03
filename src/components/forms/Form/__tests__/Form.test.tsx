import { faker } from '@faker-js/faker';
import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ChangeEvent } from 'react';
import { createRef, useEffect } from 'react';

import { Input as SkinInput } from '@/skin/forms';

import Form from '..';
import useForm from '../hooks/useForm';
import type { FormInstance, Meta } from '../interface';
import InfoField, { Input, getInput } from './utils';

describe('Form', () => {
  const user = userEvent.setup();

  it('should set fields touched', async () => {
    let form: FormInstance | null = {} as FormInstance;
    render(
      <Form
        ref={instance => {
          form = instance;
        }}
      >
        <InfoField data-testid="username" name="username" />
        <InfoField data-testid="password" name="password" />
        <Form.Field>{() => null}</Form.Field>
      </Form>,
    );

    expect(form.isFieldsTouched()).toBeFalsy();
    expect(form.isFieldsTouched(['username', 'password'])).toBeFalsy();

    await user.type(screen.getByTestId('username'), 'Bamboo');

    expect(form.isFieldsTouched()).toBeTruthy();
    expect(form.isFieldsTouched(['username', 'password'])).toBeTruthy();
    expect(form.isFieldsTouched(['password'])).toBeFalsy();
    expect(form.isFieldsTouched(['username'])).toBeTruthy();
    expect(form.isFieldsTouched(true)).toBeFalsy();
    expect(form.isFieldsTouched(['username', 'password'], true)).toBeFalsy();

    await user.type(screen.getByTestId('password'), 'Light');
    expect(form.isFieldsTouched()).toBeTruthy();
    expect(form.isFieldsTouched(['username', 'password'])).toBeTruthy();
    expect(form.isFieldsTouched(true)).toBeTruthy();
    expect(form.isFieldsTouched(['username', 'password'], true)).toBeTruthy();
  });

  describe('reset form', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resetTest = (name: string, ...args: any[]) => {
      const inputName = 'username';
      it(name, async () => {
        let form: FormInstance | null = {} as FormInstance;
        const onReset = vi.fn();
        const onMeta = vi.fn();

        render(
          <Form
            ref={instance => {
              form = instance;
            }}
          >
            <Form.Field
              name={inputName}
              onMetaChange={onMeta}
              onReset={onReset}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Field>
          </Form>,
        );

        const value = 'Bamboo';
        await user.type(getInput(), value);
        expect(form?.getFieldValue(inputName)).toEqual(value);
        expect(form?.getFieldError(inputName)).toEqual([]);
        expect(form?.isFieldTouched(inputName)).toBeTruthy();
        expect(onMeta).toHaveBeenCalledWith(
          expect.objectContaining({
            touched: true,
            errors: [],
            warnings: [],
          }),
        );
        expect(onReset).not.toHaveBeenCalled();
        onMeta.mockRestore();
        onReset.mockRestore();

        await act(() => {
          form?.resetFields(...args);
        });
        expect(form?.getFieldValue(inputName)).toEqual(undefined);
        expect(form?.getFieldError(inputName)).toEqual([]);
        expect(form?.isFieldTouched(inputName)).toBeFalsy();
        expect(onMeta).toHaveBeenCalledWith(
          expect.objectContaining({
            touched: false,
            errors: [],
            warnings: [],
          }),
        );
        expect(onReset).toHaveBeenCalled();
        onMeta.mockRestore();
        onReset.mockRestore();

        await user.type(getInput(), 'plop');
        await user.clear(getInput());
        expect(form?.getFieldValue(inputName)).toEqual('');
        expect(form?.getFieldError(inputName)).toEqual([
          'username is required',
        ]);
        expect(form?.isFieldTouched(inputName)).toBeTruthy();
        expect(onMeta).toHaveBeenCalledWith(
          expect.objectContaining({
            touched: true,
            errors: ['username is required'],
            warnings: [],
          }),
        );
        expect(onReset).not.toHaveBeenCalled();
        onMeta.mockRestore();
        onReset.mockRestore();

        await act(() => {
          form?.resetFields(...args);
        });
        expect(form?.getFieldValue('username')).toEqual(undefined);
        expect(form?.getFieldError('username')).toEqual([]);
        expect(form?.isFieldTouched('username')).toBeFalsy();
        expect(onMeta).toHaveBeenCalledWith(
          expect.objectContaining({
            touched: false,
            errors: [],
            warnings: [],
          }),
        );
        expect(onReset).toHaveBeenCalled();
      });
    };
    resetTest('should reset with field name', ['username']);
    resetTest('should reset without field name');

    it('should not affect others', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <Form.Field name="username" rules={[{ required: true }]}>
            <Input data-testid="username" />
          </Form.Field>

          <Form.Field name="password" rules={[{ required: true }]}>
            <Input data-testid="password" />
          </Form.Field>
        </Form>,
      );

      await user.type(screen.getByTestId('username'), 'Bamboo');
      await user.type(screen.getByTestId('password'), 'Bamboo');
      await user.clear(screen.getByTestId('password'));

      await act(() => {
        form?.resetFields(['username']);
      });

      expect(form?.getFieldValue('username')).toEqual(undefined);
      expect(form?.getFieldError('username')).toEqual([]);
      expect(form?.isFieldTouched('username')).toBeFalsy();
      expect(form?.getFieldValue('password')).toEqual('');
      expect(form?.getFieldError('password')).toEqual(['password is required']);
      expect(form?.isFieldTouched('password')).toBeTruthy();
    });

    it('should remove Field should trigger onMetaChange', () => {
      const onMetaChange = vi.fn();
      const { unmount } = render(
        <Form>
          <Form.Field name="username" onMetaChange={onMetaChange}>
            <Input />
          </Form.Field>
        </Form>,
      );

      unmount();
      expect(onMetaChange).toHaveBeenCalledWith(
        expect.objectContaining({ destroy: true }),
      );
    });
  });

  it('should throw if no Form in use', () => {
    const warningSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <Form.Field>
        <Input />
      </Form.Field>,
    );

    expect(warningSpy).toHaveBeenCalledWith(
      'Can not find FormContext. Please make sure you wrap Field under Form.',
    );

    warningSpy.mockRestore();
  });

  it('should keep origin input function', async () => {
    const onChange = vi.fn();
    const onValuesChange = vi.fn();
    render(
      <Form onValuesChange={onValuesChange}>
        <Form.Field name="username">
          <Input onChange={onChange} />
        </Form.Field>
      </Form>,
    );

    const value = 'Bamboo';
    await user.type(getInput(), value);
    expect(onValuesChange).toHaveBeenCalledWith(
      { username: value },
      { username: value },
    );
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value,
        }),
      }),
    );
  });

  it('onValuesChange should not return fully value', async () => {
    const onValuesChange = vi.fn();

    const Demo = ({ showField = true }: { showField?: boolean }) => (
      <Form initialValues={{ light: 'little' }} onValuesChange={onValuesChange}>
        {showField && (
          <Form.Field name="light">
            <Input data-testid="light" />
          </Form.Field>
        )}
        <Form.Field name="bamboo">
          <Input data-testid="bamboo" />
        </Form.Field>
      </Form>
    );

    const { rerender } = render(<Demo />);
    await user.type(screen.getByTestId('bamboo'), 'cute');
    expect(onValuesChange).toHaveBeenCalledWith(expect.anything(), {
      light: 'little',
      bamboo: 'cute',
    });

    onValuesChange.mockReset();
    rerender(<Demo showField={false} />);
    await user.clear(getInput());
    await user.type(getInput(), 'beauty');
    expect(onValuesChange).toHaveBeenCalledWith(expect.anything(), {
      bamboo: 'beauty',
    });
  });

  it('should call onReset fn, when the button is clicked', async () => {
    const resetFn = vi.fn();
    render(
      <Form onReset={resetFn}>
        <InfoField name="user">
          <Input />
        </InfoField>
        <button type="reset">reset</button>
      </Form>,
    );
    await user.type(getInput(), 'Bamboo');
    await user.click(screen.getByRole('button'));
    expect(resetFn).toHaveBeenCalledTimes(1);
    expect(getInput()).toHaveValue('');
  });

  it('submit', async () => {
    const onFinish = vi.fn();
    const onFinishFailed = vi.fn();

    render(
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <InfoField name="user" rules={[{ required: true }]}>
          <Input />
        </InfoField>
        <button type="submit">submit</button>
      </Form>,
    );

    await user.click(screen.getByRole('button'));
    expect(onFinishFailed).toHaveBeenCalledWith({
      errorFields: [
        { name: ['user'], errors: ['user is required'], warnings: [] },
      ],
      outOfDate: false,
      values: {},
    });
    await expectToBeVisibleInTheDocument('user is required', screen.findByText);
    expect(onFinish).not.toHaveBeenCalled();

    onFinish.mockReset();
    onFinishFailed.mockReset();

    await user.type(getInput(), 'Bamboo');
    await user.click(screen.getByRole('button'));
    await expectNotToBeVisibleInTheDocument(
      'user is required',
      screen.queryByText,
    );
    expect(onFinish).toHaveBeenCalledWith({ user: 'Bamboo' });
    expect(onFinishFailed).not.toHaveBeenCalled();
  });

  it('getInternalHooks should not usable by user', () => {
    const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    let form: FormInstance | null = {} as FormInstance;

    render(
      <div>
        <Form
          ref={instance => {
            form = instance;
          }}
        />
      </div>,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore this is expected to fail
    expect(form?.getInternalHooks()).toEqual(null);

    expect(errorSpy).toHaveBeenCalledWith(
      '`getInternalHooks` is internal usage. Should not call directly.',
    );

    errorSpy.mockRestore();
  });

  it('should set according to valuePropName', async () => {
    let form: FormInstance | null = {} as FormInstance;

    render(
      <div>
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <Form.Field name="check" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Field>
        </Form>
      </div>,
    );

    await user.click(screen.getByRole('checkbox'));
    expect(form?.getFieldsValue()).toEqual({ check: true });

    await user.click(screen.getByRole('checkbox'));
    expect(form?.getFieldsValue()).toEqual({ check: false });
  });

  describe('shouldUpdate', () => {
    it('should update', async () => {
      let isAllTouched;
      let hasError;

      render(
        <Form>
          <Form.Field name="username" rules={[{ required: true }]}>
            <Input data-testid="username" />
          </Form.Field>
          <Form.Field name="password" rules={[{ required: true }]}>
            <Input data-testid="password" />
          </Form.Field>
          <Form.Field shouldUpdate>
            {(_, __, { getFieldsError, isFieldsTouched }) => {
              isAllTouched = isFieldsTouched(true);
              hasError = getFieldsError().filter(
                ({ errors }) => errors.length,
              ).length;

              return null;
            }}
          </Form.Field>
        </Form>,
      );

      await user.type(screen.getByTestId('username'), 'plop');
      await user.clear(screen.getByTestId('username'));
      expect(isAllTouched).toBeFalsy();
      expect(hasError).toBeTruthy();

      await user.type(screen.getByTestId('username'), 'Bambou');
      expect(isAllTouched).toBeFalsy();
      expect(hasError).toBeFalsy();

      await user.type(screen.getByTestId('password'), 'Light');
      expect(isAllTouched).toBeTruthy();
      expect(hasError).toBeFalsy();

      await user.clear(screen.getByTestId('password'));
      expect(isAllTouched).toBeTruthy();
      expect(hasError).toBeTruthy();
    });

    it('should force one more update if set to shouldUpdate', async () => {
      let renderPhase = 0;

      render(
        <Form initialValues={{ username: 'light' }}>
          <Form.Field name="username">
            <Input />
          </Form.Field>
          <Form.Field shouldUpdate>
            {(_, __, form) => {
              renderPhase += 1;
              return (
                <span
                  data-testid="holder"
                  data-touched={form.isFieldsTouched(true)}
                  data-value={JSON.stringify(form.getFieldsValue())}
                />
              );
            }}
          </Form.Field>
        </Form>,
      );

      const holder = screen.getByTestId('holder');
      expect(renderPhase).toEqual(2);
      expect(holder).toHaveAttribute('data-touched', 'false');
      expect(holder).toHaveAttribute(
        'data-value',
        JSON.stringify({ username: 'light' }),
      );
    });
  });

  describe('setFields', () => {
    it('should work', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <InfoField name="username">
            <Input />
          </InfoField>
        </Form>,
      );

      await act(() => {
        form?.setFields([
          {
            name: 'username',
            touched: false,
            validating: true,
            errors: ['Set It!'],
          },
        ]);
      });

      await expectToBeVisibleInTheDocument('Set It!', screen.findByText);
      await expectToBeVisibleInTheDocument('validating');
      expect(form.isFieldsTouched()).toBeFalsy();
    });

    it('should trigger by setField', async () => {
      const triggerUpdate = vi.fn();
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <Form.Field shouldUpdate>
            {() => {
              triggerUpdate();
              return <input />;
            }}
          </Form.Field>
        </Form>,
      );

      // Not trigger render
      await act(() => {
        form?.setFields([{ name: 'value', value: 'no need to update' }]);
      });
      expect(triggerUpdate).toHaveBeenCalled();
    });

    it('should render props get meta', () => {
      let called1 = false;
      let called2 = false;

      render(
        <Form>
          <Form.Field name="Light">
            {(_, meta) => {
              expect(meta.name).toEqual(['Light']);
              called1 = true;
              return null;
            }}
          </Form.Field>
          <Form.Field name={['Bamboo', 'Best']}>
            {(_, meta) => {
              expect(meta.name).toEqual(['Bamboo', 'Best']);
              called2 = true;
              return null;
            }}
          </Form.Field>
        </Form>,
      );

      expect(called1).toBeTruthy();
      expect(called2).toBeTruthy();
    });

    it('setFieldsValue should clean up status', async () => {
      let form: FormInstance | null = {} as FormInstance;
      let currentMeta: Meta = {} as Meta;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <Form.Field
            rules={[
              {
                validator: () => new Promise(() => {}),
              },
            ]}
            name="normal"
          >
            {(control, meta) => {
              currentMeta = meta;
              return <Input {...control} />;
            }}
          </Form.Field>
        </Form>,
      );

      // Init
      expect(form.getFieldValue('normal')).toBe(undefined);
      expect(form.isFieldTouched('normal')).toBeFalsy();
      expect(form.getFieldError('normal')).toEqual([]);
      expect(currentMeta.validating).toBeFalsy();

      // Set it
      await act(() => {
        form?.setFieldsValue({
          normal: 'Light',
        });
      });

      expect(form.getFieldValue('normal')).toBe('Light');
      expect(form.isFieldTouched('normal')).toBeTruthy();
      expect(form.getFieldError('normal')).toEqual([]);
      expect(currentMeta.validating).toBeFalsy();

      // Input it
      await user.type(getInput(), 'test');
      await user.clear(getInput());
      expect(getInput()).toHaveValue('');

      await user.type(getInput(), 'Bamboo');

      expect(form.getFieldValue('normal')).toBe('Bamboo');
      expect(form.isFieldTouched('normal')).toBeTruthy();
      expect(form.getFieldError('normal')).toEqual([]);
      expect(currentMeta.validating).toBeTruthy();

      // Set it again
      await act(() => {
        form?.setFieldsValue({
          normal: 'Light',
        });
      });

      expect(form.getFieldValue('normal')).toBe('Light');
      expect(form.isFieldTouched('normal')).toBeTruthy();
      expect(form.getFieldError('normal')).toEqual([]);
      await waitFor(() => {
        return expect(currentMeta.validating).toBeFalsy();
      });
    });

    it('warning if invalid element', () => {
      const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Form>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore this is expected to fail */}
          <Form.Field name="name">
            <h1 key="1">Light</h1>
            <h2 key="2">Bamboo</h2>
          </Form.Field>
        </Form>,
      );
      expect(errorSpy).toHaveBeenCalledWith(
        '`children` of Field is not valid ReactElement.',
      );
      errorSpy.mockRestore();
    });

    it('warning if call function before set prop', () => {
      vi.useFakeTimers();
      const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const Test = () => {
        const [form] = useForm();
        form.getFieldsValue();

        return <Form />;
      };

      render(<Test />);

      vi.runAllTimers();
      expect(errorSpy).toHaveBeenCalledWith(
        'Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?',
      );
      errorSpy.mockRestore();
      vi.useRealTimers();
    });

    it('filtering fields by meta', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <InfoField data-testid="username" name="username" />
          <InfoField data-testid="password" name="password" />
          <Form.Field>{() => null}</Form.Field>
        </Form>,
      );

      expect(
        form?.getFieldsValue(null, (meta: Meta) => {
          expect(Object.keys(meta)).toEqual([
            'touched',
            'validating',
            'errors',
            'warnings',
            'name',
            'rules',
          ]);
          return false;
        }),
      ).toEqual({});

      expect(form.getFieldsValue(null, () => true)).toEqual(
        form.getFieldsValue(),
      );
      expect(form.getFieldsValue(null, (meta: Meta) => meta.touched)).toEqual(
        {},
      );

      await user.type(screen.getByTestId('username'), 'Bamboo');
      expect(form.getFieldsValue(null, () => true)).toEqual(
        form.getFieldsValue(),
      );
      expect(form.getFieldsValue(null, (meta: Meta) => meta.touched)).toEqual({
        username: 'Bamboo',
      });
      expect(
        form.getFieldsValue(['username'], (meta: Meta) => meta.touched),
      ).toEqual({
        username: 'Bamboo',
      });
      expect(
        form.getFieldsValue(['password'], (meta: Meta) => meta.touched),
      ).toEqual({});
    });

    it('should not crash when return value contains target field', async () => {
      const CustomInput = ({
        value,
        onChange,
      }: {
        value?: string;
        onChange?: (e: { target: string; value: string }) => void;
      }) => {
        const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
          onChange?.({
            value: e.target.value,
            target: 'string',
          });
        };
        return <Input onChange={onInputChange} value={value} />;
      };

      render(
        <Form>
          <Form.Field name="user">
            <CustomInput />
          </Form.Field>
        </Form>,
      );
      expect(async () => {
        await user.type(getInput(), 'Light');
      }).not.toThrowError();
    });

    it('setFieldsValue for List should work', async () => {
      const Demo = () => {
        const [form] = useForm();

        const handelReset = () => {
          form.setFieldsValue({
            users: [],
          });
        };

        const initialValues = {
          users: [{ name: '11' }, { name: '22' }],
        };

        return (
          <Form
            autoComplete="off"
            form={form}
            initialValues={initialValues}
            name="dynamic_form_nest_item"
          >
            <Form.List name="users">
              {fields => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Form.Field
                      key={key}
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'Missing name' }]}
                    >
                      <Input placeholder="Name" />
                    </Form.Field>
                  ))}
                </>
              )}
            </Form.List>
            <Form.Field>
              <button
                className="reset-btn"
                data-testid="reset-btn"
                onClick={handelReset}
              >
                reset
              </button>
            </Form.Field>
          </Form>
        );
      };

      render(<Demo />);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('11');
      await user.click(screen.getByTestId('reset-btn'));
      expect(screen.queryAllByRole('textbox')).toHaveLength(0);
    });

    it('should setFieldsValue should work for multiple Select', async () => {
      const Select = ({
        value,
        defaultValue,
      }: {
        value?: string;
        defaultValue?: string;
      }) => {
        return (
          <div data-testid="select-div">
            {(value || defaultValue || []).toString()}
          </div>
        );
      };

      const Demo = () => {
        const [formInstance] = useForm();

        useEffect(() => {
          formInstance.setFieldsValue({ selector: ['K1', 'K2'] });
        }, [formInstance]);

        return (
          <Form form={formInstance}>
            <Form.Field initialValue="K1" name="selector">
              <Select />
            </Form.Field>
          </Form>
        );
      };

      render(<Demo />);
      await expectToBeVisibleInTheDocument('K1,K2', screen.getByText);
    });

    it('remount should not clear current value', async () => {
      let refForm: FormInstance;

      const Demo = ({ remount }: { remount?: boolean }) => {
        const [form] = useForm();
        refForm = form;

        let node = (
          <Form form={form} initialValues={{ name: 'little' }}>
            <Form.Field name="name">
              <Input />
            </Form.Field>
          </Form>
        );

        if (remount) {
          node = <div>{node}</div>;
        }

        return node;
      };

      const { rerender } = render(<Demo />);
      await act(() => {
        refForm.setFieldsValue({ name: 'bamboo' });
      });
      rerender(<Demo remount />);
      expect(getInput()).toHaveValue('bamboo');
    });

    it('should setFieldValue', async () => {
      const formRef = createRef<FormInstance>();

      const Demo = () => (
        <Form
          ref={formRef}
          initialValues={{ list: ['bamboo', 'little', 'light'] }}
        >
          <Form.List name="list">
            {fields =>
              fields.map(({ key, ...field }) => (
                <Form.Field key={key} {...field}>
                  <Input />
                </Form.Field>
              ))
            }
          </Form.List>

          <Form.Field initialValue="nested" name={['nest', 'target']}>
            <Input />
          </Form.Field>
        </Form>
      );

      const { rerender } = render(<Demo />);
      const getInputValues = () => {
        return screen
          .getAllByRole('textbox')
          .map(input => (input as HTMLInputElement).value);
      };
      expect(getInputValues()).toEqual(['bamboo', 'little', 'light', 'nested']);

      // Set
      await act(() => {
        formRef.current?.setFieldValue(['list', 1], 'tiny');
        formRef.current?.setFieldValue(['nest', 'target'], 'match');
      });

      rerender(<Demo />);

      expect(getInputValues()).toEqual(['bamboo', 'tiny', 'light', 'match']);
    });
  });

  describe('setError / setErrors', () => {
    it('should work with unique error', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <InfoField name="username">
            <Input />
          </InfoField>
        </Form>,
      );

      await act(() => {
        form?.setError('username', ['Set It!']);
      });

      await expectToBeVisibleInTheDocument('Set It!', screen.findByText);
    });

    it('should work with unique error with prefix', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <Form.Group name="user">
            <InfoField name="username">
              <Input />
            </InfoField>
          </Form.Group>
        </Form>,
      );

      await act(() => {
        form?.setError('username', ['Set It!'], { prefix: 'user' });
      });

      await expectToBeVisibleInTheDocument('Set It!', screen.findByText);
    });

    it('should wotk with multiple errors', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <InfoField name="username">
            <Input />
          </InfoField>
          <InfoField name="email">
            <Input />
          </InfoField>
        </Form>,
      );

      await act(() => {
        form?.setErrors({
          username: ['username error'],
          email: ['email error'],
        });
      });

      await expectToBeVisibleInTheDocument('username error', screen.findByText);
      await expectToBeVisibleInTheDocument('email error', screen.findByText);
    });

    it('should wotk with multiple errors and prefix', async () => {
      let form: FormInstance | null = {} as FormInstance;

      render(
        <Form
          ref={instance => {
            form = instance;
          }}
        >
          <Form.Group name="user">
            <InfoField name="username">
              <Input />
            </InfoField>
            <InfoField name="email">
              <Input />
            </InfoField>
          </Form.Group>
        </Form>,
      );

      await act(() => {
        form?.setErrors(
          {
            username: ['username error'],
            email: ['email error'],
          },
          { prefix: 'user' },
        );
      });

      await expectToBeVisibleInTheDocument('username error', screen.findByText);
      await expectToBeVisibleInTheDocument('email error', screen.findByText);
    });
  });

  it('should format field type number as number', async () => {
    const onSubmit = vi.fn();

    render(
      <Form onFinish={onSubmit}>
        <InfoField name="age" type="number">
          <Input data-testid="input-number" type="number" />
        </InfoField>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    const input = await screen.findByTestId('input-number');
    await user.type(input, '3');
    await user.click(await screen.findByText('submit'));
    expect(onSubmit).toHaveBeenCalledWith({ age: 3 });
  });

  it('should add checked valuePropName if type is checked', async () => {
    const onSubmit = vi.fn();

    render(
      <Form onFinish={onSubmit}>
        <InfoField name="valid" type="checked">
          <Input data-testid="input-checkbox" type="checkbox" />
        </InfoField>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    await user.click(await screen.findByTestId('input-checkbox'));
    expect(await screen.findByTestId('input-checkbox')).toBeChecked();
    await user.click(await screen.findByText('submit'));

    expect(onSubmit).toHaveBeenCalledWith({ valid: true });
  });

  it('should have default settings with file type', async () => {
    const file = new File([faker.lorem.paragraphs(100)], 'img.png', {
      type: 'image/png',
    });
    const onSubmit = vi.fn();

    render(
      <Form initialValues={{ file }} onFinish={onSubmit}>
        <InfoField name="file" type="file">
          <SkinInput.File label="files" />
        </InfoField>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    await user.click(await screen.findByText('submit'));
    expect(onSubmit).toHaveBeenCalledWith({ file });
  });

  it('should have the autocomplete attribute set to "off" by default', async () => {
    render(<Form />);

    expect(screen.getByTestId('form')).toHaveAttribute('autocomplete', 'off');
  });

  it('should reset form on finish', async () => {
    const initialValues = { firstname: 'John', lastname: 'Doe' };
    const onFinish = vi.fn();

    render(
      <Form
        data-testid="form"
        initialValues={initialValues}
        onFinish={onFinish}
        withResetOnSuccess
      >
        <Form.Field name="firstname">
          <SkinInput.Text />
        </Form.Field>
        <Form.Field name="lastname">
          <SkinInput.Text />
        </Form.Field>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    await user.type(
      await screen.findByRole('textbox', { name: 'firstname' }),
      'John',
    );
    await user.type(
      await screen.findByRole('textbox', { name: 'lastname' }),
      'Doe',
    );

    await user.click(await screen.findByText('submit'));
    expect(onFinish).toHaveBeenCalledWith({
      firstname: 'JohnJohn',
      lastname: 'DoeDoe',
    });

    expect(await screen.findByTestId('form')).toHaveFormValues({
      firstname: 'John',
      lastname: 'Doe',
    });
  });

  it('should submit form on enter', async () => {
    const onFinish = vi.fn();

    render(
      <Form onFinish={onFinish}>
        <Form.Field name="firstname">
          <SkinInput.Text />
        </Form.Field>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    const input = await screen.findByRole('textbox', { name: /Firstname/i });
    await user.type(input, '{Enter}');
    expect(onFinish).toHaveBeenCalled();
  });

  it('should not submit form on enter', async () => {
    const onFinish = vi.fn();

    render(
      <Form onFinish={onFinish} withSubmitOnEnter={false}>
        <Form.Field name="firstname">
          <SkinInput.Text />
        </Form.Field>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    const input = await screen.findByRole('textbox', { name: /Firstname/i });
    await user.type(input, '{Enter}');
    expect(onFinish).not.toHaveBeenCalled();
  });

  it('should submit a trimmed value', async () => {
    const onFinish = vi.fn();

    render(
      <Form onFinish={onFinish}>
        <Form.Field name="firstname">
          <SkinInput.Text />
        </Form.Field>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    const input = await screen.findByRole('textbox', { name: /Firstname/i });
    await user.type(input, '  foo  {Enter}');
    expect(onFinish).toHaveBeenCalledWith({ firstname: 'foo' });
  });
});
