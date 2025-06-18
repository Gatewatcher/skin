import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { FormProviderProps } from '../contexts/FormContext';
import { FormProvider } from '../contexts/FormContext';
import Form from '../index';
import InfoField from './utils';

describe('FormContext', () => {
  const user = userEvent.setup();
  const validationMessage = "I'm global";
  const getInput = () => screen.getByRole('textbox');

  const renderComponent = async (props: FormProviderProps) => {
    return render(
      <FormProvider
        {...props}
        validateMessages={{ required: validationMessage }}
      >
        <Form name="form1">
          <InfoField name="username" rules={[{ required: true }]} />
        </Form>
      </FormProvider>,
    );
  };

  it('should display required validation message', async () => {
    renderComponent({});
    await user.type(getInput(), `{enter}`);
    await user.clear(getInput());
    await expectToBeVisibleInTheDocument(validationMessage, screen.findByText);
  });

  it('should call onFormChange callback', async () => {
    const onFormChange = vi.fn();
    const value = 'Light';

    renderComponent({
      onFormChange,
    });
    await user.type(getInput(), value);
    expect(onFormChange).toHaveBeenCalledWith(
      'form1',
      expect.objectContaining({
        changedFields: [
          {
            errors: [],
            warnings: [],
            name: ['username'],
            rules: [{ required: true }],
            touched: true,
            validating: false,
            value,
          },
        ],
        forms: {
          form1: expect.objectContaining({}),
        },
      }),
    );
  });

  it('basic multi form provider change', async () => {
    const onFormChange = vi.fn();
    const value = 'Bamboo';

    render(
      <FormProvider onFormChange={onFormChange}>
        <Form name="form1" />
        <Form name="form2">
          <InfoField name="test" />
        </Form>
      </FormProvider>,
    );

    await user.type(getInput(), value);
    const { forms } = onFormChange.mock.calls[0][1];
    expect(Object.keys(forms)).toEqual(['form1', 'form2']);
  });

  it('should work with multiple context', async () => {
    const onFormChange = vi.fn();
    const value = 'Bamboo';

    const Demo = ({ changed = false }: { changed: boolean }) => (
      <FormProvider onFormChange={onFormChange}>
        <FormProvider>
          {!changed ? (
            <Form name="form1" />
          ) : (
            <Form name="form2">
              <InfoField name="test" />
            </Form>
          )}
        </FormProvider>
      </FormProvider>
    );

    const { rerender } = render(<Demo changed={false} />);
    rerender(<Demo changed={true} />);

    await user.type(getInput(), value);
    const { forms } = onFormChange.mock.calls[0][1];
    expect(Object.keys(forms)).toEqual(['form2']);
  });

  it('should submit', async () => {
    const onFormFinish = vi.fn();
    const value = 'Value';

    render(
      <div>
        <FormProvider onFormFinish={onFormFinish}>
          <Form name="form1">
            <InfoField name="name" rules={[{ required: true }]} />
            <button type="submit">Submit</button>
          </Form>
          <Form name="form2" />
        </FormProvider>
      </div>,
    );

    await user.click(screen.getByText('Submit'));
    expect(onFormFinish).not.toHaveBeenCalled();

    await user.type(getInput(), '{enter}');
    await user.click(screen.getByText('Submit'));
    expect(onFormFinish).not.toHaveBeenCalled();

    await user.type(getInput(), value);
    await user.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(onFormFinish).toBeCalledTimes(1);
      expect(onFormFinish.mock.calls[0][0]).toEqual('form1');
      const info = onFormFinish.mock.calls[0][1];
      expect(info.values).toEqual({ name: value });
      expect(Object.keys(info.forms).sort()).toEqual(['form1', 'form2'].sort());
    });
  });
});
