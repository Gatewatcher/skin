import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';

import { Text } from '@/skin/typography';
import { buildTestIds } from '@/utils/testIds';

import type { DropzoneProps } from '..';
import Dropzone from '..';
import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';

describe('Dropzone', () => {
  const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);

  const renderComponent = ({ ...props }: Partial<DropzoneProps> = {}) =>
    render(<Dropzone data-testid={TEST_ID} {...props} />);

  const getInput = () => screen.findByTestId(TEST_ID);

  it('should render', async () => {
    renderComponent();
  });

  it('should render inner component if provided', async () => {
    const innerComponent = (
      <div data-testid={TEST_IDS.inner}>Inner Component</div>
    );
    render(<Dropzone innerComponent={innerComponent} />);
    await expectToBeVisibleInTheDocument(TEST_IDS.inner);
  });

  it('should render default inner component if not provided', async () => {
    render(<Dropzone />);
    await expectToBeVisibleInTheDocument(TEST_IDS.inner);
  });

  it('should have minHeight style', async () => {
    renderComponent({ styling: { minHeight: '400' } });
    const input = await getInput();

    expect(input).toHaveStyle({ minHeight: '400' });
  });

  it('should render start and end elements', async () => {
    renderComponent({
      innerOptions: {
        startElement: <Text data-testid="start">Start element</Text>,
        endElement: <Text data-testid="end">End element</Text>,
      },
    });

    await expectToBeVisibleInTheDocument('start');
    await expectToBeVisibleInTheDocument('start');

    await expectToBeVisibleInTheDocument('Start element', screen.findByText);
    await expectToBeVisibleInTheDocument('End element', screen.findByText);
  });
});
