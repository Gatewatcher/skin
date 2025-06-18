import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Ref } from 'react';

import { mockURLmethods } from '@/tests';

import type { FileImageProps } from '..';
import InputFileImage from '..';

const file = new File(['(⌐□_□)'], 'chuckNorris.png', { type: 'image/png' });

describe('InputFileImage', () => {
  const TEST_ID: TestId = 'input-file-image';

  const findInput = () =>
    screen.findByTestId<HTMLInputElement>(suffixTestId(TEST_ID, 'input'));

  const user = userEvent.setup();

  const renderComponent = ({
    label = '',
    onChange = () => {},
    ...props
  }: Partial<FileImageProps & { ref: Ref<HTMLInputElement> }> = {}) =>
    render(
      <InputFileImage
        data-testid={TEST_ID}
        label={label}
        onChange={onChange}
        {...props}
      />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render empty preview', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(suffixTestId(TEST_ID, 'button'));
    await expectToBeVisibleInTheDocument('icon-Image');
  });

  it('should render default preview', async () => {
    renderComponent({
      defaultUrl: 'https://example.com',
      defaultName: file.name,
    });

    await expectToBeVisibleInTheDocument(
      suffixTestId(TEST_ID, 'preview-image-trigger'),
    );
  });

  it('should render preview image', async () => {
    mockURLmethods();
    renderComponent();
    const input = await findInput();

    await user.upload(input, file);

    await expectToBeVisibleInTheDocument(
      suffixTestId(TEST_ID, 'preview-image-trigger'),
    );
  });

  it('should call onRemove', async () => {
    mockURLmethods();

    const onRemove = vi.fn();
    renderComponent({ onRemove });
    const input = await findInput();

    await user.upload(input, file);
    const removeButton = await screen.findByTestId('icon-Close');
    await user.click(removeButton);

    expect(onRemove).toHaveBeenCalled();

    await expectNotToBeVisibleInTheDocument(
      suffixTestId(TEST_ID, 'preview-image-trigger'),
    );
  });
});
