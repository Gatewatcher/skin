import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { UploadProps } from '..';
import Upload from '..';

describe('Upload', () => {
  const TEST_ID: TestId = 'CHANGE_THIS';

  const renderComponent = ({ ...props }: Partial<UploadProps> = {}) =>
    render(<Upload data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
  });
});
