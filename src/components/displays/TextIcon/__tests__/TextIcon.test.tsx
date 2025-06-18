import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor } from '@testing-library/react';
import { getColor } from 'utils/theme';

import { ICON_SIZES_REM } from '@/constants';

import type { TextIconProps } from '..';
import TextIcon from '..';

describe('TextIcon', () => {
  const TEST_ID: TestId = 'text-icon';

  const renderComponent = ({
    children = 'content',
    startIcon,
    ...props
  }: Partial<TextIconProps> = {}) =>
    render(
      <TextIcon data-testid={TEST_ID} startIcon={startIcon || 'Add'} {...props}>
        {children}
      </TextIcon>,
    );

  it('should have text content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('content', screen.findByText);
  });

  it('should have at least one icon', async () => {
    renderComponent();
    const icons = await screen.findAllByRole('img');
    expect(icons).toHaveLength(1);
  });

  it('should have two icons', async () => {
    renderComponent({ startIcon: 'ArrowDownLeft', endIcon: 'Add' });

    await waitFor(async () => {
      const icons = await screen.findAllByRole('img');
      expect(icons).toHaveLength(2);
    });
  });

  it('should be render in a container', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be a span', async () => {
    renderComponent();
    const element = await screen.findByTestId(TEST_ID);
    expect(element.tagName).toBe('SPAN');
  });

  it('should be render in fragment', async () => {
    const { container } = renderComponent({
      asFragment: true,
      endIcon: 'Add',
      startIcon: 'Add',
    });
    expect(container.childElementCount).toBe(2);
  });

  it('should have type', async () => {
    renderComponent({ type: 'critical' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveStyle({ color: getColor('critical') });
  });

  it('should have small icon', async () => {
    renderComponent({ iconSize: 'small', startIcon: 'Add' });
    const element = await screen.findByTestId('icon-Add');
    expect(element).toHaveAttribute('width', ICON_SIZES_REM.small);
  });

  it('should have size', async () => {
    renderComponent({ size: 'extra-small', startIcon: 'Action' });
    const component = await screen.findByTestId(TEST_ID);
    expect(component).toHaveClass('Text', 'sizeExtraSmall', 'TextIcon');

    const icon = await screen.findByTestId('icon-Action');
    expect(icon).toHaveAttribute('width', ICON_SIZES_REM.small);
  });

  it('icon size should have priority on size', async () => {
    renderComponent({
      size: 'extra-small',
      iconSize: 'xxLarge',
      startIcon: 'Action',
    });

    const component = await screen.findByTestId(TEST_ID);
    expect(component).toHaveClass('sizeExtraSmall');

    const icon = await screen.findByTestId('icon-Action');
    expect(icon).toHaveAttribute('width', ICON_SIZES_REM.xxLarge);
  });
});
