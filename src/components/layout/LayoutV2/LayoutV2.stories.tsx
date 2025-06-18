import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps, ReactNode } from 'react';
import {
  reactRouterOutlets,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import { Button, LinkInternal } from '@/skin/actions';
import {
  type DrawerMatches,
  DrawerV2,
  Helper,
  Section,
  SidePanel,
  useCurrentDrawer,
  useDrawerV2,
  useSidePanel,
} from '@/skin/displays';
import { Form, Input, SearchBar } from '@/skin/forms';
import { Grid, RouteContainer, Stack } from '@/skin/layout';
import { LAYOUT_COLUMNS } from '@/skin/layout/LayoutV2/constants';
import { NavBar, NavigationItem, SideNav } from '@/skin/navigation';
import { ThemeSwitch } from '@/skin/navigation/Theme';
import { Paragraph } from '@/skin/typography';

import LayoutV2 from '.';

const meta = {
  title: 'layout/LayoutV2',
  component: LayoutV2,
  decorators: [
    withRouter,
    Story => (
      <div
        style={{
          resize: 'both',
          overflow: 'hidden',
          height: 1000,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LayoutV2>;

type Story = StoryObj<typeof meta>;

const SIDENAV_ROUTES: ComponentProps<typeof SideNav.Link>[] = [
  { icon: 'GridMenu', children: 'Home', to: '/' },
  { icon: 'Overview', children: 'Overview', to: '/overview' },
  { icon: 'Network', children: 'Relations', to: '/relations' },
  { icon: 'WarningAlt', children: 'Alerts', to: '/alerts' },
  { icon: 'Target', children: 'Hunting', to: '/hunting' },
  { icon: 'Network2', children: 'Assets', to: '/assets' },
  { icon: 'Scan', children: 'GScan', to: '/gscan' },
];

const routing = reactRouterOutlets([
  {
    path: '/',
    element: 'Home',
  },
  {
    path: '/keep',
    element: 'keep',
  },
  {
    path: '/close',
    element: 'close',
  },
]);

const drawerMatches: DrawerMatches = {
  help: (
    <DrawerV2.Content>
      <DrawerV2.Header>
        <DrawerV2.Title>Help</DrawerV2.Title>
        <DrawerV2.Actions>
          <DrawerV2.Close />
        </DrawerV2.Actions>
      </DrawerV2.Header>
    </DrawerV2.Content>
  ),
  drawer1: ({ body }: { body: string }) => (
    <DrawerV2.Content>
      <DrawerV2.Header>
        <DrawerV2.Title>Drawer n°1</DrawerV2.Title>
        <DrawerV2.Actions>
          <DrawerV2.Maximize />
          <DrawerV2.Close />
        </DrawerV2.Actions>
      </DrawerV2.Header>
      <DrawerV2.Body>{body}</DrawerV2.Body>
      <DrawerV2.Footer>
        Footer
        <DrawerV2.Actions>Actions</DrawerV2.Actions>
      </DrawerV2.Footer>
    </DrawerV2.Content>
  ),
  drawer2: (
    <DrawerV2.Content>
      <DrawerV2.Header>
        <DrawerV2.Title>Drawer n°2</DrawerV2.Title>
        <DrawerV2.Actions>
          <DrawerV2.Maximize />
          <DrawerV2.Close />
        </DrawerV2.Actions>
      </DrawerV2.Header>
      <DrawerV2.Body>Body</DrawerV2.Body>
      <DrawerV2.Footer>
        Footer
        <DrawerV2.Actions>Actions</DrawerV2.Actions>
      </DrawerV2.Footer>
    </DrawerV2.Content>
  ),
};

const FakeSidePanel = () => {
  return (
    <SidePanel.Content>
      <SidePanel.Header>
        <SidePanel.Title>Side panel</SidePanel.Title>
        <SidePanel.Actions>
          <SidePanel.Close />
        </SidePanel.Actions>
      </SidePanel.Header>
      <SidePanel.Body>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem
        dolorem excepturi ipsam iste magnam non recusandae ullam? Autem beatae
        culpa, cupiditate doloribus, ducimus eaque est illum laboriosam nam
        nulla quaerat quasi quod ratione rem repudiandae sequi tempora unde
        veritatis vitae voluptatibus? Accusantium adipisci autem consequatur
        consequuntur dignissimos ducimus earum eius eligendi est explicabo
        incidunt ipsa, ipsam iste, iure laudantium maiores minima modi molestias
        omnis perspiciatis ratione reiciendis tempora tempore ullam vel voluptas
        voluptates? Accusamus ad alias amet animi atque aut debitis dolorem
        doloremque eligendi enim est eveniet ex excepturi, expedita fugiat fugit
        hic impedit in iure labore maiores maxime nihil non numquam, officia
        placeat possimus quae quam quisquam ratione repudiandae tempora ullam
        vel veritatis vero voluptatem, voluptatibus! Doloremque eligendi iure
        labore laboriosam laborum mollitia nemo sunt voluptates. A ab architecto
        asperiores autem culpa eius excepturi ipsum itaque iure iusto laboriosam
        magni nam necessitatibus nesciunt nostrum officia possimus praesentium
        quasi quis quos saepe, sapiente sit temporibus, vitae voluptas voluptate
        voluptatibus voluptatum? Aperiam doloremque est explicabo fugiat fugit
        nobis nulla perspiciatis ratione totam vero. Accusantium architecto
        consequuntur eum facilis fugit hic ipsa odio odit similique vero! Cum
        deleniti in libero omnis, repellat ullam! Aspernatur fuga iusto labore
        nostrum perspiciatis, voluptas voluptatem. Accusamus adipisci at autem
        consequuntur cum, cumque deleniti dicta dolorum excepturi exercitationem
        iusto libero magnam natus nisi nostrum, omnis perspiciatis placeat
        praesentium quas quidem repellendus sequi similique sint veniam
        voluptas. A amet blanditiis consequuntur culpa debitis deleniti enim
        esse expedita fuga ipsa, nam nemo nulla odit officiis omnis provident
        recusandae rem sed soluta tempora velit veniam vero! Adipisci, amet
        assumenda autem culpa dolorum eaque in iste laudantium, odio, officia
        praesentium quam unde ut veritatis vero. Cumque, delectus deleniti ea
        eos et ex explicabo in ipsum, libero necessitatibus nihil nobis omnis
        optio, quas quia quis tempora! A consequuntur cupiditate dignissimos
        dolor doloribus eos laborum velit. Ad alias assumenda harum laboriosam
        minima minus molestias quia quibusdam temporibus! Error ex, excepturi
        magni nihil nulla perferendis sapiente vel. Incidunt obcaecati optio
        sunt! Aliquam architecto atque culpa eaque enim est hic impedit, iure
        laudantium, magni porro possimus, quaerat qui vitae voluptates. Delectus
        dolor earum inventore maxime, perferendis quas quod. Commodi dicta
        distinctio exercitationem expedita minima nesciunt nihil, nostrum odio
        omnis sint! Accusamus accusantium adipisci consectetur consequuntur
        culpa cumque cupiditate deserunt dolores, eaque expedita harum hic ipsam
        molestiae neque nostrum praesentium quaerat quis, sequi veniam vero
        vitae voluptatem voluptatibus. Amet explicabo nam placeat quae quo sed?
        Alias aliquid assumenda commodi consequuntur debitis enim est facilis
        laborum, modi, nam natus non odit omnis pariatur placeat quae quasi qui
        quis quo repellat reprehenderit saepe sint tempora totam velit veniam
        voluptatibus! Accusantium ad consectetur corporis doloribus explicabo
        fugiat pariatur temporibus? Adipisci aliquam atque cum deserunt expedita
        fuga illum inventore minus neque nostrum nulla numquam quaerat, quo quos
        rerum? Accusantium architecto consequatur cum dignissimos incidunt
        labore laudantium magni, odit officia optio, quam sint vel. Ab assumenda
        atque commodi consectetur est ex iure minima natus nemo optio placeat
        quod repellat, reprehenderit. A ab adipisci corporis culpa dolore error
        impedit itaque laborum maiores necessitatibus nisi obcaecati pariatur
        perspiciatis quidem ratione saepe sit sunt ullam, voluptatem voluptatum!
        Amet culpa dolor est, id ipsa iusto nihil soluta? Id minus quaerat
        suscipit! Cupiditate deleniti ducimus eveniet nesciunt sapiente
        similique? Aut exercitationem fugiat iusto libero reiciendis tenetur,
        voluptates. Adipisci culpa, doloribus, eos ex expedita ipsum laudantium
        nihil odit officia placeat quaerat quas quasi repellat sapiente tenetur
        vitae voluptates. Adipisci at, beatae dolor doloremque dolores iure
        laboriosam, laborum molestiae nemo neque officiis, qui sit voluptates.
        Dolore quas sunt vero. At distinctio, dolor error eum facilis fugit
        incidunt itaque, laboriosam nobis nulla, quae quos velit voluptas! Ad
        amet aperiam aut consectetur consequuntur iste iure laborum magni minima
        nihil quas sunt suscipit, vero. Ad alias asperiores aspernatur, at autem
        beatae consequuntur doloremque eaque eius eum eveniet fuga harum illum
        impedit in iste itaque labore laboriosam laudantium libero molestias
        nesciunt nihil odit pariatur possimus praesentium quas quibusdam ratione
        repellendus repudiandae sequi tenetur veniam voluptatibus. Ab accusamus
        accusantium ad cupiditate dignissimos distinctio eveniet excepturi iusto
        modi molestiae molestias quasi qui quibusdam quod, ratione rem saepe
        similique sint, soluta suscipit tempore tenetur velit, veritatis
        voluptate voluptates. Aperiam blanditiis ducimus eaque enim eos est
        facilis libero nisi, obcaecati, quia reiciendis, soluta veniam. Aliquid
        consectetur distinctio eos ex fugiat nemo sint tempore tenetur, velit.
        Aliquam amet autem consectetur consequuntur ea nisi officiis, pariatur
        sunt suscipit veritatis! Dolore doloremque maiores, natus nostrum
        placeat quibusdam vero? Culpa cum dignissimos doloremque facere, id iure
        labore molestiae quas rem reprehenderit, sunt temporibus unde veniam?
        Blanditiis dolorum fugit, illo itaque iusto molestiae nostrum odit
        repellendus sed. Adipisci alias aliquam aliquid consectetur cum debitis,
        dolores eaque earum eligendi explicabo fugiat hic minima, nostrum
        officiis omnis quas qui quisquam repudiandae rerum sapiente sint, sit
        voluptas voluptatibus! Ad dicta excepturi reprehenderit sapiente! Ad
        animi, aperiam asperiores, at cumque doloremque excepturi in laudantium
        maiores minima molestias nam, natus necessitatibus nesciunt non nulla
        obcaecati omnis optio perspiciatis possimus quia quo ratione repudiandae
        sequi sit soluta tempore totam veritatis vero voluptate. Asperiores
        delectus est harum labore tenetur! Dicta dolore ipsa laborum magni
        molestiae nam nobis quia quibusdam ullam voluptas! Ad aspernatur cumque
        deleniti deserunt, dignissimos earum esse eveniet facere facilis
        inventore iure libero magni mollitia natus numquam, omnis praesentium
        provident quia quod, reprehenderit sapiente sunt tenetur ut vel velit
        voluptate voluptatibus! Aliquam aspernatur beatae commodi consequuntur
        corporis deleniti dignissimos doloremque hic incidunt itaque, iusto
        labore magnam magni minima molestiae natus nemo odit possimus provident
        quasi quis quod quos reiciendis rem reprehenderit, rerum sed voluptatum.
        Ad animi, aperiam asperiores assumenda at beatae distinctio ducimus
        eaque error est, expedita explicabo illo ipsum laborum minus nam
        necessitatibus neque nihil odio optio, quae quibusdam quos reiciendis
        repellat repellendus rerum tempore tenetur unde ut voluptates? Alias
        aspernatur blanditiis consectetur consequuntur dicta distinctio, eius
        eum facilis harum inventore ipsa ipsum iure magnam, magni minima neque
        nisi non officia optio perferendis placeat possimus praesentium quaerat
        qui quia totam, vero vitae! Architecto aut cumque est exercitationem hic
        minima molestias sed unde. Ducimus enim esse ex, illo magni
        necessitatibus officia repellat sed sit voluptatum.
      </SidePanel.Body>
      <SidePanel.Footer>
        Footer
        <SidePanel.Actions>Actions</SidePanel.Actions>
      </SidePanel.Footer>
    </SidePanel.Content>
  );
};

const FakeMainContent = ({
  initialOpenSidePanel,
}: {
  initialOpenSidePanel?: boolean;
}) => {
  const drawer1 = useDrawerV2<{ body: ReactNode }>('drawer1', {
    keepOn: /\/(?!close)/,
  });
  const drawer2 = useDrawerV2('drawer2', { closeOn: /\/close/ });
  const currentDrawer = useCurrentDrawer();
  const helpDrawer = useDrawerV2('help');
  const sidePanel = useSidePanel(initialOpenSidePanel && <FakeSidePanel />);

  return (
    <LayoutV2.Row>
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
              </>
            }
            title="Layout"
          />
          <RouteContainer.Body>
            <Stack gap={6} margin={{ bottom: 6 }}>
              <LinkInternal to={{ pathname: '/' }}>Home</LinkInternal>
              <LinkInternal to={{ pathname: '/keep' }}>Keep</LinkInternal>
              <LinkInternal to={{ pathname: '/close' }}>Close</LinkInternal>
            </Stack>
            <Stack gap={6} margin={{ bottom: 8 }}>
              <Button
                onClick={() =>
                  drawer1.open({
                    body: <Paragraph>{faker.lorem.paragraph(100)}</Paragraph>,
                  })
                }
              >
                {drawer1.isOpened ? 'Update' : 'Open'} drawer n°1
              </Button>
              <Button
                onClick={() =>
                  drawer2.isOpened ? drawer2.close() : drawer2.open()
                }
              >
                Toggle drawer n°2
              </Button>
              {currentDrawer.id && (
                <Button
                  onClick={() => currentDrawer.close()}
                  variant="outlined"
                >
                  Close all drawers (Current: {currentDrawer.id})
                </Button>
              )}
            </Stack>
            <Stack gap={6} margin={{ bottom: 8 }}>
              <Button onClick={() => sidePanel.open(<FakeSidePanel />)}>
                Open side panel
              </Button>
              {sidePanel.isOpened && (
                <Button onClick={sidePanel.close} variant="outlined">
                  Close side panel
                </Button>
              )}
            </Stack>
            <Grid gap={8} isContainer isItem>
              <Grid colSpan={LAYOUT_COLUMNS} isItem>
                <Section>
                  <Section.Header>
                    <Section.Title>Active</Section.Title>
                    <Section.Button
                      data-testid="open-drawer"
                      onClick={() => helpDrawer.open()}
                      startIcon="ExternalLink"
                    >
                      Help
                    </Section.Button>
                  </Section.Header>

                  <Section.Body>
                    <Form.Field name="active_cti" valuePropName="checked">
                      <Input.Switch endLabel="Enabled" />
                    </Form.Field>
                  </Section.Body>
                </Section>
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
              <Grid colSpan={LAYOUT_COLUMNS} isItem>
                <Section>
                  <Section.Header>
                    <Section.Title>Title Section 3</Section.Title>
                  </Section.Header>
                  <Section.Body>
                    <Form.Field name="3">
                      <Input.Text label="Label 3" />
                    </Form.Field>
                  </Section.Body>
                </Section>
              </Grid>
            </Grid>
          </RouteContainer.Body>
        </RouteContainer>
      </Form>
    </LayoutV2.Row>
  );
};

export const Default: Story = {
  args: {
    banner: (
      <Helper>
        <Helper.Title>Important information</Helper.Title>
      </Helper>
    ),
    children: <FakeMainContent />,
    drawerConfig: { matches: drawerMatches },
    sideNav: (
      <SideNav>
        {SIDENAV_ROUTES.map(item => (
          <SideNav.Link key={item.icon} {...item} />
        ))}
      </SideNav>
    ),
    topNav: (
      <NavBar
        endElement={
          <>
            <NavigationItem
              content={
                <NavigationItem.Group>
                  <NavigationItem.Links>
                    <NavigationItem.Link to="/accounts/edit-profile">
                      Edit profile
                    </NavigationItem.Link>
                    <NavigationItem.Link to="/accounts/edit-password">
                      Change password
                    </NavigationItem.Link>
                  </NavigationItem.Links>
                </NavigationItem.Group>
              }
            >
              <NavigationItem.Trigger icon="User">Admin</NavigationItem.Trigger>
            </NavigationItem>
            <ThemeSwitch />
          </>
        }
        startElement={<SearchBar withGrow />}
      />
    ),
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing,
      location: {
        path: '/',
      },
    }),
  },
};

export const WithSearchParams: Story = {
  args: { ...Default.args },
  parameters: {
    reactRouter: reactRouterParameters({
      routing,
      location: {
        path: '/',
        searchParams: {
          drawer: 'drawer1',
          drawer_body: 'Drawer prop from URL',
        },
      },
    }),
  },
};

export const WithSidePanelOpened: Story = {
  args: {
    ...Default.args,
    children: <FakeMainContent initialOpenSidePanel />,
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing,
      location: {
        path: '/',
        searchParams: {
          drawer: 'drawer1',
          drawer_body: 'Drawer prop from URL',
        },
      },
    }),
  },
};

export default meta;
