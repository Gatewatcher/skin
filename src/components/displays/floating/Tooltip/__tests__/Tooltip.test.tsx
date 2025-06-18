import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { TooltipProps } from '..';
import Tooltip from '..';

describe('Tooltip', () => {
  const user = userEvent.setup();

  const renderComponent = ({ ...props }: Partial<TooltipProps> = {}) =>
    render(
      <Tooltip content="content" {...props}>
        <>Trigger</>
      </Tooltip>,
    );

  const getTrigger = async () => await screen.findByTestId('floating-trigger');
  const getContent = async () => await screen.findByTestId('floating-content');

  it('should open tooltip on hover', async () => {
    renderComponent();
    await user.hover(await getTrigger());

    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('floating-content');
    });
  });

  it('should have size', async () => {
    renderComponent({ size: 'large' });
    await user.hover(await getTrigger());
    expect(await getContent()).toHaveClass('sizeLarge');
  });

  it('should wrap element in text if content is children', async () => {
    renderComponent({ content: 'element' });
    await user.hover(await getTrigger());

    const content = await screen.findByText('element');
    expect(content.tagName).toBe('SPAN');
    expect(content).toHaveClass('Text');
  });
});
