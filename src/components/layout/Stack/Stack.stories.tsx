import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { MAX_SPACING } from '@/constants';
import { Input } from '@/skin/forms';
import type { ItemProps } from '@/skin/layout/Grid/types';
import { Title } from '@/skin/typography';
import { addInlineRadio, addNumber } from '@/storybook';

import type { StackProps } from '.';
import Stack from '.';
import {
  DEFAULT_AS,
  STACK_ALIGN_ITEMS,
  STACK_ALIGN_SELF,
  STACK_DIRECTIONS,
  STACK_JUSTIFY_CONTENT,
  STACK_WRAP,
} from './constants';

const ItemList = ({
  length,
  labelPrefix = 'Item',
  offset = 0,
  props,
}: {
  length: number;
  labelPrefix?: string;
  offset?: number;
  props?: ItemProps;
}) => {
  const data = range({ stop: length });

  return (
    <>
      {data.map(key => (
        <Item
          key={key}
          content={`${labelPrefix} ${key + offset + 1}`}
          {...props}
        />
      ))}
    </>
  );
};

const Item = ({
  content,
  selected,
}: {
  content: string;
  selected?: boolean;
}) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        fontWeight: 'var(--font-weight-medium)',
        padding: 'var(--spacing-8)',
        ...(selected && { boxShadow: '0 0 0 2px red inset' }),
      }}
    >
      {content}
    </div>
  );
};

type Story = StoryObj<typeof Stack>;

export default {
  title: 'layout/Stack',
  component: Stack,
  args: {
    as: DEFAULT_AS,
    children: <ItemList length={8} />,
    gap: 0,
  },
  argTypes: {
    ...addNumber<StackProps>('gap', { min: 0, max: MAX_SPACING }),
    ...addInlineRadio<StackProps>('alignContent', STACK_ALIGN_ITEMS),
    ...addInlineRadio<StackProps>('alignItems', STACK_ALIGN_ITEMS),
    ...addInlineRadio<StackProps>('direction', STACK_DIRECTIONS),
    ...addInlineRadio<StackProps>('justifyContent', STACK_JUSTIFY_CONTENT),
    ...addInlineRadio<StackProps>('wrap', STACK_WRAP),
  },
} as Meta<typeof Stack>;

const Template: StoryFn<typeof Stack> = ({ children, ...args }: StackProps) => (
  <Stack {...args}>{children}</Stack>
);

export const Default: Story = {
  render: Template,

  parameters: {
    controls: { exclude: ['margin', 'padding'] },
  },
};

export const WithBreakpoints: Story = {
  render: Template,

  args: {
    direction: { xs: 'row', sm: 'column', xl: 'row-reverse' },
  },

  parameters: {
    controls: { exclude: ['margin', 'padding'] },
  },
};

export const WithSpacings: Story = {
  render: Template,

  args: {
    margin: 12,
    padding: { top: { xs: 2, lg: 8 }, x: 3 },
  },
};

export const WithItems: Story = {
  render: (args: StackProps) => {
    const [selectedItem, setSelectedItem] = useState<number>();
    const [cssProperties, setCssProperties] = useState<
      Record<number, Record<string, string>>
    >({});

    const handleChange = (
      ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      if (!selectedItem) return;
      const name = ev.target.name;
      setCssProperties(prev => ({
        ...prev,
        [selectedItem.toString()]: {
          ...prev[selectedItem],
          [name]: ev.target.value,
        },
      }));
    };

    return (
      <>
        <Stack {...args} margin={{ bottom: 8 }}>
          {range({ start: 1, stop: 4 }).map(item => (
            <Stack.Item
              key={item}
              onClick={() => setSelectedItem(item)}
              style={{ cursor: 'pointer' }}
              {...(cssProperties[item] || {})}
            >
              <Item content={`Item ${item}`} selected={selectedItem === item} />
            </Stack.Item>
          ))}
        </Stack>

        <Title as="h4">Sélectionner un item pour changer ses paramètres</Title>

        {selectedItem && (
          <div>
            <Title as="h4">Item sélectionné : {selectedItem}</Title>

            <Stack gap={8} margin={{ top: 10 }} wrap="wrap">
              <Input.Number
                min={0}
                name="order"
                onChange={handleChange}
                value={(cssProperties[selectedItem] || {}).order ?? 0}
              />
              <Input.Text
                name="flex"
                onChange={handleChange}
                value={(cssProperties[selectedItem] || {}).flex ?? ''}
              />
              <Input.Number
                min={0}
                name="flexGrow"
                onChange={handleChange}
                value={(cssProperties[selectedItem] || {}).flexGrow ?? 0}
              />
              <Input.Text
                name="flexBasis"
                onChange={handleChange}
                value={(cssProperties[selectedItem] || {}).flexBasis ?? 'auto'}
              />
              <Input.Number
                min={0}
                name="flexShrink"
                onChange={handleChange}
                value={(cssProperties[selectedItem] || {}).flexShrink ?? 0}
              />

              <span>align-self</span>
              <select
                name="alignSelf"
                onChange={handleChange}
                value={(cssProperties[selectedItem] || {}).alignSelf ?? 'auto'}
              >
                {STACK_ALIGN_SELF.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Stack>
          </div>
        )}
      </>
    );
  },
};
