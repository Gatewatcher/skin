import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { GoToPageProps } from '..';
import GoToPage from '..';

describe('GoToPage', () => {
  const TEST_ID: TestId = 'go-to-page';

  const renderComponent = ({
    onChange,
    totalPages,
    value,
    ...props
  }: Partial<GoToPageProps> = {}) =>
    render(
      <GoToPage
        data-testid={TEST_ID}
        onChange={onChange || (() => {})}
        totalPages={totalPages || 10}
        value={value || 1}
        {...props}
      />,
    );

  const getInput = async () =>
    await screen.findByRole('spinbutton', { name: 'Page' });

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should display current page', async () => {
    renderComponent({ value: 5 });
    expect(await getInput()).toHaveValue(5);
  });

  it('should update page', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange });
    await fireEvent.change(await getInput(), { target: { value: 2 } });
    expect(await getInput()).toHaveValue(2);
  });

  it('should call onChange', async () => {
    const onChange = vi.fn();
    renderComponent({ onChange });
    fireEvent.change(await getInput(), { target: { value: 2 } });

    await waitFor(async () => {
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });

  it('should have max', async () => {
    renderComponent();
    expect(await getInput()).toHaveAttribute('max', '10');
  });

  it('should not go over max', async () => {
    renderComponent({ totalPages: 10, value: 50 });
    expect(await getInput()).toHaveValue(10);
  });

  it('should not change over max', async () => {
    renderComponent();
    fireEvent.change(await getInput(), { target: { value: 50 } });
    expect(await getInput()).toHaveValue(10);
  });
});
