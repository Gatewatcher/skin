import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PopoverProps } from '..';
import Popover from '..';

describe('Popover', () => {
  const user = userEvent.setup();

  const renderComponent = ({
    content = 'content',
    ...props
  }: Partial<PopoverProps> = {}) =>
    render(
      <Popover content={content} {...props}>
        <>Trigger</>
      </Popover>,
    );

  const getTrigger = async () => await screen.findByTestId('floating-trigger');
  const getContent = async () => await screen.findByTestId('floating-content');

  it('should open popover on hover', async () => {
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

  it('should render in compounds', async () => {
    renderComponent({
      content: (
        <>
          <Popover.Header data-testid="header">
            <Popover.Title data-testid="title">title</Popover.Title>
          </Popover.Header>
          <Popover.Body data-testid="body">body</Popover.Body>
        </>
      ),
    });

    await user.hover(await getTrigger());
    await waitFor(async () => {
      await expectToBeVisibleInTheDocument('header');
      await expectToBeVisibleInTheDocument('title');
      await expectToBeVisibleInTheDocument('title', screen.findByText);
      await expectToBeVisibleInTheDocument('body');
      await expectToBeVisibleInTheDocument('body', screen.findByText);
    });
  });
});
