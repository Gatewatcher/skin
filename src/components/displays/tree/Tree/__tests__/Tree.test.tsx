import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { TreeProps } from '../index';
import Tree from '../index';

describe('Tree', () => {
  const renderComponent = ({ children, ...props }: Partial<TreeProps> = {}) => {
    const user = userEvent.setup();
    return {
      user,
      ...render(<Tree {...props}>{children}</Tree>),
    };
  };

  it('should render collapsed', async () => {
    renderComponent({
      children: (
        <Tree.Node element="root" id={0}>
          <Tree.Node data-testid="child 1" element="child 1" id={1} />
        </Tree.Node>
      ),
    });

    await expectNotToBeVisibleInTheDocument('child 1');
  });

  it('should render expanded', async () => {
    renderComponent({
      children: (
        <Tree.Node element="root" id={0} defaultExpanded>
          <Tree.Node data-testid="child 1" element="child 1" id={1} />
        </Tree.Node>
      ),
    });

    await expectToBeVisibleInTheDocument('child 1');
  });

  it('should expand on click', async () => {
    const { user } = renderComponent({
      children: (
        <Tree.Node data-testid="root" element="root" id={0}>
          <Tree.Node data-testid="child 1" element="child 1" id={1} />
        </Tree.Node>
      ),
    });

    await user.click(screen.getByTestId('root'));

    await expectToBeVisibleInTheDocument('child 1');
  });

  it('should collapse on click', async () => {
    const { user } = renderComponent({
      children: (
        <Tree.Node data-testid="root" element="root" id={0} defaultExpanded>
          <Tree.Node data-testid="child 1" element="child 1" id={1} />
        </Tree.Node>
      ),
    });

    await user.click(screen.getByTestId('root'));

    await expectNotToBeVisibleInTheDocument('child 1');
  });
});
