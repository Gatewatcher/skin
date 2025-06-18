import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { KeyValueProps } from '..';
import KeyValue from '..';

describe('KeyValue', () => {
  const TEST_ID: TestId = 'key-value';

  const renderComponent = ({
    label = 'Label',
    value = 'Value',
    ...rest
  }: Partial<KeyValueProps> = {}) =>
    render(
      <KeyValue data-testid={TEST_ID} label={label} value={value} {...rest} />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render label and value', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('Label', screen.findByText);
    await expectToBeVisibleInTheDocument('Value', screen.findByText);
  });

  it('should render valueFallback', async () => {
    renderComponent({ value: null });
    await expectToBeVisibleInTheDocument('-', screen.findByText);
  });

  it('should render custom valueFallback', async () => {
    renderComponent({ value: '', valueFallback: 'fallback' });
    await expectToBeVisibleInTheDocument('fallback', screen.findByText);
  });

  it('should not render fallback', async () => {
    renderComponent({ value: 0 });
    await expectToBeVisibleInTheDocument('0', screen.findByText);
  });

  it('should render component', async () => {
    renderComponent({
      label: <div data-testid="custom-label">custom-label</div>,
      value: <div data-testid="custom-value">custom-value</div>,
    });

    await expectToBeVisibleInTheDocument('custom-label');
    await expectToBeVisibleInTheDocument('custom-value');
  });
});
