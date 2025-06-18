import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { ByRoleMatcher, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FormEventHandler } from 'react';

import type { PinCodeProps } from '..';
import PinCode from '..';
import {
  expectHintsToBeInTheDocument,
  expectRequiredToBeInTheDocument,
} from '../../__tests__/utils';
import { DEFAULT_PIN_CODE_LENGTH } from '../constants';

describe('PinCode', () => {
  const TEST_ID: TestId = 'input-pincode';
  const renderComponent = ({ ...props }: Partial<PinCodeProps> = {}) =>
    render(<PinCode {...props} />);
  const renderComponentInFormWithSubmit = ({
    ...props
  }: Partial<PinCodeProps> & { onSubmit?: FormEventHandler } = {}) =>
    render(
      <form onSubmit={props.onSubmit}>
        <PinCode {...props} />
        <button type="submit" />
      </form>,
    );

  const findInputs = async (role: ByRoleMatcher = 'spinbutton') =>
    await screen.findAllByRole(role);

  const findInput = async (
    index: number,
    role: ByRoleMatcher = 'spinbutton',
  ) => {
    const inputs = await findInputs(role);
    return inputs[index];
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have a default length', async () => {
    renderComponent();
    const inputs = await findInputs();

    expect(inputs).toHaveLength(DEFAULT_PIN_CODE_LENGTH);
  });

  it('should have a custom length', async () => {
    renderComponent({ length: 2 });
    const inputs = await findInputs();

    expect(inputs).toHaveLength(2);
  });

  it('should call onComplete', async () => {
    const onComplete = vi.fn();
    renderComponent({ onComplete });

    const inputs = await findInputs();

    for (const [index, input] of inputs.entries()) {
      await userEvent.setup().type(input, (index + 1).toString());
    }
    expect(onComplete).toHaveBeenNthCalledWith(1, '123456');
  });

  it('should call onChange', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange });

    const input = await findInput(0);

    await userEvent.type(input, '1');
    expect(onChange).toHaveBeenNthCalledWith(1, '1');
  });

  it('should only accept numbers', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange });

    await userEvent.type(await findInput(0), 'a');
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.type(await findInput(1), '1');
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('should only accept letters', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange, type: 'letters' });

    await userEvent.type(await findInput(0, 'textbox'), '1');
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.type(await findInput(1, 'textbox'), 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('should accept any input', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange, type: 'any' });

    await userEvent.type(await findInput(0, 'textbox'), '1');
    await userEvent.type(await findInput(1, 'textbox'), 'a');
    expect(onChange).toHaveBeenNthCalledWith(2, '1a');
  });

  it('should display label', async () => {
    renderComponent({ label: 'some text' });
    await expectToBeVisibleInTheDocument('some text', screen.findByText);
  });

  it('should display required indicator', async () => {
    await expectRequiredToBeInTheDocument(renderComponent);
  });

  it('should display hints', async () => {
    await expectHintsToBeInTheDocument(renderComponent);
  });

  it('should navigate with right arrow key', async () => {
    renderComponent();

    const input = await findInput(0);

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowRight}');

    expect(await findInput(1)).toHaveFocus();
  });

  it('should navigate with left arrow key', async () => {
    renderComponent();

    const input = await findInput(1);

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowLeft}');

    expect(await findInput(0)).toHaveFocus();
  });

  it('should navigate with tab key', async () => {
    renderComponent();

    const input = await findInput(0);

    await userEvent.click(input);
    await userEvent.keyboard('{Tab}');

    expect(await findInput(1)).toHaveFocus();
  });

  it('should navigate with shift+tab key', async () => {
    renderComponent();

    const input = await findInput(1);

    await userEvent.click(input);
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    expect(await findInput(0)).toHaveFocus();
  });

  it('should submit on enter press', async () => {
    const onSubmit = vi.fn();

    renderComponentInFormWithSubmit({ onSubmit });
    const inputs = await findInputs();

    for (const [index, input] of inputs.entries()) {
      await userEvent.setup().type(input, (index + 1).toString());
    }

    await userEvent.keyboard('{Enter}');
    expect(onSubmit).toHaveBeenCalled();
  });
});
