import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { withRouter } from 'storybook-addon-remix-react-router';

import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { Paragraph, Title } from '@/skin/typography';

import type { NavigatorProps } from '.';
import Navigator from '.';
import type { NavId } from './types';

faker.seed(42);

type Story = StoryObj<typeof Navigator>;

const getDefaultSideNav = (
  {
    withLongText,
    withFooter,
  }: { withLongText?: boolean; withFooter?: boolean } = {
    withLongText: false,
    withFooter: true,
  },
) => {
  return (
    <Navigator.SideNav
      title={
        withLongText
          ? 'Optional very very very very very very long title'
          : 'Optional title'
      }
    >
      <Navigator.SideNavBody>
        <Navigator.Section
          title={
            withLongText
              ? 'Section Title 1 loooooooooooooooooooooooooooooooooong'
              : 'Section Title 1'
          }
        >
          <Navigator.NavItem icon="3DCurve">
            {withLongText
              ? 'Item 1 loooooooooooooooooooooooooooooooooong'
              : 'Item 1'}
          </Navigator.NavItem>
          <Navigator.NavItem icon="Action">Item 2</Navigator.NavItem>
        </Navigator.Section>

        <Navigator.Section title="Section Title 2">
          <Navigator.NavItem icon="Add">Item 1</Navigator.NavItem>
          <Navigator.NavItem icon="Application">Item 2</Navigator.NavItem>
        </Navigator.Section>

        <Navigator.Section title="Section Title 3">
          <Navigator.NavItem icon="AddComment" disabled>
            Item 1
          </Navigator.NavItem>
          <Navigator.NavItem icon="Box">Item 2</Navigator.NavItem>
        </Navigator.Section>
      </Navigator.SideNavBody>

      {withFooter && (
        <Navigator.SideNavFooter>
          <Button fill>Actions</Button>
        </Navigator.SideNavFooter>
      )}
    </Navigator.SideNav>
  );
};

const getDefaultChildren = (
  {
    withLongText,
    withFooter,
  }: { withLongText?: boolean; withFooter?: boolean } = {
    withLongText: false,
    withFooter: true,
  },
) => {
  return (
    <>
      {getDefaultSideNav({ withLongText, withFooter })}

      <Navigator.PanelList>
        <Navigator.PanelGroup>
          <Navigator.Panel>
            <>
              <Title>Content 1 for group 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Navigator.Panel>
          <Navigator.Panel>
            <>
              <Title>Content 2 for group 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Navigator.Panel>
        </Navigator.PanelGroup>

        <Navigator.PanelGroup>
          <Navigator.Panel>
            <>
              <Title>Content 1 for group 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Navigator.Panel>
          <Navigator.Panel>
            <>
              <Title>Content 2 for group 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Navigator.Panel>
        </Navigator.PanelGroup>

        <Navigator.PanelGroup>
          <Navigator.Panel>
            <>
              <Title>Content 1 for group 3</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Navigator.Panel>
          <Navigator.Panel>
            <>
              <Title>Content 2 for group 3</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Navigator.Panel>
        </Navigator.PanelGroup>
      </Navigator.PanelList>
    </>
  );
};

export default {
  title: 'displays/Navigator',
  component: Navigator,
  args: {
    children: getDefaultChildren(),
    onNavItemChange: item => {
      console.log(`nav item change`, item);
    },
  },
} as Meta<typeof Navigator>;

const Template: StoryFn<typeof Navigator> = ({
  children,
  ...args
}: NavigatorProps) => <Navigator {...args}>{children}</Navigator>;

export const Default: Story = {
  render: Template,
  decorators: [withRouter],
};

export const WithLongSideNav: Story = {
  render: ({ ...args }) => {
    return (
      <div style={{ height: '300px' }}>
        <Navigator {...args} />
      </div>
    );
  },
};

export const WithLongText: Story = {
  render: Template,
  args: {
    children: getDefaultChildren({ withLongText: true }),
  },
};

export const WithDefaultActiveItem: Story = {
  render: Template,
  args: {
    defaultSection: 1,
    defaultNavItem: 1,
  },
};

export const Controlled: Story = {
  render: ({ ...args }) => {
    const [currentSection, setCurrentSection] = useState<NavId>(0);
    const [currentNavItem, setCurrentNavItem] = useState<NavId>(1);

    const onClick = (sectionId: NavId, navItemId: NavId) => {
      setCurrentSection(sectionId);
      setCurrentNavItem(navItemId);
    };

    const onNavItemChange = (item: { sectionId: NavId; navItemId: NavId }) => {
      setCurrentSection(item.sectionId);
      setCurrentNavItem(item.navItemId);
    };

    return (
      <Stack direction="column" gap={6}>
        <Title>Starts at First Group Second Item</Title>
        <Title>{`Group ${Number(currentSection) + 1} - Item ${
          Number(currentNavItem) + 1
        }`}</Title>
        <Stack gap={6}>
          <Button onClick={() => onClick(1, 0)}>Second Group First Item</Button>
          <Button onClick={() => onClick(1, 1)}>
            Second Group Second Item
          </Button>
          <Button onClick={() => onClick(2, 1)}>Third Group Second Item</Button>
        </Stack>
        <Navigator
          {...args}
          currentNavItem={currentNavItem}
          currentSection={currentSection}
          onNavItemChange={onNavItemChange}
        />
      </Stack>
    );
  },
};

export const Ungrouped: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Navigator.SideNav title="Ungrouped">
          <Navigator.SideNavBody>
            <Navigator.Section>
              <Navigator.NavItem>First Item</Navigator.NavItem>
              <Navigator.NavItem>Second Item</Navigator.NavItem>
              <Navigator.NavItem>Third Item</Navigator.NavItem>
              <Navigator.NavItem>Fourth Item</Navigator.NavItem>
            </Navigator.Section>
          </Navigator.SideNavBody>
        </Navigator.SideNav>

        <Navigator.PanelList>
          <Navigator.PanelGroup>
            <Navigator.Panel>
              <Title>First Panel Content</Title>
            </Navigator.Panel>
            <Navigator.Panel>
              <Title>Second Panel Content</Title>
            </Navigator.Panel>
            <Navigator.Panel>
              <Title>Third Panel Content</Title>
            </Navigator.Panel>
            <Navigator.Panel>
              <Title>Fourth Panel Content</Title>
            </Navigator.Panel>
          </Navigator.PanelGroup>
        </Navigator.PanelList>
      </>
    ),
  },
};

export const WithRouter: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Navigator.SideNav>
          <Navigator.SideNavBody>
            <Navigator.Section>
              <Navigator.NavItem icon="User" to="/users">
                Users
              </Navigator.NavItem>
              <Navigator.NavItem icon="Robot" to="/admin">
                Admin
              </Navigator.NavItem>
            </Navigator.Section>
          </Navigator.SideNavBody>
        </Navigator.SideNav>

        <Navigator.Outlet />
      </>
    ),
  },
  decorators: [
    Story => (
      <MemoryRouter initialEntries={['/users']}>
        <Routes>
          <Route element={<Story />} path="/">
            <Route
              element={
                <Stack direction="column">
                  <Title>Users</Title>
                  <div>{faker.lorem.paragraphs(5)}</div>
                </Stack>
              }
              path="/users"
            />
            <Route
              element={
                <Stack direction="column">
                  <Title>Admin</Title>
                  <div>{faker.lorem.paragraphs(5)}</div>
                </Stack>
              }
              path="/admin"
            />
          </Route>
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: { exclude: ['defaultTab'] },
  },
};
