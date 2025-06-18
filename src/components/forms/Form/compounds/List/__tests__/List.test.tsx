import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Key, ReactElement, ReactNode } from 'react';
import { createRef, useContext } from 'react';

import type { ListField, ListOperations, ListProps } from '..';
import Form from '../../..';
import type { FormProps } from '../../..';
import {
  Input,
  expectToHaveValueByRole,
  expectToHaveValueByTestId,
} from '../../../__tests__/utils';
import type { FormInstance, Meta } from '../../../interface';
import ListContext from '../ListContext';
import type { ListContextProps } from '../ListContext';

describe('Form.List', () => {
  let form: FormInstance | null = {} as FormInstance;
  const user = userEvent.setup();

  const renderComponent = (
    renderList?: (
      fields: ListField[],
      operations: ListOperations,
      meta: Meta,
    ) => ReactElement | ReactNode,
    formProps?: FormProps,
    listProps?: Partial<ListProps>,
  ) => {
    return render(
      <Form
        ref={instance => {
          form = instance;
        }}
        {...formProps}
      >
        <Form.List name="list" {...listProps}>
          {renderList}
        </Form.List>
      </Form>,
    );
  };

  const renderBasicComponent = (
    formProps?: FormProps,
    listProps?: Partial<ListProps>,
  ) => {
    let operation: ListOperations = {} as ListOperations;
    renderComponent(
      (fields, opt) => {
        operation = opt;
        return (
          <div data-testid="field-container">
            {fields.map(({ key, ...field }, index) => (
              <Form.Field key={key} {...field}>
                <Input data-testid={`field-${index}`} />
              </Form.Field>
            ))}
          </div>
        );
      },
      formProps,
      listProps,
    );
    return operation;
  };

  const expectFieldContainerLength = (length: number) => {
    return expect(
      screen.getByTestId('field-container').children.length,
    ).toEqual(length);
  };

  it('basic', async () => {
    renderComponent(
      fields => (
        <div>
          {fields.map(({ key, ...field }, index) => (
            <Form.Field key={key} {...field}>
              <Input data-testid={`field-${index}`} />
            </Form.Field>
          ))}
        </div>
      ),
      {
        initialValues: {
          list: ['', '', ''],
        },
      },
    );

    await user.type(await screen.findByTestId('field-0'), '111');
    await user.type(await screen.findByTestId('field-1'), '222');
    await user.type(await screen.findByTestId('field-2'), '333');

    expect(form?.getFieldsValue()).toEqual({
      list: ['111', '222', '333'],
    });
  });

  it('should warn if not an array', () => {
    // Not a array
    const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Form initialValues={{ list: {} }}>
        <Form.List name="list">{() => null}</Form.List>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "Current value of 'list' is not an array type.",
    );
    errorSpy.mockRestore();
  });

  it('should fallback to array', () => {
    // Not a array
    const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Form initialValues={{ list: null }}>
        <Form.List name="list">{() => null}</Form.List>
      </Form>,
    );
    expect(errorSpy).not.toHaveBeenCalledWith(
      "Current value of 'list' is not an array type.",
    );
    errorSpy.mockRestore();
  });

  it('operation', async () => {
    const operation = renderBasicComponent();

    // Add
    act(() => {
      operation.add();
    });
    // Add default value
    act(() => {
      operation.add('2');
    });

    act(() => {
      operation.add();
    });

    expectFieldContainerLength(3);
    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, '2', undefined],
    });

    // Move
    act(() => {
      operation.move(2, 0);
    });
    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, undefined, '2'],
    });

    // noneffective move
    act(() => {
      operation.move(-1, 0);
    });
    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, undefined, '2'],
    });

    // noneffective move
    act(() => {
      operation.move(0, 10);
    });

    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, undefined, '2'],
    });

    // noneffective move
    act(() => {
      operation.move(-1, 10);
    });

    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, undefined, '2'],
    });

    // noneffective move
    act(() => {
      operation.move(0, 0);
    });
    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, undefined, '2'],
    });

    // Revert Move
    act(() => {
      operation.move(0, 2);
    });
    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, '2', undefined],
    });

    // Modify
    await user.clear(screen.getByTestId('field-1'));
    await user.type(screen.getByTestId('field-1'), '222');
    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, '222', undefined],
    });
    expect(form?.isFieldTouched(['list', 0])).toBeFalsy();
    expect(form?.isFieldTouched(['list', 1])).toBeTruthy();
    expect(form?.isFieldTouched(['list', 2])).toBeFalsy();

    // Remove
    act(() => {
      operation.remove(1);
    });
    expect(screen.getByTestId('field-container').children.length).toEqual(2);
    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, undefined],
    });
    expect(form?.isFieldTouched(['list', 0])).toBeFalsy();
    expect(form?.isFieldTouched(['list', 2])).toBeFalsy();

    // Remove not exist: less
    act(() => {
      operation.remove(-1);
    });

    // Remove not exist: more
    act(() => {
      operation.remove(99);
    });
  });

  it('remove when the param is Array', () => {
    const operation = renderBasicComponent();

    act(() => {
      operation.add();
    });

    act(() => {
      operation.add();
    });

    expectFieldContainerLength(2);

    // remove empty array
    act(() => {
      operation.remove([]);
    });

    // remove not esist element in array
    act(() => {
      operation.remove([-1, 99]);
    });

    act(() => {
      operation.remove([0]);
    });

    expectFieldContainerLength(1);

    expect(form?.getFieldsValue()).toEqual({
      list: [undefined],
    });

    act(() => {
      operation.add();
    });

    act(() => {
      operation.add();
    });

    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, undefined, undefined],
    });

    act(() => {
      operation.remove([0, 1]);
    });

    expect(form?.getFieldsValue()).toEqual({
      list: [undefined],
    });
  });

  it('add when the second param is number', () => {
    const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const operation = renderBasicComponent();

    act(() => {
      operation.add();
    });
    act(() => {
      operation.add('1', 2);
    });

    act(() => {
      operation.add('2', -1);
    });

    expect(errorSpy).toHaveBeenCalledWith(
      'The second parameter of the add function should be a valid positive number.',
    );
    errorSpy.mockRestore();

    expectFieldContainerLength(3);
    expect(form?.getFieldsValue()).toEqual({
      list: [undefined, '1', '2'],
    });

    act(() => {
      operation.add('0', 0);
    });
    act(() => {
      operation.add('4', 3);
    });

    expectFieldContainerLength(5);
    expect(form?.getFieldsValue()).toEqual({
      list: ['0', undefined, '1', '4', '2'],
    });
  });

  describe('validate', () => {
    it('basic', async () => {
      renderComponent(
        fields => (
          <div>
            {fields.map(({ key, ...field }, index) => (
              <Form.Field key={key} {...field} rules={[{ required: true }]}>
                <Input data-testid={`field-${index}`} />
              </Form.Field>
            ))}
          </div>
        ),
        {
          initialValues: {
            list: [''],
          },
        },
      );

      await user.type(await screen.findByTestId('field-0'), 'bambou');
      await user.clear(screen.getByTestId('field-0'));

      expect(form?.getFieldError(['list', 0])).toEqual(['list.0 is required']);
    });

    it('remove should keep error', async () => {
      renderComponent(
        (fields, { remove }) => (
          <div data-testid="field-container">
            {fields.map(({ key, ...field }, index) => (
              <Form.Field key={key} {...field} rules={[{ required: true }]}>
                <Input data-testid={`field-${index}`} />
              </Form.Field>
            ))}

            <button
              onClick={() => {
                remove(0);
              }}
              type="button"
            />
          </div>
        ),
        {
          initialValues: { list: ['', ''] },
        },
      );

      expectFieldContainerLength(3);
      await user.type(screen.getByTestId('field-1'), 'plop');
      await user.clear(screen.getByTestId('field-1'));
      expect(form?.getFieldError(['list', 1])).toEqual(['list.1 is required']);

      await user.click(screen.getByRole('button'));

      expectFieldContainerLength(2);
      expect(form?.getFieldError(['list', 0])).toEqual(['list.1 is required']);
    });

    it('when param of remove is array', async () => {
      renderComponent(
        (fields, { remove }) => (
          <div data-testid="field-container">
            {fields.map(({ key, ...field }, index) => (
              <Form.Field
                key={key}
                {...field}
                rules={[{ required: true }, { min: 5 }]}
              >
                <Input data-testid={`field-${index}`} />
              </Form.Field>
            ))}

            <button
              onClick={() => {
                remove([0, 2]);
              }}
              type="button"
            />
          </div>
        ),
        {
          initialValues: { list: ['', '', ''] },
        },
      );

      expectFieldContainerLength(4);
      await user.type(screen.getByTestId('field-0'), 'bambou');
      await user.clear(screen.getByTestId('field-0'));
      expect(form?.getFieldError(['list', 0])).toEqual(['list.0 is required']);

      await user.type(screen.getByTestId('field-1'), 'test');
      expect(form?.getFieldError(['list', 1])).toEqual([
        'list.1 must be at least 5 characters',
      ]);

      await user.type(screen.getByTestId('field-2'), 'bambou');
      await user.clear(screen.getByTestId('field-2'));
      expect(form?.getFieldError(['list', 2])).toEqual(['list.2 is required']);

      await user.click(screen.getByRole('button'));

      expectFieldContainerLength(2);
      expect(form?.getFieldError(['list', 0])).toEqual([
        'list.1 must be at least 5 characters',
      ]);
      await expectToHaveValueByTestId({ testId: 'field-0', value: 'test' });
    });

    it('when add() second param is number', async () => {
      renderComponent(
        (fields, { add }) => (
          <div>
            <div data-testid="field-container">
              {fields.map(({ key, ...field }, index) => (
                <Form.Field
                  key={key}
                  {...field}
                  rules={[{ required: true }, { min: 5 }]}
                >
                  <Input data-testid={`field-${index}`} />
                </Form.Field>
              ))}
            </div>

            <button
              onClick={() => {
                add('test4', 1);
              }}
              data-testid="button-1"
              type="button"
            />

            <button
              onClick={() => {
                add('test5', 0);
              }}
              data-testid="button-2"
              type="button"
            />
          </div>
        ),
        {
          initialValues: { list: ['test1', 'test2', 'test3'] },
        },
      );

      expectFieldContainerLength(3);
      await user.type(screen.getByTestId('field-0'), 'test');
      await user.clear(screen.getByTestId('field-0'));
      expect(form?.getFieldError(['list', 0])).toEqual(['list.0 is required']);

      await user.click(screen.getByTestId('button-1'));
      await user.click(screen.getByTestId('button-2'));

      expectFieldContainerLength(5);
      expect(form?.getFieldError(['list', 1])).toEqual(['list.0 is required']);

      await user.type(screen.getByTestId('field-1'), 'test');
      expect(form?.getFieldError(['list', 1])).toEqual([
        'list.1 must be at least 5 characters',
      ]);
    });
  });

  it('warning if children is not function', () => {
    const errorSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderComponent((<div />) as any);

    expect(errorSpy).toHaveBeenCalledWith(
      'Form.List only accepts function as children.',
    );

    errorSpy.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/25584
  it('preserve should not break list', async () => {
    const operation = renderBasicComponent({ preserve: false });

    // Add
    act(() => {
      operation.add();
    });
    expectFieldContainerLength(1);

    // Remove
    act(() => {
      operation.remove(0);
    });
    expectFieldContainerLength(0);

    // Add
    act(() => {
      operation.add();
    });
    expectFieldContainerLength(1);
  });

  it('list support validator', async () => {
    let operation: ListOperations;
    let currentMeta: Meta | { errors: string } = { errors: '' };
    let currentValue;

    renderComponent(
      (_, opt, meta) => {
        operation = opt;
        currentMeta = meta;
        return null;
      },
      undefined,
      {
        rules: [
          {
            validator(_, value) {
              currentValue = value;
              return Promise.reject();
            },
            message: 'Bamboo Light',
          },
        ],
      },
    );

    await act(async () => {
      operation.add();
    });

    expect(currentValue).toEqual([undefined]);
    expect(currentMeta.errors).toEqual(['Bamboo Light']);
  });

  it('Nest list remove should trigger correct onValuesChange', async () => {
    const onValuesChange = vi.fn();

    renderComponent(
      (fields, operation) => (
        <div>
          {fields.map(({ key, ...field }) => (
            <Form.Field key={key} {...field} name={[field.name, 'first']}>
              <Input />
            </Form.Field>
          ))}
          <button
            onClick={() => {
              operation.remove(1);
            }}
            type="button"
          />
        </div>
      ),
      {
        onValuesChange,
        initialValues: {
          list: [{ first: 'light' }, { first: 'bamboo' }],
        },
      },
    );

    await user.click(screen.getByRole('button'));
    expect(onValuesChange).toHaveBeenCalledWith(expect.anything(), {
      list: [{ first: 'light' }],
    });
  });

  describe('isFieldTouched edge case', () => {
    it('virtual object', async () => {
      const formRef = createRef<FormInstance>();
      render(
        <Form ref={formRef}>
          <Form.Field name={['user', 'name']}>
            <Input data-testid="field-1" />
          </Form.Field>
          <Form.Field name={['user', 'age']}>
            <Input />
          </Form.Field>
        </Form>,
      );

      // Not changed
      expect(formRef.current?.isFieldTouched('user')).toBeFalsy();
      expect(formRef.current?.isFieldsTouched(['user'], false)).toBeFalsy();
      expect(formRef.current?.isFieldsTouched(['user'], true)).toBeFalsy();

      // Changed
      await user.type(screen.getByTestId('field-1'), 'test');
      await user.clear(screen.getByTestId('field-1'));

      expect(formRef.current?.isFieldTouched('user')).toBeTruthy();
      expect(formRef.current?.isFieldsTouched(['user'], false)).toBeTruthy();
      expect(formRef.current?.isFieldsTouched(['user'], true)).toBeTruthy();
    });

    it('List children change', async () => {
      renderComponent(
        fields => (
          <div>
            {fields.map(({ key, ...field }, index) => (
              <Form.Field key={key} {...field}>
                <Input data-testid={`field-${index}`} />
              </Form.Field>
            ))}
          </div>
        ),
        {
          initialValues: { list: ['light', 'bamboo'] },
        },
      );

      // Not changed yet
      expect(form?.isFieldTouched('list')).toBeFalsy();
      expect(form?.isFieldsTouched(['list'], false)).toBeFalsy();
      expect(form?.isFieldsTouched(['list'], true)).toBeFalsy();

      // Change children value
      await user.type(screen.getByTestId('field-1'), 'little');

      expect(form?.isFieldTouched('list')).toBeTruthy();
      expect(form?.isFieldsTouched(['list'], false)).toBeTruthy();
      expect(form?.isFieldsTouched(['list'], true)).toBeTruthy();
    });

    it('List self change', async () => {
      renderComponent((fields, opt) => (
        <div>
          {fields.map(({ key, ...field }) => (
            <Form.Field key={key} {...field}>
              <Input />
            </Form.Field>
          ))}
          <button
            onClick={() => {
              opt.add();
            }}
            type="button"
          />
        </div>
      ));

      // Not changed yet
      expect(form?.isFieldTouched('list')).toBeFalsy();
      expect(form?.isFieldsTouched(['list'], false)).toBeFalsy();
      expect(form?.isFieldsTouched(['list'], true)).toBeFalsy();

      // Change children value
      await user.click(screen.getByRole('button'));

      expect(form?.isFieldTouched('list')).toBeTruthy();
      expect(form?.isFieldsTouched(['list'], false)).toBeTruthy();
      expect(form?.isFieldsTouched(['list'], true)).toBeTruthy();
    });
  });

  it('initialValue', () => {
    renderComponent(
      fields => (
        <div>
          {fields.map(({ key, ...field }) => (
            <Form.Field key={key} {...field}>
              <Input />
            </Form.Field>
          ))}
        </div>
      ),
      undefined,
      { initialValue: ['light', 'bamboo'] },
    );

    expect(form?.getFieldsValue()).toEqual({
      list: ['light', 'bamboo'],
    });
  });

  it('ListContext', () => {
    const Hooker = ({ field }: { key: Key; field: ListField }) => {
      const { getKey } = useContext(ListContext) as ListContextProps;
      const [key, restPath] = getKey(['list', field.name, 'user']);

      return (
        <>
          <span data-testid="internal-key">{key.toString()}</span>
          <span data-testid="internal-rest">{restPath.join('_')}</span>

          <Form.Field {...field} name={[field.name, 'user']}>
            <Input />
          </Form.Field>
        </>
      );
    };

    renderComponent(
      fields => (
        <div>
          {fields.map(field => {
            return <Hooker key={field.key} field={field} />;
          })}
        </div>
      ),
      {
        initialValues: {
          list: [{ user: 'bamboo' }],
        },
      },
    );

    expect(screen.getByTestId('internal-key')).toHaveTextContent('0');
    expect(screen.getByTestId('internal-rest')).toHaveTextContent('user');
    expectToHaveValueByRole({ role: 'textbox', value: 'bamboo' });
  });
});
