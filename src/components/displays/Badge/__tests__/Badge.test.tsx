import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';

import { renderWithThemeProvider } from '@/tests';

import type { BadgeProps } from '..';
import Badge from '..';

describe('Badge', () => {
  const TEST_ID: TestId = 'badge';

  const renderComponent = ({
    children,
    icon,
    type = 'info',
    ...props
  }: Partial<BadgeProps> = {}) =>
    renderWithThemeProvider(
      icon ? (
        <Badge data-testid={TEST_ID} icon={icon} type={type} {...props} />
      ) : (
        <Badge data-testid={TEST_ID} type={type} {...props}>
          {children}
        </Badge>
      ),
    );
  const getBadge = async () => await screen.findByTestId(TEST_ID);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    const content = '1';
    renderComponent({ children: content });
    await expectToBeVisibleInTheDocument(content, screen.findByText);
  });

  it('should have default icon', async () => {
    renderComponent({ icon: true });
    const icon = await screen.findByRole('img');
    expect(icon).toBeVisible();
  });

  it('should have custom icon', async () => {
    renderComponent({ icon: 'Add' });
    const icon = await screen.findByRole('img');
    expect(icon).toBeVisible();
  });

  it('should have small size', async () => {
    renderComponent({ size: 'small' });
    expect(await getBadge()).toHaveClass('sizeSmall');
  });

  it('should wrap children in a Text', async () => {
    renderComponent({ children: 'Some text' });
    expect(screen.getByTestId('badge-text')).toHaveTextContent('Some text');
    expect(screen.getByTestId('badge-text')).toHaveClass('sizeRegular');
  });

  it('should wrap children in a Text - small', async () => {
    renderComponent({ children: 'Some text', size: 'small' });
    expect(screen.getByTestId('badge-text')).toHaveClass('sizeExtraSmall');
  });

  it('should have elevation', async () => {
    renderComponent({ elevation: 2 });
    expect(screen.getByTestId('badge')).toHaveClass('Elevation2');
  });

  it('should have loader', async () => {
    renderComponent({ isLoading: true });
    await expectToBeVisibleInTheDocument('...', screen.findByText);
  });

  it('should have custom loader', async () => {
    renderComponent({ isLoading: true, loader: 'load' });
    await expectToBeVisibleInTheDocument('load', screen.findByText);
  });
});
