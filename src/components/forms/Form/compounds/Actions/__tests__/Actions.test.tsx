import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormStore } from '@/skin/forms/Form/FormStore';

import { Form } from '../../../..';

describe('Form actions', () => {
  const user = userEvent.setup();
  const formStore = new FormStore(() => {});
  const form = formStore.getForm();

  it('should render actions', async () => {
    render(<Form.Actions form={form} />);

    await expectToBeVisibleInTheDocument('form-actions');
  });

  it('should render reset and submit actions', async () => {
    render(<Form.Actions form={form} />);

    await expectToBeVisibleInTheDocument('button-reset');
    await expectToBeVisibleInTheDocument('button-submit');
  });

  it('should render startElement', async () => {
    render(<Form.Actions form={form} startElement="start" />);

    await expectToBeVisibleInTheDocument('start', screen.findByText);
  });

  it('should render endElement', async () => {
    render(<Form.Actions endElement="end" form={form} />);

    await expectToBeVisibleInTheDocument('end', screen.findByText);
  });

  it('should have type', async () => {
    render(<Form.Actions form={form} type="danger" />);

    expect(await screen.findByTestId('button-submit')).toHaveClass(
      'containedDanger',
    );
  });

  it.skip('should call onSubmit and onReset', async () => {
    const onSubmit = vi.fn();
    const onReset = vi.fn();

    render(
      <Form.Actions
        disabled={false}
        form={form}
        onReset={onReset}
        onSubmit={onSubmit}
      />,
    );

    const submit = await screen.findByTestId('button-reset');
    const reset = await screen.findByTestId('button-submit');

    await user.click(submit);
    expect(onSubmit).toHaveBeenCalledTimes(1);

    await user.click(reset);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('should not have icons', async () => {
    render(<Form.Actions form={form} resetIcon={null} submitIcon={null} />);
    await expectNotToBeVisibleInTheDocument('icon');
  });

  it('should be disabled', async () => {
    render(<Form.Actions disabled={true} form={form} />);

    const submit = await screen.findByTestId('button-submit');
    const reset = await screen.findByTestId('button-reset');

    expect(submit).toBeDisabled();
    expect(reset).toBeEnabled();
  });

  it('should have custom icon', async () => {
    render(<Form.Actions form={form} resetIcon="Retract" submitIcon="Add" />);

    await expectToBeVisibleInTheDocument('icon-Retract');
    await expectToBeVisibleInTheDocument('icon-Add');
  });
});
