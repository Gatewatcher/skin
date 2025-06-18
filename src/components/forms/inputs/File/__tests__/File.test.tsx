import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Ref } from 'react';

import type { FileProps } from '..';
import InputFile from '..';

const file = new File(['(⌐□_□)'], 'chuckNorris.png', { type: 'image/png' });

describe('InputFile', () => {
  const TEST_ID: TestId = 'input-file';
  const BUTTON_TEST_ID = suffixTestId(TEST_ID, 'button');
  const INPUT_TEST_ID = suffixTestId(TEST_ID, 'input');

  const user = userEvent.setup();

  const renderComponent = ({
    label = '',
    onChange = () => {},
    ...props
  }: Partial<FileProps & { ref: Ref<HTMLInputElement> }> = {}) =>
    render(
      <InputFile
        data-testid={TEST_ID}
        label={label}
        onChange={onChange}
        {...props}
      />,
    );

  const getButton = () => screen.getByTestId<HTMLButtonElement>(BUTTON_TEST_ID);
  const getInput = () => screen.getByTestId<HTMLInputElement>(INPUT_TEST_ID);

  it('should render a button and an invisible input', async () => {
    renderComponent();

    await expectToBeVisibleInTheDocument(BUTTON_TEST_ID);
    expect(screen.getByTestId(INPUT_TEST_ID)).not.toBeVisible();
  });

  it('should select a single file', async () => {
    renderComponent();
    const input = getInput();

    await user.upload(input, file);

    expect(input.files && [...input.files]).toEqual(
      expect.arrayContaining([file]),
    );
  });

  it('should select multiple files', async () => {
    renderComponent({ multiple: true });
    const input = getInput();

    await user.upload(input, [file, file]);

    expect(input.files && [...input.files].length).toBe(2);
  });

  it('should call onChange', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange });
    const input = getInput();

    await user.upload(input, file);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({
          target: expect.any(HTMLInputElement),
        }),
        files: expect.arrayContaining([file]),
      }),
    );
  });

  it('should call onChange for the same file', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange });
    const button = getButton();
    const input = getInput();

    await user.upload(input, file);
    // We need to call click manually
    // because upload doesn't trigger a click.
    await user.click(button);
    await user.upload(input, file);

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('should not call onChange for the same file if resetOnClick is false', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange, resetOnClick: false });
    const button = getButton();
    const input = getInput();

    await user.upload(input, file);
    await user.click(button);
    await user.upload(input, file);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should react to a click on the button by calling input.onClick', async () => {
    const onClick = vi.fn();
    renderComponent({ onClick });
    const button = getButton();

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('should forward a ref to the input', async () => {
    const ref = vi.fn();
    renderComponent({ ref });

    expect(ref).toHaveBeenCalled();
  });
});
