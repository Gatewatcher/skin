import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NavigationItem } from '@/skin/navigation';
import { renderWithRouter } from '@/tests';

import type { NotificationProps } from '..';
import Notification from '..';

describe('Notification', () => {
  const TEST_ID: TestId = 'notification';
  const defaultContent = 'content';
  const defaultTitle = 'title';

  const renderComponent = ({
    content,
    title,
    ...props
  }: Partial<NotificationProps> = {}) =>
    renderWithRouter(
      <Notification
        content={content || defaultContent}
        data-testid={TEST_ID}
        title={title || defaultTitle}
        {...props}
      />,
    );

  const user = userEvent.setup();

  const getNotification = () => screen.getByTestId(TEST_ID);

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render header', async () => {
    renderComponent();
    expect(getNotification().firstElementChild?.tagName).toBe('HEADER');
  });

  it('should render title', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(defaultTitle, screen.findByText);
  });

  it('should render close button', async () => {
    renderComponent({ onClose: vi.fn() });
    await expectToBeVisibleInTheDocument('button-close');
  });

  it('should call close method', async () => {
    const onClose = vi.fn();
    renderComponent({ onClose });

    const btn = screen.getByTestId('button-close');
    await user.click(btn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should render content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(defaultContent, screen.findByText);
  });

  it('should render a relative date', async () => {
    const date = new Date('2023-09-10T10:00:00Z').toISOString();
    vi.useFakeTimers({ now: new Date('2023-09-20T13:10:08Z').getTime() });
    renderComponent({ date, dateMode: 'relative', dateFormat: 'L LT' });
    await expectToBeVisibleInTheDocument('10 days ago', screen.findByText);
  });

  it('should render an absolute date', async () => {
    const date = '10/12/2023 10:00';
    renderComponent({ date, dateMode: 'absolute', dateFormat: 'L LT' });
    await expectToBeVisibleInTheDocument('12/10/2023 10:00', screen.findByText);
  });

  it('should render footer', async () => {
    renderComponent({ type: 'critical' });
    expect(getNotification().lastElementChild?.tagName).toBe('FOOTER');
  });

  it('should render type', async () => {
    renderComponent({ type: 'critical' });
    await expectToBeVisibleInTheDocument('chip');
  });

  it('should render link', async () => {
    renderComponent({
      link: <NavigationItem.Link to="/">Details</NavigationItem.Link>,
    });
    await expectToBeVisibleInTheDocument('navigation-item-link-nav');
  });
});
