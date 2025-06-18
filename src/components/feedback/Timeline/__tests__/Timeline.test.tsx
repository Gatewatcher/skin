import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render } from '@testing-library/react';

import Timeline from '..';

describe('Timeline', () => {
  const TEST_ID: TestId = 'timeline';

  const renderComponent = () =>
    render(
      <Timeline data-testid={TEST_ID}>
        <Timeline.Item icon="Action">
          <Timeline.Title>title</Timeline.Title>
          <Timeline.Body>body</Timeline.Body>
          <Timeline.Date date={1695387600000} />
        </Timeline.Item>
      </Timeline>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('timeline');
    await expectToBeVisibleInTheDocument('timeline-date');
    await expectToBeVisibleInTheDocument('timeline-item');
    await expectToBeVisibleInTheDocument('timeline-title');
    await expectToBeVisibleInTheDocument('timeline-body');
  });
});
