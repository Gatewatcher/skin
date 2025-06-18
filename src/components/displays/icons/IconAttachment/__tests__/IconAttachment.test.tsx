import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { IconAttachmentProps } from '..';
import IconAttachment from '..';

describe('IconAttachment', () => {
  const TEST_ID: TestId = 'CHANGE_THIS';

  const renderComponent = ({
    extension = 'pdf',
    ...props
  }: Partial<IconAttachmentProps> = {}) =>
    render(
      <IconAttachment data-testid={TEST_ID} extension={extension} {...props} />,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });
});
