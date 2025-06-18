import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { withRouter } from 'storybook-addon-react-router-v6';

import { Stack } from '@/skin/layout';
import { Paragraph, Title } from '@/skin/typography';

import type { TabsProps } from '.';
import Tabs from '.';
import { DEFAULT_TAB } from './constants';

faker.seed(42);

type Story = StoryObj<typeof Tabs>;

export default {
  title: 'displays/Tabs',
  component: Tabs,
  args: {
    defaultTab: DEFAULT_TAB,
    children: (
      <>
        <Tabs.TitleList>
          <Tabs.Title icon="Tower">Tab 1</Tabs.Title>
          <Tabs.Title icon="FileDownload">Tab 2</Tabs.Title>
        </Tabs.TitleList>
        <Tabs.PanelList>
          <Tabs.Panel>
            <>
              <Title>Content 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 3</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
        </Tabs.PanelList>
      </>
    ),
    onTabChange: id => {
      console.log(`tab change ${id}`);
    },
  },
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = ({ children, ...args }: TabsProps) => (
  <Tabs {...args}>{children}</Tabs>
);

export const Default: Story = {
  render: Template,
  decorators: [withRouter],
};

export const Controlled: Story = {
  render: Template,
  args: { currentTab: 0 },
};

export const Secondary: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Tabs.TitleList variant="secondary">
          <Tabs.Title>Tab 1</Tabs.Title>
          <Tabs.Title>Tab 2</Tabs.Title>
        </Tabs.TitleList>
        <Tabs.PanelList>
          <Tabs.Panel>
            <>
              <Title>Content 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 3</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
        </Tabs.PanelList>
      </>
    ),
  },
};

export const WithDefaultTab: Story = {
  render: Template,
  args: {
    defaultTab: 1,
  },
  decorators: [withRouter],
};

export const WithChildrenBetween: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Tabs.TitleList>
          <Tabs.Title icon="Tower">Tab 1</Tabs.Title>
          <Tabs.Title icon="FileDownload">Tab 2</Tabs.Title>
        </Tabs.TitleList>

        <Stack justifyContent="center" margin={{ y: 10 }}>
          <Paragraph>Some content between titles and panels</Paragraph>
        </Stack>

        <Tabs.PanelList>
          <Tabs.Panel>
            <>
              <Title>Content 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
        </Tabs.PanelList>
      </>
    ),
  },
  decorators: [withRouter],
};

export const WithTabDisabled: Story = {
  render: Template,

  args: {
    children: (
      <>
        <Tabs.TitleList>
          <Tabs.Title icon="Tower">Lien 1</Tabs.Title>
          <Tabs.Title icon="FileDownload" disabled>
            Lien 2
          </Tabs.Title>
        </Tabs.TitleList>

        <Tabs.PanelList>
          <Tabs.Panel>
            <>
              <Title>Content 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
        </Tabs.PanelList>
      </>
    ),
  },
  decorators: [withRouter],
};

export const WithRouter: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Tabs.TitleList>
          <Tabs.Title icon="Tower" to="/users">
            Lien 1
          </Tabs.Title>
          <Tabs.Title icon="FileDownload" to="/admin">
            Lien 2
          </Tabs.Title>
        </Tabs.TitleList>

        <Tabs.Outlet />
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
                <>
                  <Title>Users</Title>
                  <div>{faker.lorem.paragraphs(5)}</div>
                </>
              }
              path="/users"
            />
            <Route
              element={
                <>
                  <Title>Admin</Title>
                  <div>{faker.lorem.paragraphs(5)}</div>
                </>
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

export const SecondaryFull: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Tabs.TitleList variant="secondary" full>
          <Tabs.Title icon="Tower">Tab 1</Tabs.Title>
          <Tabs.Title icon="FileDownload">Tab 2</Tabs.Title>
        </Tabs.TitleList>
        <Tabs.PanelList>
          <Tabs.Panel>
            <>
              <Title>Content 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 3</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
        </Tabs.PanelList>
      </>
    ),
  },
};

export const Main: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Tabs.TitleList variant="main" full>
          <Tabs.Title icon="DocumentAdd">Details</Tabs.Title>
          <Tabs.Title icon="Action">Alerts</Tabs.Title>
          <Tabs.Title icon="Attachment">Course of action</Tabs.Title>
          <Tabs.Title icon="CsAddIncident">Similar incidents</Tabs.Title>
          <Tabs.Title icon="CsAddUser">Related cases</Tabs.Title>
          <Tabs.Title icon="Comment">Comments</Tabs.Title>
        </Tabs.TitleList>
        <Tabs.PanelList>
          <Tabs.Panel>
            <>
              <Title>Content 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 3</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 4</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 5</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 6</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
        </Tabs.PanelList>
      </>
    ),
  },
};

export const Pills: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Tabs.TitleList variant="pills">
          <Tabs.Title>Tab 1</Tabs.Title>
          <Tabs.Title>Tab 2</Tabs.Title>
        </Tabs.TitleList>
        <Tabs.PanelList>
          <Tabs.Panel>
            <>
              <Title>Content 1</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <Title>Content 2</Title>
              <Paragraph>{faker.lorem.paragraphs(5)}</Paragraph>
            </>
          </Tabs.Panel>
        </Tabs.PanelList>
      </>
    ),
  },
};
