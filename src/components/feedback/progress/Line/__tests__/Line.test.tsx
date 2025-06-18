import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import type { LineProps } from '..';
import { Line } from '..';

describe('Line', () => {
  const renderComponent = ({
    percentage = 50,
    type = 'linear',
    ...args
  }: Partial<LineProps> = {}) =>
    render(<Line percentage={percentage} type={type} {...args} />);

  describe('Linear', () => {
    it('should render', async () => {
      renderComponent();
      await expectToBeVisibleInTheDocument('progress-linear-line');
    });

    it('should have status', async () => {
      renderComponent({ status: 'error' });
      const container = await screen.findByTestId('progress-linear-line');
      const component = await container.firstElementChild;
      expect(component).toHaveClass('progressLinearError');
    });

    it('should be infinite', async () => {
      renderComponent({ isInfinite: true, status: 'uploading' });
      const component = await screen.findByTestId('progress');
      expect(component).toHaveClass('progressLinearInfinite');
      expect(component).not.toHaveClass('progressLinearError');
      expect(component).not.toHaveStyle({ width: '50%' });
    });

    it('should have progress percent', async () => {
      renderComponent({ percentage: 30 });
      const component = await screen.findByTestId('progress');
      expect(component).toHaveStyle({ width: '30%' });
    });

    it('should render className', async () => {
      renderComponent({ className: 'test' });
      const component = await screen.findByTestId('progress-linear-line');
      expect(component).toHaveClass('test');
    });
  });

  describe('Circular', () => {
    it('should render', async () => {
      renderComponent({ type: 'circular' });
      await expectToBeVisibleInTheDocument('progress-circular-line');
    });

    it('should render className', async () => {
      renderComponent({ className: 'test', type: 'circular' });
      const component = await screen.findByTestId('progress-circular-line');
      expect(component).toHaveClass('test');
    });

    it('should not render progress if percentage is 0', async () => {
      renderComponent({ type: 'circular', percentage: 0 });
      await expectNotToBeVisibleInTheDocument('progress');
    });

    it('should have status', async () => {
      renderComponent({ type: 'circular', status: 'error' });
      const component = await screen.findByTestId('progress');
      expect(component).toHaveClass('progressCircularError');
    });

    it('should have good progress', async () => {
      renderComponent({ type: 'circular', percentage: 50 });
      const component = await screen.findByTestId('progress');
      expect(component).toHaveAttribute('stroke-dashoffset', '50');
    });

    it('should be infinite', async () => {
      renderComponent({ type: 'circular', isInfinite: true });
      await expectToBeVisibleInTheDocument('gradient');
      const progress = await screen.findByTestId('progress');
      expect(progress).not.toHaveAttribute('stroke-dashoffset');
    });
  });
});
