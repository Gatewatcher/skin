import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { Button, ButtonActions, ButtonIcon } from '@/skin/actions';
import { ScoreIndicator, Stepper, Tabs } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { OverflownParagraph, Paragraph, Title } from '@/skin/typography';

import PanelContentLayout from '.';

faker.seed(42);

const TABS_COUNT = 5;

type ContentLayoutArgs = ComponentProps<typeof PanelContentLayout.Body> & {
  displayHeader: boolean;
};

const meta: Meta<ContentLayoutArgs> = {
  title: 'displays/panels/PanelContentLayout',
  component: PanelContentLayout,
  decorators: [
    Story => (
      <div
        style={{
          width: 600,
          height: 900,
          overflow: 'hidden',
          resize: 'both',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    displayHeader: true,
    fitContent: false,
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ displayHeader, fitContent }) => {
    return (
      <PanelContentLayout>
        <PanelContentLayout.Header
          dynamicContent={({ scrollTop }) => (
            <Stack gap={8} style={{ maxHeight: scrollTop < 50 ? 125 : 80 }}>
              <ScoreIndicator
                sectors={['low', 'danger']}
                size={scrollTop < 50 ? 'medium' : 'small'}
                value={42}
              />
              <div
                style={{
                  transform: `scale(${Math.max(50 - scrollTop / 10, 40) / 50})`,
                  transformOrigin: 'center top',
                  overflow: 'auto',
                }}
              >
                <OverflownParagraph
                  height={scrollTop < 50 ? 125 : 80}
                  type="info"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  ad asperiores commodi debitis delectus dicta dolor dolores ea
                  earum, facere facilis fuga illum inventore nam obcaecati
                  officia quisquam ratione vero! A assumenda, consectetur cumque
                  ducimus eligendi eveniet fuga illum ipsa, ipsum magni maiores
                  quod rerum sit totam ut veniam veritatis?
                </OverflownParagraph>
              </div>
            </Stack>
          )}
        >
          {displayHeader && (
            <>
              <PanelContentLayout.Title>
                {faker.lorem.paragraph()}
              </PanelContentLayout.Title>
              <PanelContentLayout.Actions>
                <ButtonActions
                  actions={
                    <ButtonActions.Actions>
                      <ButtonActions.Button>Action 1</ButtonActions.Button>
                      <ButtonActions.Button>Action 2</ButtonActions.Button>
                    </ButtonActions.Actions>
                  }
                  variant="ghosted"
                >
                  Actions
                </ButtonActions>
                <ButtonIcon icon="Maximize" type="neutral" variant="ghosted" />
                <ButtonIcon icon="Close" type="neutral" variant="ghosted" />
              </PanelContentLayout.Actions>
            </>
          )}
        </PanelContentLayout.Header>
        <Tabs>
          <PanelContentLayout.SubHeader>
            <Tabs.TitleList variant="secondary" full>
              {range({ start: 1, stop: TABS_COUNT + 1 }).map(item => (
                <Tabs.Title key={item}>Tab {item}</Tabs.Title>
              ))}
            </Tabs.TitleList>
          </PanelContentLayout.SubHeader>
          <PanelContentLayout.Body fitContent={fitContent} margin={{ top: 8 }}>
            <Stack>
              <Tabs.PanelList>
                {range({ start: 1, stop: TABS_COUNT + 1 }).map(item => (
                  <Tabs.Panel key={item}>
                    <Paragraph>{faker.lorem.paragraph(100)}</Paragraph>
                  </Tabs.Panel>
                ))}
              </Tabs.PanelList>
            </Stack>
          </PanelContentLayout.Body>
        </Tabs>
        <PanelContentLayout.Footer>
          <Button size="small" variant="outlined">
            Secondary&nbsp;action
          </Button>
          <PanelContentLayout.Actions>
            <Button size="small" variant="outlined">
              Primary action 2
            </Button>
            <Button size="small">Primary action 1</Button>
          </PanelContentLayout.Actions>
        </PanelContentLayout.Footer>
      </PanelContentLayout>
    );
  },
};

export const Wireframe: Story = {
  render: () => {
    return (
      <PanelContentLayout>
        <PanelContentLayout.Header>
          <PanelContentLayout.Title>Title</PanelContentLayout.Title>
          <PanelContentLayout.Actions>
            <div style={{ border: '1px solid gray', padding: 15 }}>Actions</div>
          </PanelContentLayout.Actions>
        </PanelContentLayout.Header>
        <PanelContentLayout.Body>
          <Stack
            style={{
              border: '1px solid gray',
              height: '100%',
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Title>Body</Title>
          </Stack>
        </PanelContentLayout.Body>
        <PanelContentLayout.Footer>
          <Title>Footer</Title>
          <PanelContentLayout.Actions>
            <div style={{ border: '1px solid gray', padding: 15 }}>Actions</div>
          </PanelContentLayout.Actions>
        </PanelContentLayout.Footer>
      </PanelContentLayout>
    );
  },
};

export const WithChildrenWrapped: Story = {
  render: () => {
    return (
      <PanelContentLayout>
        <div>
          <div>
            <PanelContentLayout.Header>
              <PanelContentLayout.Title>Title</PanelContentLayout.Title>
              <PanelContentLayout.Actions>
                <div style={{ border: '1px solid gray', padding: 15 }}>
                  Actions
                </div>
              </PanelContentLayout.Actions>
            </PanelContentLayout.Header>
            <PanelContentLayout.Body>
              <Stack
                style={{
                  border: '1px solid gray',
                  height: '100%',
                }}
                alignItems="center"
                justifyContent="center"
              >
                <Title>Body</Title>
              </Stack>
            </PanelContentLayout.Body>
            <PanelContentLayout.Footer>
              <Title>Footer</Title>
              <PanelContentLayout.Actions>
                <div style={{ border: '1px solid gray', padding: 15 }}>
                  Actions
                </div>
              </PanelContentLayout.Actions>
            </PanelContentLayout.Footer>
          </div>
        </div>
      </PanelContentLayout>
    );
  },
};

export const WithStepper: Story = {
  render: () => {
    return (
      <PanelContentLayout>
        <Stepper>
          <Stepper.PanelList>
            <Stepper.Panel>
              <PanelContentLayout.Header>
                <PanelContentLayout.Title>Title (1/2)</PanelContentLayout.Title>
                <PanelContentLayout.Actions>
                  <div style={{ border: '1px solid gray', padding: 15 }}>
                    Actions
                  </div>
                </PanelContentLayout.Actions>
              </PanelContentLayout.Header>
              <PanelContentLayout.Body>
                <Stack
                  style={{
                    border: '1px solid gray',
                    height: '100%',
                  }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Title>Body (1/2)</Title>
                </Stack>
              </PanelContentLayout.Body>
            </Stepper.Panel>
            <Stepper.Panel>
              <PanelContentLayout.Header>
                <PanelContentLayout.Title>Title (2/2)</PanelContentLayout.Title>
                <PanelContentLayout.Actions>
                  <div style={{ border: '1px solid gray', padding: 15 }}>
                    Actions
                  </div>
                </PanelContentLayout.Actions>
              </PanelContentLayout.Header>
              <PanelContentLayout.Body>
                <Stack
                  style={{
                    border: '1px solid gray',
                    height: '100%',
                  }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Title>Body (2/2)</Title>
                </Stack>
              </PanelContentLayout.Body>
            </Stepper.Panel>
          </Stepper.PanelList>
          <Stepper.Navigation
            next={<Stepper.Next>Next</Stepper.Next>}
            prev={<Stepper.Prev>Prev</Stepper.Prev>}
            submit={<Button>Submit</Button>}
          >
            {({ prev, next, submit }) => (
              <PanelContentLayout.Footer>
                {prev}
                <PanelContentLayout.Actions>
                  {next}
                  {submit}
                </PanelContentLayout.Actions>
              </PanelContentLayout.Footer>
            )}
          </Stepper.Navigation>
        </Stepper>
      </PanelContentLayout>
    );
  },
};

export default meta;
