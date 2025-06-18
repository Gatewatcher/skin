import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import type { UploaderProps } from '..';
import Uploader from '..';

describe('Uploader', () => {
  const TEST_ID: TestId = 'input-uploader';

  const renderComponent = ({ ...props }: Partial<UploaderProps> = {}) =>
    render(<Uploader data-testid={TEST_ID} {...props} />);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('input-uploader');
  });
});
