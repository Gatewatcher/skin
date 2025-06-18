import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { PlaceholderProps } from '..';
import Placeholder from '..';

describe('Placeholder', () => {
  const TEST_ID: TestId = 'placeholder';

  const renderComponent = ({
    'data-testid': testId = TEST_ID,
    ...props
  }: Partial<PlaceholderProps> = {}) =>
    render(
      <Placeholder data-testid={testId} {...props}>
        <Placeholder.Illustration name="404Error" />
        <Placeholder.Title>title</Placeholder.Title>
        <Placeholder.Description>desc</Placeholder.Description>
        <Placeholder.Actions>actions</Placeholder.Actions>
      </Placeholder>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
    await expectToBeVisibleInTheDocument('placeholder-illustration');
    await expectToBeVisibleInTheDocument('placeholder-title');
    await expectToBeVisibleInTheDocument('placeholder-description');
    await expectToBeVisibleInTheDocument('placeholder-actions');
  });

  it('should have start alignment', async () => {
    renderComponent({
      aligment: 'start',
    });

    const placeholder = await screen.findByTestId(TEST_ID);
    expect(placeholder).toHaveStyle({ '--stack-align-items-xs': 'flex-start' });
  });
});
