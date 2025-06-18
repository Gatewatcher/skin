import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { ModalProps } from '.';
import Modal from '.';
import { DURATIONS } from '../Floating/constants';
import {
  DEFAULT_SCROLL_ON,
  DEFAULT_SIZE,
  MODAL_SCROLL_ON,
  MODAL_SIZES,
} from './constants';

type Story = StoryObj<typeof Modal>;

export default {
  title: 'displays/floating/Modal',
  component: Modal,
  args: {
    children: <Button>trigger</Button>,
    content: <div>content</div>,
    scrollOn: DEFAULT_SCROLL_ON,
    size: DEFAULT_SIZE,
    withBackdrop: true,
  },
  argTypes: {
    ...addInlineRadio<ModalProps>('size', MODAL_SIZES),
    ...addInlineRadio<ModalProps>('scrollOn', MODAL_SCROLL_ON),
    ...addInlineRadio<ModalProps>('duration', DURATIONS),
  },
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = ({
  children,
  content,
  ...args
}: ModalProps) => (
  <Modal content={content} {...args}>
    {children}
  </Modal>
);

export const Default: Story = {
  render: Template,
  args: {
    content: (
      <>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>body</Modal.Body>
      </>
    ),
  },
};

export const WithBasicActions: Story = {
  render: Template,
  args: {
    content: (
      <>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>body</Modal.Body>
        <Modal.Footer>
          <Modal.BasicActions />
        </Modal.Footer>
      </>
    ),
  },
};

export const WithExternalControl: Story = {
  render: ({ children, ...args }) => {
    const [externalStatus, setExternalStatus] = useState(false);
    const handleClick = () => {
      setExternalStatus(prevState => !prevState);
    };

    return (
      <Stack gap={5}>
        <Button onClick={handleClick}>external trigger</Button>
        <Modal
          {...args}
          isOpened={externalStatus}
          setIsOpened={setExternalStatus}
        />

        <Modal {...args}>{children}</Modal>
      </Stack>
    );
  },
  args: {
    children: <Button>Internal trigger</Button>,
  },
};

export const WithBasicActionsCustomLabels: Story = {
  render: Template,
  args: {
    content: (
      <>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>body</Modal.Body>
        <Modal.Footer>
          <Modal.BasicActions
            cancelLabel="cancel label"
            onCancel={() => {}}
            onSave={() => {}}
            saveLabel="save label"
          />
        </Modal.Footer>
      </>
    ),
  },
};

export const WithScroll: Story = {
  render: Template,
  args: {
    content: (
      <>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          Dolore nulla do nostrud occaecat culpa pariatur minim labore minim
          cupidatat irure adipisicing tempor do. Sit aute aliqua eiusmod culpa
          eiusmod Lorem fugiat consequat aute adipisicing veniam ullamco.
          Nostrud ex aliqua reprehenderit anim in ad consequat occaecat sunt in
          velit. Mollit aliqua labore commodo eiusmod qui do deserunt amet dolor
          aliqua velit mollit. Anim velit elit velit aliqua consectetur
          cupidatat enim consectetur ad qui pariatur id. Ad non in officia
          dolore in voluptate proident et anim do ea esse. Tempor sit deserunt
          laboris duis aliquip. Adipisicing dolore qui ex aliquip ea elit dolore
          ullamco consequat nisi nostrud sit. Anim quis aute labore
          reprehenderit esse fugiat officia irure incididunt do laborum qui
          enim. Amet est do amet quis. Ullamco est mollit adipisicing
          exercitation laborum id officia cillum occaecat ad adipisicing tempor.
          Mollit occaecat esse ad ad esse non irure. Mollit Lorem amet
          adipisicing tempor. Anim esse ullamco duis pariatur non id ea aliquip
          sunt esse. Magna culpa commodo nostrud exercitation officia consequat
          proident esse ea eiusmod consectetur sint deserunt mollit. Aliquip
          sint excepteur deserunt labore cillum irure cillum cillum dolore
          labore. Laborum sit non deserunt officia officia eu deserunt commodo
          aliqua. Laboris excepteur reprehenderit mollit Lorem quis laborum
          quis. Excepteur anim qui elit et consectetur nisi do aliqua Lorem aute
          magna sint do. Laborum id labore non ipsum nisi laborum esse
          exercitation excepteur id sint reprehenderit. Proident velit fugiat
          voluptate excepteur excepteur. Irure nostrud voluptate reprehenderit
          cupidatat voluptate consequat culpa quis eu tempor enim. Esse veniam
          mollit amet nulla. Laboris laboris mollit sint id reprehenderit do
          elit voluptate dolore. Ut commodo pariatur consequat dolore dolor
          laborum quis fugiat elit minim. Ea magna ipsum mollit commodo
          consectetur anim velit id in et labore laborum nulla. Qui proident
          exercitation sint esse occaecat voluptate enim dolore do ullamco.
          Dolor laborum enim culpa eu sit. Irure officia Lorem consectetur
          excepteur tempor minim consectetur sit cupidatat ullamco fugiat aute.
          Sint ipsum cillum reprehenderit non duis laborum. Consectetur magna
          consectetur adipisicing reprehenderit adipisicing dolore laborum anim
          veniam magna quis. Aute mollit labore anim aliquip Lorem eu. Dolore
          nulla do nostrud occaecat culpa pariatur minim labore minim cupidatat
          irure adipisicing tempor do. Sit aute aliqua eiusmod culpa eiusmod
          Lorem fugiat consequat aute adipisicing veniam ullamco. Nostrud ex
          aliqua reprehenderit anim in ad consequat occaecat sunt in velit.
          Mollit aliqua labore commodo eiusmod qui do deserunt amet dolor aliqua
          velit mollit. Anim velit elit velit aliqua consectetur cupidatat enim
          consectetur ad qui pariatur id. Ad non in officia dolore in voluptate
          proident et anim do ea esse. Tempor sit deserunt laboris duis aliquip.
          Adipisicing dolore qui ex aliquip ea elit dolore ullamco consequat
          nisi nostrud sit. Anim quis aute labore reprehenderit esse fugiat
          officia irure incididunt do laborum qui enim. Amet est do amet quis.
          Ullamco est mollit adipisicing exercitation laborum id officia cillum
          occaecat ad adipisicing tempor. Mollit occaecat esse ad ad esse non
          irure. Mollit Lorem amet adipisicing tempor. Anim esse ullamco duis
          pariatur non id ea aliquip sunt esse. Magna culpa commodo nostrud
          exercitation officia consequat proident esse ea eiusmod consectetur
          sint deserunt mollit. Aliquip sint excepteur deserunt labore cillum
          irure cillum cillum dolore labore. Laborum sit non deserunt officia
          officia eu deserunt commodo aliqua. Laboris excepteur reprehenderit
          mollit Lorem quis laborum quis. Excepteur anim qui elit et consectetur
          nisi do aliqua Lorem aute magna sint do. Laborum id labore non ipsum
          nisi laborum esse exercitation excepteur id sint reprehenderit.
          Proident velit fugiat voluptate excepteur excepteur. Irure nostrud
          voluptate reprehenderit cupidatat voluptate consequat culpa quis eu
          tempor enim. Esse veniam mollit amet nulla. Laboris laboris mollit
          sint id reprehenderit do elit voluptate dolore. Ut commodo pariatur
          consequat dolore dolor laborum quis fugiat elit minim. Ea magna ipsum
          mollit commodo consectetur anim velit id in et labore laborum nulla.
          Qui proident exercitation sint esse occaecat voluptate enim dolore do
          ullamco. Dolor laborum enim culpa eu sit. Irure officia Lorem
          consectetur excepteur tempor minim consectetur sit cupidatat ullamco
          fugiat aute. Sint ipsum cillum reprehenderit non duis laborum.
          Consectetur magna consectetur adipisicing reprehenderit adipisicing
          dolore laborum anim veniam magna quis. Aute mollit labore anim aliquip
          Lorem eu. Dolore nulla do nostrud occaecat culpa pariatur minim labore
          minim cupidatat irure adipisicing tempor do. Sit aute aliqua eiusmod
          culpa eiusmod Lorem fugiat consequat aute adipisicing veniam ullamco.
          Nostrud ex aliqua reprehenderit anim in ad consequat occaecat sunt in
          velit. Mollit aliqua labore commodo eiusmod qui do deserunt amet dolor
          aliqua velit mollit. Anim velit elit velit aliqua consectetur
          cupidatat enim consectetur ad qui pariatur id. Ad non in officia
          dolore in voluptate proident et anim do ea esse. Tempor sit deserunt
          laboris duis aliquip. Adipisicing dolore qui ex aliquip ea elit dolore
          ullamco consequat nisi nostrud sit. Anim quis aute labore
          reprehenderit esse fugiat officia irure incididunt do laborum qui
          enim. Amet est do amet quis. Ullamco est ┌( ಠ‿ಠ )┘ adipisicing
          exercitation laborum id officia cillum occaecat ad adipisicing tempor.
          Mollit occaecat esse ad ad esse non irure. Mollit Lorem amet
          adipisicing tempor. Anim esse ullamco duis pariatur non id ea aliquip
          sunt esse. Magna culpa commodo nostrud exercitation officia consequat
          proident esse ea eiusmod consectetur sint deserunt mollit. Aliquip
          sint excepteur deserunt labore cillum irure cillum cillum dolore
          labore. Laborum sit non deserunt officia officia eu deserunt commodo
          aliqua. Laboris excepteur reprehenderit mollit Lorem quis laborum
          quis. Excepteur anim qui elit et consectetur nisi do aliqua Lorem aute
          magna sint do. Laborum id labore non ipsum nisi laborum esse
          exercitation excepteur id sint reprehenderit. Proident velit fugiat
          voluptate excepteur excepteur. Irure nostrud voluptate reprehenderit
          cupidatat voluptate consequat culpa quis eu tempor enim. Esse veniam
          mollit amet nulla. Laboris laboris mollit sint id reprehenderit do
          elit voluptate dolore. Ut commodo pariatur consequat dolore dolor
          laborum quis fugiat elit minim. Ea magna ipsum mollit commodo
          consectetur anim velit id in et labore laborum nulla. Qui proident
          exercitation sint esse occaecat voluptate enim dolore do ullamco.
          Dolor laborum enim culpa eu sit. Irure officia Lorem consectetur
          excepteur tempor minim consectetur sit cupidatat ullamco fugiat aute.
          Sint ipsum cillum reprehenderit non duis laborum. Consectetur magna
          consectetur adipisicing reprehenderit adipisicing dolore laborum anim
          veniam magna quis. Aute mollit labore anim aliquip Lorem eu.
        </Modal.Body>
      </>
    ),
  },
};

export const ContentAsFunction: Story = {
  render: Template,
  args: {
    content: ({ close, opened }) => (
      <>
        <Modal.Header>
          <Modal.Title>
            header - Modal {opened ? 'opened' : 'not opened'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Modal.BasicActions
            onCancel={() => {
              console.log('cancel');
              close();
            }}
            onSave={() => {
              console.log('cancel');
              close();
            }}
          />
        </Modal.Footer>
      </>
    ),
  },
};

export const Stacked: Story = {
  render: Template,
  args: {
    content: (
      <>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <Modal
            content={
              <>
                <Modal.Header>
                  <Modal.Title>Title modal 2</Modal.Title>
                  <Modal.Close />
                </Modal.Header>
                <Modal.Body>
                  <Button onClick={() => alert('modal 2 click')}>
                    click me
                  </Button>
                </Modal.Body>
              </>
            }
            withBackdrop={false}
          >
            <Button>Open modal 2</Button>
          </Modal>
        </Modal.Body>
      </>
    ),
  },
};

export const AsyncAction: StoryObj<typeof Modal> = {
  render: ({ children, ...args }: ModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <Modal
        {...args}
        content={
          <>
            <Modal.Header>
              <Modal.Title>Title</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>Some content</Modal.Body>
            <Modal.Footer>
              <Modal.BasicActions
                onSave={async () => {
                  setIsLoading(true);
                  return new Promise(resolve =>
                    setTimeout(() => {
                      setIsLoading(false);
                      resolve();
                    }, 3000),
                  );
                }}
                isLoading={isLoading}
              />
            </Modal.Footer>
          </>
        }
      >
        {children}
      </Modal>
    );
  },
};
