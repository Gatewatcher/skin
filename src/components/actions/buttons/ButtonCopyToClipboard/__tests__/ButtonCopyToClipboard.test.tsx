import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockClipboardWriteText } from 'utils/tests';

import { Toastr } from '@/skin/feedback';

import type { ButtonCopyToClipboardProps } from '..';
import ButtonCopyToClipboard from '..';
import { DEFAULT_TEST_ID } from '../constants';

describe('ButtonCopyToClipboard', () => {
  const TEST_ID: TestId = DEFAULT_TEST_ID;
  const ERROR_TOAST_TITLE = 'Copy to clipboard error';

  const renderComponent = ({
    children,
    clipText = '',
    ...props
  }: Partial<ButtonCopyToClipboardProps> = {}) => {
    const user = userEvent.setup();

    return {
      user,
      ...render(
        <Toastr>
          <ButtonCopyToClipboard
            clipText={clipText}
            data-testid={TEST_ID}
            errorToastTitle={ERROR_TOAST_TITLE}
            {...props}
          >
            {children}
          </ButtonCopyToClipboard>
        </Toastr>,
      ),
    };
  };

  const getButton = () => screen.getByTestId(TEST_ID);

  const expectCheckIconVisibility = async (
    icon: 'Copy' | 'Check',
    shouldBeVisible: boolean,
  ) => {
    const expectVisibility = shouldBeVisible
      ? await expectToBeVisibleInTheDocument
      : await expectNotToBeVisibleInTheDocument;

    await waitFor(async () => {
      await expectVisibility(
        icon ? suffixTestId('icon', icon) : 'success-icon',
      );
    });
  };

  it('should call window.navigator.clipboard.writeText()', async () => {
    const { user } = renderComponent();
    const writeTextMock = mockClipboardWriteText();

    await user.click(getButton());

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
    });
  });

  it('should call onSuccess()', async () => {
    const onSuccessMock = vi.fn();
    const { user } = renderComponent({ onSuccess: onSuccessMock });

    const button = getButton();
    await user.hover(button);
    await user.click(button);

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  it('should call onError()', async () => {
    const onErrorMock = vi.fn();
    const { user } = renderComponent({ onError: onErrorMock });
    mockClipboardWriteText(() => {
      throw new Error('Oops');
    });

    const button = getButton();
    await user.hover(button);
    await user.click(button);

    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledWith('Oops');
    });

    const toast = screen.getByTestId('toast-error');
    expect(toast).toHaveTextContent(ERROR_TOAST_TITLE);
    expect(toast).toHaveTextContent('Oops');
  });

  it('should display the copy icon at start', async () => {
    renderComponent({ startIcon: 'Add' });

    await expectCheckIconVisibility('Copy', true);
  });

  it('should display the copy icon at end', async () => {
    renderComponent({ endIcon: 'Copy' });

    await expectCheckIconVisibility('Copy', true);
  });

  it('should display a check icon after the copy, then remove it', async () => {
    const { user } = renderComponent({ successDuration: 200 });

    await user.click(getButton());

    await expectCheckIconVisibility('Check', true);
    await expectCheckIconVisibility('Check', false);
  });

  it('should replace endIcon with a check icon after the copy, then switch them again', async () => {
    const { user } = renderComponent({ endIcon: 'Copy', successDuration: 200 });

    await user.click(getButton());

    await expectCheckIconVisibility('Check', true);
    const allIcons = screen.getAllByTestId('icon');
    expect(allIcons.length).toBe(1);
    await expectCheckIconVisibility('Check', false);
    await expectCheckIconVisibility('Copy', true);
  });

  it('should replace endIcon with a check icon after the copy, then switch them again', async () => {
    const { user } = renderComponent({
      startIcon: 'Add',
      successDuration: 200,
    });

    await user.click(getButton());

    await expectCheckIconVisibility('Check', true);
    const allIcons = screen.getAllByTestId('icon');
    expect(allIcons.length).toBe(2);
    await expectCheckIconVisibility('Check', false);
    await expectCheckIconVisibility('Copy', true);
  });
});
