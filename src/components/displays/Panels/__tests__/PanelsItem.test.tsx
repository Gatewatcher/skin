import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import Panels from '..';
import type { PanelsItemProps } from '../compounds/PanelsItem';

describe('PanelsItem', () => {
  const TEST_ID: TestId = 'panels-item';

  const renderComponent = ({ ...props }: Partial<PanelsItemProps> = {}) =>
    render(
      <Panels.Group direction="horizontal">
        <Panels.Item data-testid={TEST_ID} {...props}>
          Test
        </Panels.Item>
      </Panels.Group>,
    );

  it('should have correct attr and size', () => {
    renderComponent();
    const panelsItem = screen.getByTestId(TEST_ID);

    expect(panelsItem).toHaveAttribute('data-panel-collapsible', 'false');
    expect(panelsItem).toHaveAttribute('data-panel-size', '100.0');
    expect(panelsItem).toHaveStyle({ flexGrow: '100' });
  });

  it('should update attr according to props', () => {
    renderComponent({ collapsible: true });
    const panelsItem = screen.getByTestId(TEST_ID);

    expect(panelsItem).toHaveAttribute('data-panel-collapsible', 'true');
  });

  it('should throw an error with invalid minSize', () => {
    expect(() => renderComponent({ minSize: -1 })).toThrowError(
      'Panel minSize must be between 0 and 100, but was -1',
    );
  });

  it('should throw an error with invalid maxSize', () => {
    expect(() => renderComponent({ maxSize: 101 })).toThrowError(
      'Panel maxSize must be between 0 and 100, but was 101',
    );
  });
});
