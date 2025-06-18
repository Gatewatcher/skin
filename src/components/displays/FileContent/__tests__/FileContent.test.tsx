import { faker } from '@faker-js/faker';
import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';

import type { FileContentProps } from '..';
import FileContent from '..';

const FILE = new File([faker.lorem.paragraphs(100)], 'filename.txt');

describe('FileContent', () => {
  const TEST_ID: TestId = 'CHANGE_THIS';

  const renderComponent = ({ ...props }: Partial<FileContentProps> = {}) =>
    render(<FileContent data-testid={TEST_ID} file={FILE} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render loader', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('circular-loader');
  });

  it('should render file content', async () => {
    renderComponent({ file: new File(['content'], 'content') });
    await expectToBeVisibleInTheDocument('content', screen.findByText);
  });

  it('should render no data placeholder', async () => {
    renderComponent({ file: undefined });
    await expectToBeVisibleInTheDocument('placeholder');
  });

  it('should render custom no data placeholder', async () => {
    renderComponent({
      file: undefined,
      noDataPlaceholder: <div data-testid="no-data">no data</div>,
    });
    await expectToBeVisibleInTheDocument('no-data');
    await expectToBeVisibleInTheDocument('no data', screen.findByText);
  });

  it('should render error', async () => {
    renderComponent({ file: 'error' as unknown as File });
    await expectToBeVisibleInTheDocument('placeholder');
    await expectToBeVisibleInTheDocument('Unexpected error', screen.findByText);
  });

  it('should render custom error', async () => {
    renderComponent({
      file: 'error' as unknown as File,
      errorPlaceholder: <div data-testid="error">error</div>,
    });
    await expectToBeVisibleInTheDocument('error');
    await expectToBeVisibleInTheDocument('error', screen.findByText);
  });

  it('should render filename from file', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('filename.txt', screen.findByText);
  });

  it('should render custom filename', async () => {
    renderComponent({ name: 'my-file' });
    await expectToBeVisibleInTheDocument('my-file', screen.findByText);
  });
});
