import {
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DEFAULT_SHORTCUT_PLACEHOLDER } from '../constants';
import type { SearchBarProps } from '../index';
import SearchBar from '../index';

describe('SearchBar', () => {
  const TEST_ID: TestId = 'search-bar';

  const renderComponent = ({ ...props }: Partial<SearchBarProps> = {}) => {
    const user = userEvent.setup();
    return {
      user,
      ...render(<SearchBar data-testid={TEST_ID} {...props} />),
    };
  };

  const getSearchBar = () => screen.getByTestId(TEST_ID);
  const getInput = () => screen.getByTestId(suffixTestId(TEST_ID, 'input'));
  const getClear = () => screen.getByTestId(suffixTestId(TEST_ID, 'clear'));

  it('should render', async () => {
    renderComponent();

    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be disabled', async () => {
    renderComponent({ disabled: true });

    expect(getInput()).toBeDisabled();
  });

  it('should call onFocus()', async () => {
    const onFocus = vi.fn();
    const { user } = renderComponent({ onFocus });

    await user.click(getSearchBar());

    expect(onFocus).toHaveBeenCalled();
  });

  it('should focus the input', async () => {
    const onFocusMock = vi.fn();
    const { user } = renderComponent({ onFocus: onFocusMock });

    await user.click(getSearchBar());

    expect(getInput()).toHaveFocus();
  });

  it('should focus the input on shortcut', async () => {
    const onFocusMock = vi.fn();
    const { user } = renderComponent({
      withShortcut: true,
      onFocus: onFocusMock,
    });

    await user.type(document.body, '/');

    expect(getInput()).toHaveFocus();
  });

  it('should call onBlur()', async () => {
    const onBlur = vi.fn();
    const { user } = renderComponent({ onBlur });

    await user.click(getSearchBar());
    await user.click(document.body);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should call onChange()', async () => {
    const onChange = vi.fn();
    const { user } = renderComponent({ onChange });

    await user.click(getSearchBar());
    await user.type(getInput(), 'bar');

    expect(onChange).toHaveBeenNthCalledWith(1, 'b');
    expect(onChange).toHaveBeenNthCalledWith(2, 'ba');
    expect(onChange).toHaveBeenNthCalledWith(3, 'bar');

    expect(getInput()).toHaveValue('bar');
  });

  it('should call onClear() when the user clicks on clear', async () => {
    const onClear = vi.fn();

    const { user } = renderComponent({
      isClearable: true,
      onClear,
      value: 'foo',
    });

    await user.click(getClear());

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('should display a tooltip', async () => {
    renderComponent({ tooltipContent: 'Helper message' });

    await expectToBeVisibleInTheDocument('floating-trigger');
  });

  it('should display a circular loader', async () => {
    renderComponent({ isLoading: true });

    await expectToBeVisibleInTheDocument('circular-loader-svg');
  });

  it('should not call onFocus() when the user clears the unfocused search', async () => {
    const onFocusMock = vi.fn();
    const { user } = renderComponent({
      isClearable: true,
      onFocus: onFocusMock,
      preventFocusOnClear: true,
      value: 'foo',
    });

    await user.click(getClear());

    expect(onFocusMock).not.toHaveBeenCalled();
  });

  it('should call onEnter', async () => {
    const onEnter = vi.fn();

    const { user } = renderComponent({ onEnter });

    await user.type(getInput(), '{enter}');
    expect(onEnter).toHaveBeenCalled();
  });

  it('should call onArrowDown', async () => {
    const onArrowDown = vi.fn();

    const { user } = renderComponent({ onArrowDown });

    await user.type(getInput(), '{arrowdown}');
    expect(onArrowDown).toHaveBeenCalled();
  });
  it('should call onArrowUp', async () => {
    const onArrowUp = vi.fn();

    const { user } = renderComponent({ onArrowUp });

    await user.type(getInput(), '{arrowup}');
    expect(onArrowUp).toHaveBeenCalled();
  });

  it('should call onClear', async () => {
    const onClear = vi.fn();
    const onChange = vi.fn();

    const { user } = renderComponent({
      onClear,
      onChange,
      isClearable: true,
      defaultValue: 'value',
    });

    expect(getInput()).toHaveValue('value');

    await user.click(getClear());

    expect(onClear).toHaveBeenCalled();
    expect(onChange).toHaveBeenNthCalledWith(1, '');

    expect(getInput()).toHaveValue('');
  });

  it('should render placeholder', async () => {
    renderComponent({
      placeholder: 'placeholder',
    });

    expect(getInput()).toHaveProperty('placeholder', 'placeholder');
  });

  it('shouold render search pleaceholder', async () => {
    renderComponent({
      withShortcut: true,
    });

    expect(getInput()).toHaveProperty(
      'placeholder',
      DEFAULT_SHORTCUT_PLACEHOLDER,
    );
  });
});
