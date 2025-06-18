import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import Form from '../';
import type { FormInstance } from '../interface';
import InfoField, { Input, matchError } from './utils';

describe('Form.Dependencies', () => {
  const user = userEvent.setup();
  it('touched', async () => {
    let form: FormInstance | null = {} as FormInstance;
    render(
      <Form
        ref={instance => {
          form = instance;
        }}
      >
        <InfoField data-testid="field-1" name="field-1" />
        <InfoField
          data-testid="field-2"
          dependencies={['field-1']}
          name="field-2"
          rules={[{ required: true }]}
        />
      </Form>,
    );

    // Not trigger if not touched
    await user.type(screen.getByTestId('field-1'), 'plop');
    await user.clear(screen.getByTestId('field-1'));
    await matchError(false);

    // Trigger if touched
    await act(() => {
      form?.setFields([{ name: 'field-2', touched: true }]);
    });
    await user.type(screen.getByTestId('field-1'), 'plop');
    await user.clear(screen.getByTestId('field-1'));
    await matchError(true);
  });

  describe('initialValue', () => {
    const test = (name: string, formProps = {}, fieldProps = {}) => {
      it(name, async () => {
        let validated = false;

        render(
          <div>
            <Form {...formProps}>
              <InfoField data-testid="field-1" name="field-1" />
              <InfoField
                rules={[
                  {
                    validator: async () => {
                      validated = true;
                    },
                  },
                ]}
                data-testid="field-2"
                dependencies={['field-1']}
                name="field-2"
                {...fieldProps}
              />
            </Form>
          </div>,
        );

        // Not trigger if not touched
        await user.type(screen.getByTestId('field-2'), 'plop');
        await user.clear(screen.getByTestId('field-2'));
        expect(validated).toBeTruthy();
      });
    };

    test('form level', { initialValues: { field_2: 'bamboo' } });
    test('field level', undefined, { initialValue: 'little' });
  });

  it('nest dependencies', async () => {
    let form: FormInstance | null = {} as FormInstance;
    let rendered = false;

    render(
      <Form
        ref={instance => {
          form = instance;
        }}
      >
        <Form.Field name="field-1">
          <Input data-testid="field-1" />
        </Form.Field>
        <Form.Field dependencies={['field-1']} name="field-2">
          <Input data-testid="field-2" />
        </Form.Field>
        <Form.Field dependencies={['field-2']} name="field-3">
          {control => {
            rendered = true;
            return <Input data-testid="field-3" {...control} />;
          }}
        </Form.Field>
      </Form>,
    );

    await act(() => {
      form?.setFields([
        { name: 'field-1', touched: true },
        { name: 'field-2', touched: true },
        { name: 'field-3', touched: true },
      ]);
    });

    rendered = false;
    await user.type(screen.getByTestId('field-2'), '1');

    expect(rendered).toBeTruthy();
  });

  it('should work when field is dirty', async () => {
    let pass = false;

    render(
      <Form>
        <InfoField
          rules={[
            {
              validator: () => {
                if (pass) {
                  return Promise.resolve();
                }
                return Promise.reject('You should not pass');
              },
            },
          ]}
          data-testid="field-1"
          dependencies={['field-2']}
          name="field-1"
        />

        <InfoField data-testid="field-2" name="field-2" />

        <Form.Field shouldUpdate>
          {(_, __, { resetFields }) => (
            <button
              onClick={() => {
                resetFields();
              }}
              data-testid="reset"
              type="button"
            />
          )}
        </Form.Field>
        <button data-testid="submit" type="submit"></button>
      </Form>,
    );

    await user.click(screen.getByTestId('submit'));
    await matchError('You should not pass');

    // Mock new validate
    pass = true;
    await user.type(screen.getByTestId('field-2'), 'bamboo');
    await matchError(false);

    // Should not validate after reset
    pass = false;
    await user.click(screen.getByTestId('reset'));
    await user.type(screen.getByTestId('field-2'), 'light');
    await matchError(false);
  });

  it('should work as a shortcut when name is not provided', async () => {
    const spy = vi.fn();
    const value1 = 'value1';
    const value1Count = value1.split('').length;
    render(
      <Form>
        <Form.Field dependencies={['field-1']}>
          {() => {
            spy();
            return 'gogogo';
          }}
        </Form.Field>
        <Form.Field name="field-1">
          <Input data-testid="field-1" />
        </Form.Field>
        <Form.Field name="field-2">
          <Input data-testid="field-2" />
        </Form.Field>
      </Form>,
    );
    expect(spy).toHaveBeenCalledTimes(1);
    await user.type(screen.getByTestId('field-2'), 'value2');
    // sync start
    //   valueUpdate -> not rerender
    //   depsUpdate  -> not rerender
    // sync end
    // async start
    //   validateFinish -> not rerender
    // async end
    expect(spy).toHaveBeenCalledTimes(1);
    await user.type(screen.getByTestId('field-1'), value1);
    // sync start
    //   valueUpdate -> not rerender
    //   depsUpdate  -> rerender by deps
    //   [ react rerender once -> 2 ]
    // sync end
    // async start
    //   validateFinish -> not rerender
    // async end
    expect(spy).toHaveBeenCalledTimes(value1Count + 1);
  });

  it("shouldn't work when shouldUpdate is set", async () => {
    const spy = vi.fn();
    const value1 = 'value1';
    const value1Count = value1.split('').length;
    const value2 = 'value2';
    const value2Count = value2.split('').length;
    let count = 0;

    render(
      <Form>
        <Form.Field dependencies={['field-2']} shouldUpdate={() => true}>
          {() => {
            spy();
            count += 1;
            return 'gogogo';
          }}
        </Form.Field>
        <Form.Field name="field-1">
          <Input data-testid="field-1" />
        </Form.Field>
        <Form.Field name="field-2">
          <Input data-testid="field-2" />
        </Form.Field>
      </Form>,
    );
    expect(spy).toHaveBeenCalledTimes(1);
    await user.type(screen.getByTestId('field-1'), value1);

    // // sync start
    // //   valueUpdate -> rerender by shouldUpdate
    // //   depsUpdate  -> rerender by deps
    // //   [ react rerender once -> 2 ]
    // // sync end
    expect(count).toEqual(value1Count + 1);

    await user.type(screen.getByTestId('field-2'), value2);
    // // sync start
    // //   valueUpdate -> rerender by shouldUpdate
    // //   depsUpdate  -> rerender by deps
    // //   [ react rerender once -> 3 ]
    // // sync end
    expect(spy).toHaveBeenCalledTimes(value1Count + value2Count + 1);
  });
});
