import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { HelperProps } from '..';
import Helper from '..';

describe('Helper', () => {
  const TEST_ID: TestId = 'helper';
  const content = 'content';

  const renderComponent = ({
    children = content,
    ...props
  }: Partial<HelperProps> = {}) =>
    render(
      <Helper data-testid={TEST_ID} {...props}>
        {children}
      </Helper>,
    );

  const user = userEvent.setup();

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(content, screen.findByText);
  });

  it('should have icons', async () => {
    renderComponent();
    await waitFor(async () => {
      const icons = await screen.findAllByRole('img');
      expect(icons.length).toBe(2);
    });
  });

  it('should have no icons', async () => {
    renderComponent({ withClose: false, withIcon: false });
    const icons = screen.queryAllByRole('img');
    expect(icons.length).toBe(0);
  });

  it('should have only info icon', async () => {
    renderComponent({ withClose: false });
    await expectToBeVisibleInTheDocument('info');
    await expectNotToBeVisibleInTheDocument('close');
  });

  it('should have only close icon', async () => {
    renderComponent({ withIcon: false });
    await expectToBeVisibleInTheDocument('close');
    await expectNotToBeVisibleInTheDocument('info');
  });

  it('should close', async () => {
    const onClose = vi.fn();
    renderComponent({ onClose });
    const close = await screen.findByTestId('close');
    await user.click(close);

    expect(onClose).toHaveBeenCalledTimes(1);

    await waitFor(async () => {
      await expectNotToBeVisibleInTheDocument(TEST_ID);
    });
  });

  it('should render paragraph', async () => {
    renderComponent({ children: 'a string' });
    await expectToBeVisibleInTheDocument('paragraph');
    await expectToBeVisibleInTheDocument('a string', screen.findByText);
  });

  it('should render custom children', async () => {
    renderComponent({ children: <div data-testid="children">children</div> });
    await expectToBeVisibleInTheDocument('children');
    await expectToBeVisibleInTheDocument('children', screen.findByText);
  });
});
