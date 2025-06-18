import { faker } from '@faker-js/faker';
import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { OverflownParagraphProps } from '..';
import OverflownParagraph from '..';

faker.seed(10);

describe('OverflownParagraph', () => {
  const TEST_ID: TestId = 'overflown-paragraph';

  const renderComponent = ({
    children = faker.lorem.paragraphs(10),
    ...props
  }: Partial<OverflownParagraphProps> = {}) =>
    render(
      <OverflownParagraph data-testid={TEST_ID} {...props}>
        {children}
      </OverflownParagraph>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have overflow wrap', async () => {
    renderComponent({ overflowWrap: 'anywhere' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('overflowWrapAnywhere');
  });

  it('should have word break', async () => {
    renderComponent({ wordBreak: 'break-all' });
    const element = await screen.findByTestId(TEST_ID);
    expect(element).toHaveClass('wordBreakBreakAll');
  });
});
