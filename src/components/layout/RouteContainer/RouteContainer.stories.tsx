import { faker } from '@faker-js/faker';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { Button, LinkInternal } from '@/skin/actions';
import { Badge } from '@/skin/displays';
import Tabs from '@/skin/displays/Tabs';
import Breadcrumb from '@/skin/feedback/Breadcrumb';
import { Form, Input, SearchBar, useForm } from '@/skin/forms';
import { Paragraph, Title } from '@/skin/typography';

import type { RouteContainerProps } from '.';
import RouteContainer from '.';

faker.seed(10);

type Story = StoryObj<typeof RouteContainer>;

export default {
  title: 'layout/RouteContainer',
  component: RouteContainer,
  decorators: [withRouter],
} as Meta<typeof RouteContainer>;

const Template: StoryFn<typeof RouteContainer> = (
  args: RouteContainerProps,
) => <RouteContainer {...args}>{args.children}</RouteContainer>;

export const Default: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header title="Default title" />
        <RouteContainer.Body>Default content</RouteContainer.Body>
      </>
    ),
  },
};

export const WithBadge: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          badge={<Badge type="low">789</Badge>}
          title="Badge"
        />
        <RouteContainer.Body>Content</RouteContainer.Body>
      </>
    ),
  },
};

export const WithSubtitle: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header subtitle="Subtitle" title="Title" />
        <RouteContainer.Body>Content</RouteContainer.Body>
      </>
    ),
  },
};

export const WithBreadcrumb: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          breadcrumb={
            <Breadcrumb>
              <LinkInternal to="link1">Link 1</LinkInternal>
              <LinkInternal to="link2">Link 2</LinkInternal>
              <LinkInternal to="link3">Link 3</LinkInternal>
              <LinkInternal to="link4">Link 4</LinkInternal>
            </Breadcrumb>
          }
          title="Title"
        />
        <RouteContainer.Body>Content</RouteContainer.Body>
      </>
    ),
  },
};

export const WithAction: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          actions={
            <>
              <SearchBar withGrow />
              <Button variant="outlined">Click</Button>
              <Button>Click</Button>
            </>
          }
          title="Title"
        />
        <RouteContainer.Body>Content</RouteContainer.Body>
      </>
    ),
  },
};

export const SubtitleWithAction: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          actions={
            <>
              <Button variant="outlined">Click</Button>
              <Button>Click</Button>
            </>
          }
          subtitle="Subtitle"
          title="Title"
        />
        <RouteContainer.Body>Content</RouteContainer.Body>
      </>
    ),
  },
};

export const All: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          actions={
            <>
              <SearchBar withGrow />
              <Button variant="outlined">Click</Button>
              <Button>Click</Button>
            </>
          }
          breadcrumb={
            <Breadcrumb>
              <LinkInternal to="link1">Link 1</LinkInternal>
              <LinkInternal to="link2">Link 2</LinkInternal>
              <LinkInternal to="link3">Link 3</LinkInternal>
              <LinkInternal to="link4">Link 4</LinkInternal>
            </Breadcrumb>
          }
          badge={<Badge type="low">789</Badge>}
          subtitle="Subtitle"
          title="Title"
        />
        <RouteContainer.Body>Content</RouteContainer.Body>
      </>
    ),
  },
};

export const AllWithStickyHeader: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          actions={
            <>
              <SearchBar />
              <Button variant="outlined">Click</Button>
              <Button>Click</Button>
            </>
          }
          breadcrumb={
            <Breadcrumb>
              <LinkInternal to="link1">Link 1</LinkInternal>
              <LinkInternal to="link2">Link 2</LinkInternal>
              <LinkInternal to="link3">Link 3</LinkInternal>
              <LinkInternal to="link4">Link 4</LinkInternal>
            </Breadcrumb>
          }
          badge={<Badge type="low">789</Badge>}
          subtitle="Subtitle"
          title="Title"
          isSticky
        />
        <RouteContainer.Body>
          <Paragraph>{faker.lorem.paragraphs(25)}</Paragraph>
        </RouteContainer.Body>
      </>
    ),
  },
};

export const AllWithTabs: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          actions={
            <>
              <SearchBar withGrow />
              <Button variant="outlined">Click</Button>
              <Button>Click</Button>
            </>
          }
          breadcrumb={
            <Breadcrumb>
              <LinkInternal to="link1">Link 1</LinkInternal>
              <LinkInternal to="link2">Link 2</LinkInternal>
              <LinkInternal to="link3">Link 3</LinkInternal>
              <LinkInternal to="link4">Link 4</LinkInternal>
            </Breadcrumb>
          }
          navigation={
            <Tabs.TitleList>
              <Tabs.Title icon="Tower">Tab 1</Tabs.Title>
              <Tabs.Title icon="FileDownload">Tab 2</Tabs.Title>
            </Tabs.TitleList>
          }
          badge={<Badge type="low">789</Badge>}
          subtitle="Subtitle"
          title="Title"
        />
        <RouteContainer.Body>
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
        </RouteContainer.Body>
      </>
    ),
  },
  decorators: [
    Story => (
      <Tabs>
        <Story />
      </Tabs>
    ),
  ],
};

export const WithTabsWithoutSubtitle: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          actions={
            <>
              <SearchBar withGrow />
              <Button variant="outlined">Click</Button>
              <Button>Click</Button>
            </>
          }
          breadcrumb={
            <Breadcrumb>
              <LinkInternal to="link1">Link 1</LinkInternal>
              <LinkInternal to="link2">Link 2</LinkInternal>
              <LinkInternal to="link3">Link 3</LinkInternal>
              <LinkInternal to="link4">Link 4</LinkInternal>
            </Breadcrumb>
          }
          navigation={
            <Tabs.TitleList>
              <Tabs.Title icon="Tower">Tab 1</Tabs.Title>
              <Tabs.Title icon="FileDownload">Tab 2</Tabs.Title>
            </Tabs.TitleList>
          }
          badge={<Badge type="low">789</Badge>}
          title="Title"
        />
        <RouteContainer.Body>
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
        </RouteContainer.Body>
      </>
    ),
  },
  decorators: [
    Story => (
      <Tabs>
        <Story />
      </Tabs>
    ),
  ],
};

const Content1 = () => {
  const [form] = useForm();

  return (
    <Form initialValues={{ username: 'johndoe' }}>
      <RouteContainer.Subheader
        actions={<Form.Actions form={form} />}
        title="Content 2"
      />

      <RouteContainer.Body>
        <Form.Field name="username">
          <Input.Text />
        </Form.Field>
      </RouteContainer.Body>
    </Form>
  );
};

export const WithSubheader: Story = {
  render: Template,
  args: {
    children: (
      <>
        <RouteContainer.Header
          navigation={
            <Tabs.TitleList>
              <Tabs.Title icon="Tower">Tab 1</Tabs.Title>
              <Tabs.Title icon="FileDownload">Tab 2</Tabs.Title>
            </Tabs.TitleList>
          }
          title="Main title"
          withMarginBottom={false}
        />

        <Tabs.PanelList>
          <Tabs.Panel>
            <Content1 />
          </Tabs.Panel>
          <Tabs.Panel>
            <>
              <RouteContainer.Subheader
                badge={<Badge type="info">badge</Badge>}
                title="Content 1"
              />

              <RouteContainer.Body>
                <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
              </RouteContainer.Body>
            </>
          </Tabs.Panel>
        </Tabs.PanelList>
      </>
    ),
  },
  decorators: [
    Story => (
      <Tabs>
        <Story />
      </Tabs>
    ),
  ],
};
