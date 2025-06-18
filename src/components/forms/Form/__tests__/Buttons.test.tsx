import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormStore } from '@/skin/forms/Form/FormStore';

import Form from '..';
import { Input } from '../..';

describe('Form buttons', () => {
  it('should render submit button', async () => {
    render(
      <Form.ButtonSubmit data-testid="button-submit">submit</Form.ButtonSubmit>,
    );
    await expectToBeVisibleInTheDocument('button-submit');
  });

  it('should render reset button', async () => {
    render(
      <Form.ButtonReset data-testid="button-reset">reset</Form.ButtonReset>,
    );
    await expectToBeVisibleInTheDocument('button-reset');
  });

  it('should submit form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <Form onFinish={onSubmit}>
        <Form.Field name="firstname">
          <Input.Text />
        </Form.Field>

        <Form.ButtonSubmit>Submit</Form.ButtonSubmit>
      </Form>,
    );

    const input = await screen.findByRole('textbox');
    await user.type(input, 'john');

    await user.click(await screen.findByRole('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      firstname: 'john',
    });
  });

  it('should reset form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onReset = vi.fn();

    render(
      <Form onFinish={onSubmit} onReset={onReset}>
        <Form.Field name="firstname">
          <Input.Text />
        </Form.Field>

        <Form.ButtonReset data-testid="reset">reset</Form.ButtonReset>
        <Form.ButtonSubmit data-testid="submit">Submit</Form.ButtonSubmit>
      </Form>,
    );

    const input = await screen.findByRole('textbox');
    await user.type(input, 'john');

    await expectToBeVisibleInTheDocument('john', screen.findByDisplayValue);
    await user.click(await screen.findByTestId('reset'));
    expect(onReset).toHaveBeenCalledTimes(1);
    await expectToBeVisibleInTheDocument('', screen.findByDisplayValue);

    await user.click(await screen.findByTestId('submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      firstname: undefined,
    });
  });

  it('should be disabled on loading', async () => {
    const user = userEvent.setup();
    const formStore = new FormStore(() => {});
    const form = formStore.getForm();

    render(
      <Form>
        <Form.Field name="firstname">
          <Input.Text />
        </Form.Field>

        <Form.Actions form={form} submitText="submit" isLoading />
      </Form>,
    );

    const input = await screen.findByRole('textbox');
    await user.type(input, 'john');

    const submitButton = await screen.findByText('submit');
    expect(submitButton).toBeDisabled();
  });
});
