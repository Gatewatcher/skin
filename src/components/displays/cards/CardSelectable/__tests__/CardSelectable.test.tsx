import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { CardSelectableProps } from '..';
import CardSelectable from '..';

describe('Card', () => {
  const TEST_ID: TestId = 'card';
  const body = 'some content';

  const renderComponent = ({
    children,
    ...props
  }: Partial<CardSelectableProps> = {}) =>
    render(
      <CardSelectable data-testid={TEST_ID} {...props}>
        {children || (
          <>
            <CardSelectable.Header>
              <CardSelectable.Title>Card title</CardSelectable.Title>
              <CardSelectable.InputRadio />
            </CardSelectable.Header>
            <CardSelectable.Body>{body}</CardSelectable.Body>
          </>
        )}
      </CardSelectable>,
    );

  const findCard = async () => await screen.findByTestId(TEST_ID);

  it('should render card', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should be selected', async () => {
    renderComponent({ selected: true });
    const card = await findCard();

    expect(card).toHaveClass('selected');
  });

  it('should be disabled', async () => {
    renderComponent({ disabled: true });
    const card = await findCard();

    expect(card).toHaveClass('disabled');
  });
});
