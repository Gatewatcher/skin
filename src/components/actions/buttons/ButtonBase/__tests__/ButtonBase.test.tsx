import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ButtonBaseProps, InternalButtonBaseProps } from '..';
import ButtonBase from '..';

describe('Button base', () => {
  const TEST_ID: TestId = 'button-base';
  const content = 'button';

  const user = userEvent.setup();

  const renderComponent = (
    props: Partial<ButtonBaseProps & InternalButtonBaseProps> = {},
  ) => {
    return render(
      <ButtonBase data-testid={TEST_ID} {...props}>
        {content}
      </ButtonBase>,
    );
  };

  const getBtn = async () => screen.findByRole('button');

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(content, screen.findByText);
  });

  it('should call onClick on click', async () => {
    const onClick = vi.fn();
    renderComponent({ onClick });
    await user.click(await getBtn());
    expect(onClick).toBeCalledTimes(1);
  });

  it('should be primary as default', async () => {
    renderComponent();
    const btn = await getBtn();
    expect(btn).toHaveClass('containedPrimary');
  });

  it('should be outlined', async () => {
    renderComponent({ variant: 'outlined' });
    const btn = await getBtn();
    expect(btn).toHaveClass('outlinedPrimary');
  });

  it('should be danger', async () => {
    renderComponent({ type: 'danger' });
    const btn = await getBtn();
    expect(btn).toHaveClass('containedDanger');
  });

  it('should not have onClick', async () => {
    renderComponent();
    const btn = await getBtn();
    expect(btn).not.toHaveAttribute('onClick');
  });

  it('should be disabled', async () => {
    renderComponent({ disabled: true });
    const btn = await getBtn();
    expect(btn).toBeDisabled();
  });

  it('should have onClick disabled', async () => {
    const onClick = vi.fn();
    renderComponent({ disabled: true, onClick });
    const btn = await getBtn();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should be ghosted', async () => {
    renderComponent({ variant: 'ghosted' });
    const btn = await getBtn();
    expect(btn).toHaveClass('ghostedPrimary');
  });

  it('should render startElement', async () => {
    renderComponent({ startElement: <div data-testid="start">start</div> });
    await expectToBeVisibleInTheDocument('start');
  });

  it('should render endElement', async () => {
    renderComponent({ endElement: <div data-testid="end">end</div> });
    await expectToBeVisibleInTheDocument('end');
  });

  it('should have button type', async () => {
    renderComponent();
    const btn = await getBtn();
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('should have submit type', async () => {
    renderComponent({ behavior: 'submit' });
    const btn = await getBtn();
    expect(btn).toHaveAttribute('type', 'submit');
  });

  it('should have reset type', async () => {
    renderComponent({ behavior: 'reset' });
    const btn = await getBtn();
    expect(btn).toHaveAttribute('type', 'reset');
  });

  it('should be bared', async () => {
    renderComponent({ variant: 'bared' });
    const btn = await getBtn();
    expect(btn).toHaveClass('bared');
  });

  it('should not have className if not bared', async () => {
    renderComponent({ className: 'custom' });
    const btn = await getBtn();
    expect(btn).not.toHaveClass('custom');
  });

  it('should have className if bared', async () => {
    renderComponent({
      variant: 'bared',
      className: 'custom',
    });
    const btn = await getBtn();
    expect(btn).toHaveClass('custom');
  });

  it('should be transparent', async () => {
    renderComponent({ variant: 'transparent' });
    const btn = await getBtn();
    expect(btn).toHaveClass('transparentPrimary');
  });
});
