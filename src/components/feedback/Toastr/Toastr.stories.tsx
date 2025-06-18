import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { Button } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { ToastrProps } from '.';
import Toastr from '.';
import type Toast from './compounds/Toast';
import {
  DEFAULT_DURATION,
  DEFAULT_MAX,
  DEFAULT_OFFSET,
  DEFAULT_POSITION,
  TOASTR_POSITIONS,
  TOAST_TYPES,
} from './constants';
import { useToasts } from './hook';
import type { Toast as ToastPros } from './types';

faker.seed(10);

type Story = StoryObj<typeof Toastr>;

export default {
  title: 'feedback/Toastr',
  component: Toastr,
  args: {
    max: DEFAULT_MAX,
    offset: DEFAULT_OFFSET,
    position: DEFAULT_POSITION,
  },
  argTypes: {
    ...addInlineRadio<ToastrProps>('position', TOASTR_POSITIONS),
  },
  parameters: {
    controls: { exclude: ['children'] },
  },
} as Meta<typeof Toastr>;

const AddToast = () => {
  const { addToast, clearAllToasts } = useToasts();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
      }}
    >
      <Stack direction="column" gap={5}>
        <Button
          onClick={() =>
            addToast({
              title: faker.lorem.words(4),
              content: faker.lorem.sentences(2),
            })
          }
        >
          Add toast
        </Button>

        <Button onClick={clearAllToasts}>Clear all</Button>
      </Stack>
    </div>
  );
};

const AddAllToasts = () => {
  const { addToast } = useToasts();

  useEffect(() => {
    addToast({
      title: faker.lorem.words(),
      content: faker.lorem.sentences(2),
    });

    TOAST_TYPES.map(type => {
      addToast({
        title: faker.lorem.words(),
        content: faker.lorem.sentences(2),
        type,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

const Template: StoryFn<typeof Toastr> = ({
  children,
  ...args
}: ToastrProps) => {
  return <Toastr {...args}>{children || <AddToast />}</Toastr>;
};

export const Default: Story = {
  render: Template,
};

export const All: Story = {
  render: Template,

  args: {
    max: 10,
    children: <AddAllToasts />,
  },
};

export const Custom: StoryObj<typeof Toast> = {
  render: (args: ToastPros) => {
    const CustomChildren = (args: ToastPros) => {
      const { addToast, clearAllToasts, removeToast } = useToasts();
      let id = 0;

      const handleRemove = () => {
        removeToast(id.toString());
        id--;
      };

      const handleClearAll = () => {
        clearAllToasts();
        id = 0;
      };

      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 400,
          }}
        >
          <Stack direction="column" gap={5}>
            <Button
              onClick={() => {
                id++;
                addToast({ ...args, id: id.toString() });
              }}
            >
              Add toast
            </Button>

            <Button onClick={handleRemove}>Remove last toast</Button>

            <Button onClick={handleClearAll}>Clear all</Button>
          </Stack>
        </div>
      );
    };

    return (
      <Toastr {...args}>
        <CustomChildren {...args} />
      </Toastr>
    );
  },

  parameters: {
    controls: { exclude: ['max'] },
  },

  argTypes: {
    ...addInlineRadio<ToastPros>('type', TOAST_TYPES),
  },

  args: {
    type: undefined,
    title: faker.lorem.words(4),
    duration: DEFAULT_DURATION,
    content: faker.lorem.sentences(2),
  },
};
