import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import InputDate, { type DateProps } from '..';
import {
  expectHintsToBeInTheDocument,
  expectRequiredToBeInTheDocument,
  expectToBeReadonly,
  expectTypeNotToCallOnChange,
} from '../../__tests__/utils';

describe('Date', () => {
  const TEST_ID: TestId = 'input-date';
  const ROLE = 'textbox';

  const renderComponent = ({ ...props }: Partial<DateProps> = {}) =>
    render(<InputDate data-testid={TEST_ID} role={ROLE} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be disabled and not call onChange function', async () => {
    await expectTypeNotToCallOnChange<DateProps>(
      renderComponent,
      {},
      async () => screen.getByRole(ROLE),
    );
  });

  it('should display label', async () => {
    renderComponent({ label: 'some-date' });
    expect(screen.getByText('some-date'));
  });

  it('should display required indicator', async () => {
    await expectRequiredToBeInTheDocument<DateProps>(renderComponent);
  });

  it('should display hints', async () => {
    await expectHintsToBeInTheDocument<DateProps>(renderComponent);
  });

  it('should be readonly', async () => {
    await expectToBeReadonly<DateProps>(renderComponent, {}, async () =>
      screen.getByRole(ROLE),
    );
  });

  it('should have a element before', async () => {
    const elementBefore = <div data-testid="element-before"></div>;

    renderComponent({ elementBefore });
    await expectToBeVisibleInTheDocument('element-before');
  });

  it('should have a element after', async () => {
    const elementAfter = <div data-testid="element-after"></div>;

    renderComponent({ elementAfter });
    await expectToBeVisibleInTheDocument('element-after');
  });

  it('should be required but not have * mark', async () => {
    renderComponent({
      label: 'label',
      required: true,
      withRequiredMark: false,
    });

    await expectToBeVisibleInTheDocument('label', screen.findByText);
    await expectNotToBeVisibleInTheDocument('label *', screen.queryByText);
  });

  it('should have min and max value as date', async () => {
    renderComponent({
      max: new Date('May 19, 2024 12:00:00'),
      min: new Date('May 17, 2024 12:00:00'),
    });
    const input = await screen.findByRole('textbox');
    expect(input).toHaveAttribute('min', '2024-05-17');
    expect(input).toHaveAttribute('max', '2024-05-19');
  });

  describe('accessibility', () => {
    const LABEL_TEXT = 'date';

    it('can find the input by label text and selector', async () => {
      render(<InputDate label={LABEL_TEXT} />);

      expect(
        screen.getByLabelText(LABEL_TEXT, { selector: 'input' }),
      ).toBeInstanceOf(HTMLInputElement);
    });

    it('can find the input by role and name', async () => {
      render(<InputDate label={LABEL_TEXT} />);

      expect(screen.getByRole('textbox', { name: LABEL_TEXT })).toBeInstanceOf(
        HTMLInputElement,
      );
    });

    it('can find the input by role and name (obfuscated)', async () => {
      render(<InputDate label={LABEL_TEXT} preventAutocomplete />);

      expect(screen.getByRole('textbox', { name: LABEL_TEXT })).toBeInstanceOf(
        HTMLInputElement,
      );
    });
  });
});
