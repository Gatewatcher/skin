import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';

import type { ItemContentProps } from '../ItemContent';
import ItemContent from '../ItemContent';

describe('ItemContent', () => {
  const renderComponent = ({ ...props }: Partial<ItemContentProps> = {}) =>
    render(<ItemContent {...props}>ItemContent content</ItemContent>);

  it('should render with content', async () => {
    renderComponent({
      startElement: <span />,
    });

    await expectToBeVisibleInTheDocument(
      'ItemContent content',
      screen.findByText,
    );
  });

  it('should render with a start element only', async () => {
    renderComponent({
      startElement: <span />,
    });

    await expectNotToBeVisibleInTheDocument('end-element-container');
    await expectToBeVisibleInTheDocument('start-element-container');
  });

  it('should render with an end element only', async () => {
    renderComponent({
      endElement: <span />,
    });

    await expectNotToBeVisibleInTheDocument('start-element-container');
    await expectToBeVisibleInTheDocument('end-element-container');
  });

  it('should render with both start and end elements', async () => {
    renderComponent({
      startElement: <span />,
      endElement: <span />,
    });

    await expectToBeVisibleInTheDocument('start-element-container');
    await expectToBeVisibleInTheDocument('end-element-container');
  });
});
