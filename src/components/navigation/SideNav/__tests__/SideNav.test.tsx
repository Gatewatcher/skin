import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '@/tests';

import type { SideNavProps } from '..';
import SideNav from '..';
import { SIDENAV_IS_OPENED_STORAGE_KEY } from '../constants';

describe('SideNav', () => {
  const TEST_ID: TestId = 'side-nav';
  beforeEach(() => {
    localStorage.removeItem(SIDENAV_IS_OPENED_STORAGE_KEY);
  });

  const renderComponent = ({
    children,
    ...props
  }: Partial<SideNavProps> = {}) => {
    const link1 = '/link1';
    const link2 = '/link2';
    const defaultLink = '/';

    return renderWithRouter(
      <SideNav data-testid={TEST_ID} {...props}>
        {children || (
          <>
            <SideNav.Link data-testid="side-nav-link" icon="Add" to={link1}>
              {link1}
            </SideNav.Link>
            <SideNav.Link data-testid="side-nav-link" icon="Add" to={link2}>
              {link2}
            </SideNav.Link>
            <SideNav.Link
              data-testid="side-nav-link-active"
              icon="Add"
              to={defaultLink}
            >
              {defaultLink}
            </SideNav.Link>
          </>
        )}
      </SideNav>,
    );
  };

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render closed', async () => {
    renderComponent();
    expect(await screen.findByTestId(TEST_ID)).not.toHaveClass('SideNavOpened');
  });

  it('should have a toggle button', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('button-toggle-nav');
  });

  it('should open on toggle button click', async () => {
    renderComponent();
    (await screen.findByTestId('button-toggle-nav')).click();
    expect(await screen.findByTestId(TEST_ID)).toHaveClass('SideNavOpened');
  });

  it('should have link', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('/link1', screen.findByText);
  });

  it('should have active link', async () => {
    renderComponent();
    expect(await screen.findByTestId('side-nav-link-active')).toHaveClass(
      'LinkNavActive',
    );
  });

  it('should be external link', async () => {
    const google = 'https://www.google.com';

    renderComponent({
      children: (
        <>
          <SideNav.Link
            data-testid="side-nav-link"
            icon="Add"
            to={google}
            isExternal
          >
            google
          </SideNav.Link>
        </>
      ),
    });

    expect(await screen.findByTestId('side-nav-link')).toHaveAttribute(
      'href',
      google,
    );
  });

  it('links text should not be visible when sidenav closed', async () => {
    renderComponent();
    expect(await screen.findByText('/link1')).toHaveClass('LinkTextClosed');
  });

  it('links text should be visible when sidenav opened', async () => {
    renderComponent();
    (await screen.findByTestId('button-toggle-nav')).click();
    expect(await screen.findByText('/link1')).not.toHaveClass('LinkTextClosed');
  });

  it('should render footer', async () => {
    renderComponent({
      footer: <SideNav.Footer data-testid="footer">footer</SideNav.Footer>,
    });
    await expectToBeVisibleInTheDocument('footer');
    await expectToBeVisibleInTheDocument('footer', screen.findByText);
  });
});
