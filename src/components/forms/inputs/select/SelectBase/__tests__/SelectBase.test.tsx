import {
  expectIsLoading,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { SelectBaseProps } from '../index';
import SelectBase from '../index';

describe('SelectBase', () => {
  const HELPER_TEXT = "I'm here to help you";
  const LABEL = 'Go for it!';
  const OPTIONS = [
    { label: 'Goldfish', value: 'goldfish' },
    { label: 'Starfish', value: 'starfish' },
    { label: 'Shark', value: 'shark' },
  ];
  const PLACEHOLDER = 'Type your search here';

  const DEFAULT_PROPS = {
    meta: {
      helpers: [HELPER_TEXT],
    },
    label: LABEL,
    options: OPTIONS,
    placeholder: PLACEHOLDER,
  };

  const getSelect = () => screen.getByRole('combobox', { name: LABEL });

  const renderComponent = (props: Partial<SelectBaseProps> = {}) => ({
    user: userEvent.setup(),
    ...render(<SelectBase {...DEFAULT_PROPS} {...props} />),
  });

  it('should display the custom label', async () => {
    renderComponent();
    const label = screen.getByText(LABEL);
    expect(label).toBeVisible();
  });

  it('should display the custom placeholder', async () => {
    renderComponent();
    const placeholder = screen.getByText(PLACEHOLDER);
    expect(placeholder).toBeVisible();
  });

  it('should display the custom helper text', async () => {
    renderComponent();
    const helperText = screen.getByText(HELPER_TEXT);
    expect(helperText).toBeVisible();
  });

  it('should open the menu, select the first option, and display it in the select', async () => {
    const { user } = renderComponent();

    // Open the menu, select the first option, then re-open the menu.
    const select = getSelect();
    await user.click(select);
    await user.keyboard('{Enter}');
    await user.click(select);

    // Now we must have 2 goldfish displayed.
    const goldfishes = screen.getAllByText('Goldfish');
    expect(goldfishes.length).toBe(2);
  });

  it('should call onChange() with the selected options', async () => {
    const onChange = vi.fn();
    const { user } = renderComponent({ onChange });

    const select = getSelect();
    await user.click(select);
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith(OPTIONS[0], expect.any(Object));
  });

  it('should display a loader', async () => {
    renderComponent({ isLoading: true });

    await expectIsLoading();
  });

  it('should be disabled', async () => {
    renderComponent({ disabled: true });

    const select = screen.getByRole('combobox', { hidden: true });
    expect(select).toBeDisabled();
  });

  it('should search options by typing', async () => {
    const { user } = renderComponent({ isSearchable: true });
    const select = getSelect();

    // All the options are displayed without search
    await user.click(select);
    const seaAnimals = screen.getAllByTestId('option');
    expect(seaAnimals.length).toBe(OPTIONS.length);

    // Searching for 'fish' should return 'Goldfish' and 'Starfish'
    await user.clear(select);
    await user.type(select, 'fish');
    const fishSearchOptions = screen.getAllByTestId('option');
    expect(fishSearchOptions.length).toBe(2);

    // Only 'Goldfish' is displayed
    await user.clear(select);
    await user.type(select, 'gold');
    const goldSearchOptions = screen.getAllByTestId('option');
    expect(goldSearchOptions.length).toBe(1);
    expect(goldSearchOptions[0].textContent).toBe('Goldfish');

    // Only 'Starfish' is displayed
    await user.clear(select);
    await user.type(select, 'star');
    const starSearchOptions = screen.getAllByTestId('option');
    expect(starSearchOptions.length).toBe(1);
  });

  it('should have footer', async () => {
    const { user } = renderComponent({
      footer: <div data-testid="footer">footer</div>,
    });

    const select = getSelect();
    await user.click(select);
    await expectToBeVisibleInTheDocument('footer');
  });

  it('should be not clearable if required', async () => {
    const { user } = renderComponent({ required: true });

    const select = getSelect();
    await user.click(select);
    await user.keyboard('{Enter}');

    expect(await screen.queryByTestId('button-close')).not.toBeInTheDocument();
  });

  describe('render', () => {
    const options = [{ value: 'value', label: 'label' }];

    it('should render label as', async () => {
      const { user } = renderComponent({
        options,
        renderLabelAs: ({ label, value }) => (
          <div data-testid={value}>{label}</div>
        ),
      });

      const select = getSelect();
      await user.click(select);

      await expectToBeVisibleInTheDocument('value');
      await expectToBeVisibleInTheDocument('label', screen.findByText);
    });

    it('should render option as', async () => {
      const { user } = renderComponent({
        options,
        renderOptionLabelAs: ({ label, value }) => (
          <div data-testid={value}>{label}</div>
        ),
      });

      const select = getSelect();
      await user.click(select);

      await expectToBeVisibleInTheDocument('value');
      await expectToBeVisibleInTheDocument('label', screen.findByText);
    });

    it('should render value as', async () => {
      renderComponent({
        options,
        renderValueAs: option => <div data-testid="value">{option.label}</div>,
        defaultValue: options[0],
      });

      await expectToBeVisibleInTheDocument('label', screen.findByText);
    });
  });
});
