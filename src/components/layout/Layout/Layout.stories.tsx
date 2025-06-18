import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import { Button } from '@/skin/actions';
import { Section } from '@/skin/displays';
import { useDrawerContainer } from '@/skin/displays/Drawer/hooks/useDrawerContainer';
import { Form, Input, SearchBar } from '@/skin/forms';

import type { LayoutProps } from '.';
import Layout from '.';
import Grid from '../Grid';
import RouteContainer from '../RouteContainer';
import { LAYOUT_COLUMNS } from './constants';
import {
  FakeDrawer,
  FakeNavBar,
  FakeSection,
  FakeSideNav,
} from './examples/utils';

type Story = StoryObj<typeof Layout>;

const DrawerSetOffsetTopButton = ({ offset }: { offset: number }) => {
  const { setOffsetTop } = useDrawerContainer();

  const handleClick = () => {
    setOffsetTop(offset);
  };

  return <Button onClick={handleClick}>Set offset {offset}</Button>;
};

export default {
  title: 'layout/Layout',
  component: Layout,
  decorators: [withRouter],
} as Meta<typeof Layout>;

const Template: StoryFn<typeof Layout> = (args: LayoutProps) => (
  <Layout {...args}>
    <Grid colSpan={LAYOUT_COLUMNS} isItem>
      <Form>
        <RouteContainer>
          <RouteContainer.Header
            actions={
              <>
                <Form.Field name="search">
                  <SearchBar withGrow />
                </Form.Field>
                <Form.ButtonReset>Discard</Form.ButtonReset>
                <Form.ButtonSubmit>Submit</Form.ButtonSubmit>
                <DrawerSetOffsetTopButton offset={0} />
                <DrawerSetOffsetTopButton offset={50} />
              </>
            }
            title="Layout"
          />
          <RouteContainer.Body>
            <Grid gap={8} isContainer isItem>
              <Grid colSpan={LAYOUT_COLUMNS} isItem>
                <FakeSection />
              </Grid>
              <Grid colSpan={LAYOUT_COLUMNS} isItem>
                <Section>
                  <Section.Header>
                    <Section.Title>Title Section 1</Section.Title>
                  </Section.Header>
                  <Section.Body>
                    <Form.Field name="1">
                      <Input.Text label="Label 1" />
                    </Form.Field>
                  </Section.Body>
                </Section>
              </Grid>
              <Grid colSpan={LAYOUT_COLUMNS} isItem>
                <Section>
                  <Section.Header>
                    <Section.Title>Title Section 2</Section.Title>
                  </Section.Header>
                  <Section.Body>
                    <Form.Field name="2">
                      <Input.Text label="Label 2" />
                    </Form.Field>
                  </Section.Body>
                </Section>
              </Grid>
            </Grid>
          </RouteContainer.Body>
        </RouteContainer>
      </Form>
    </Grid>
  </Layout>
);

export const Default: Story = {
  render: Template,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          drawer: 'fakeDrawer',
        },
      },
    }),
  },
  args: {
    sideNav: <FakeSideNav />,
    topNav: <FakeNavBar />,
    drawer: <FakeDrawer />,
  },
};
