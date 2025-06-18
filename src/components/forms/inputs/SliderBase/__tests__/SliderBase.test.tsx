import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { SliderBaseProps } from '..';
import SliderBase from '..';
import type { SliderLabelOptions } from '../types';

describe('SliderBase', () => {
  const TEST_ID: TestId = 'slider-base';
  const defaultValue = 10;

  const renderComponent = ({
    value,
    ...props
  }: Partial<SliderBaseProps> = {}) =>
    render(
      <SliderBase
        data-testid={TEST_ID}
        value={value ?? defaultValue}
        {...props}
      />,
    );

  const user = userEvent.setup();

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have main label', async () => {
    const label = 'main label';
    renderComponent({ label });
    await expectToBeVisibleInTheDocument(label, screen.findByText);
  });

  it('should have left and right label', async () => {
    const leftLabel = 'start';
    const rightLabel = 'end';
    renderComponent({ leftLabel, rightLabel });

    await expectToBeVisibleInTheDocument(leftLabel, screen.findByText);
    await expectToBeVisibleInTheDocument(rightLabel, screen.findByText);
  });

  it('should render label with dynamic values', async () => {
    const value = 40;
    const label = ({ min, max, value }: SliderLabelOptions) =>
      `min=${min} max=${max} value=${value}`;
    renderComponent({ label, value, min: 20, max: 60 });

    await expectToBeVisibleInTheDocument(
      'min=20 max=60 value=40',
      screen.findByText,
    );
  });

  it('should be contained in section', async () => {
    renderComponent({ startLabel: 'start' });
    await expectToBeVisibleInTheDocument('section');
  });

  it('should be contained in fragment', async () => {
    renderComponent({});
    await expectNotToBeVisibleInTheDocument('section');
  });

  it('should have popover for marks', async () => {
    renderComponent({
      marks: {
        10: {
          label: '10',
          popoverContent: 'popover content',
        },
      },
    });

    await user.click(await screen.findByText('10'));

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument(
        'popover content',
        screen.findByText,
      );
    });
  });
});
