import { render, screen } from '@testing-library/react';

import Panels from '..';

describe('PanelsItem', () => {
  const renderComponent = () =>
    render(
      <Panels.Group direction="horizontal">
        <Panels.Item collapsible={true} data-testid="left" order={1}>
          Test
        </Panels.Item>
        <Panels.ResizeHandle id="left-handle" />
        <Panels.Item data-testid="middle" defaultSize={60} order={2}>
          Test
        </Panels.Item>
        <Panels.ResizeHandle id="right-handle" />
        <Panels.Item
          collapsible={true}
          data-testid="right"
          defaultSize={20}
          order={3}
        >
          Test
        </Panels.Item>
      </Panels.Group>,
    );

  it('should init correctly', () => {
    renderComponent();
    const leftItem = screen.getByTestId('left');
    expect(leftItem).toHaveAttribute('data-panel-size', '20.0');

    const middleItem = screen.getByTestId('middle');
    expect(middleItem).toHaveAttribute('data-panel-size', '60.0');

    const rightItem = screen.getByTestId('right');
    expect(rightItem).toHaveAttribute('data-panel-size', '20.0');
  });
});
