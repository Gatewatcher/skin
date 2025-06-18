import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';

import { MAX_SPACING } from '@/constants';
import { addInlineRadio, addNumber } from '@/storybook';

import {
  DEFAULT_AS,
  DEFAULT_COLUMNS_MAX_SIZE,
  DEFAULT_GAP,
  DEFAULT_REPEAT_AUTO,
  GRID_ALIGN_ITEMS,
  GRID_ALIGN_SELF,
  GRID_JUSTIFY_CONTENT,
  GRID_REPEAT,
} from './constants';
import type { GridProps } from './index';
import Grid from './index';
import type { ItemProps } from './types';

type Story = StoryObj<typeof Grid>;

faker.seed(10);

export default {
  title: 'layout/Grid',
  component: Grid,
  args: {
    as: DEFAULT_AS,
    repeatAuto: DEFAULT_REPEAT_AUTO,
    columnsMaxSize: DEFAULT_COLUMNS_MAX_SIZE,
  },
  argTypes: {
    ...addNumber<GridProps>('colSpan', { min: 1 }),
    ...addNumber<GridProps>('columns', { min: 1 }),
    ...addNumber<GridProps>('gap', { min: 0, max: MAX_SPACING }),
    ...addNumber<GridProps>('rowSpan', { min: 1 }),
    ...addInlineRadio<GridProps>('repeatAuto', GRID_REPEAT),
    ...addInlineRadio<GridProps>('alignItems', GRID_ALIGN_ITEMS),
    ...addInlineRadio<GridProps>('justifyContent', GRID_JUSTIFY_CONTENT),
    ...addInlineRadio<GridProps>('alignSelf', GRID_ALIGN_SELF),
  },
  parameters: {
    controls: { exclude: ['column', 'row'] },
  },
} as Meta<typeof Grid>;

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
        <Grid {...props} key={key} isItem>
          <Item content={`${labelPrefix} ${key + offset + 1}`} />
        </Grid>
      ))}
    </>
  );
};

const Item = ({ content }: { content: string }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        fontWeight: 'var(--font-weight-medium)',
        padding: 'var(--spacing-8)',
      }}
    >
      {content}
    </div>
  );
};

const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Aliquam assumenda autem commodi dolore enim impedit, ipsum iure nam nemo nulla odit ratione totam!
Accusantium animi beatae blanditiis consectetur delectus ducimus earum eius fugit in ipsum maxime nisi odit optio,
quisquam repellendus sapiente voluptate? Harum natus nemo recusandae sed soluta, voluptatem!
`;

export const Default: Story = {
  render: args => {
    return (
      <Grid isContainer {...args}>
        <ItemList length={12} props={args} />
      </Grid>
    );
  },
  args: {
    colSpan: 2,
    columns: 6,
    gap: 6,
  },
};

export const AsReactComponent: Story = {
  render: args => {
    return (
      <Grid isContainer {...args}>
        <ItemList length={12} props={args} />
      </Grid>
    );
  },
  args: {
    as: ({ children, ...props }) => <small {...props}>{children}</small>,
    colSpan: 2,
    columns: 6,
    gap: 6,
  },
  parameters: {
    controls: { exclude: 'as' },
  },
};

export const Nested: Story = {
  render: args => (
    <Grid isContainer {...args}>
      <ItemList length={4} props={args} />
      <Grid
        colSpan={{ lg: 3 }}
        columns={{ xs: 1, md: 2, lg: 3 }}
        gap={{ xs: 5, lg: 9, xxl: 12 }}
        isContainer
        isItem
      >
        <ItemList labelPrefix="Sub-grid 1 -" length={5} props={args} />
      </Grid>
      <Grid isItem>
        <Item content={LOREM_IPSUM} />
      </Grid>
    </Grid>
  ),
  args: {
    columns: {
      sm: 2,
      lg: 4,
    },
    gap: { xs: 5, md: 9, xxl: 12 },
  },
};

export const WithBreakpoints: Story = {
  render: args => {
    return (
      <Grid
        {...args}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        isContainer
      >
        <ItemList length={12} props={args} />
      </Grid>
    );
  },
  args: {},
};

export const WithMinmax: Story = {
  render: args => {
    return (
      <Grid {...args} isContainer>
        <ItemList length={12} props={args} />
      </Grid>
    );
  },
  args: {
    gap: DEFAULT_GAP,
    columnsMinSize: '200px',
  },
  argTypes: {
    ...addInlineRadio<GridProps>('repeatAuto', GRID_REPEAT),
  },
  parameters: {
    controls: {
      exclude: ['isContainer', 'colSpan', 'columns', 'isItem', 'rowSpan'],
    },
  },
};

export const WithSpacings: Story = {
  render: ({ margin, padding, ...args }: GridProps) => {
    return (
      <Grid {...args} margin={margin} padding={padding} isContainer>
        <ItemList length={12} />
      </Grid>
    );
  },
  args: {
    margin: 12,
    padding: { top: { xs: 2, lg: 8 }, x: 3 },
    columns: 4,
  },
};

export const WithColumnsEqualWidth: Story = {
  render: ({ ...args }: GridProps) => {
    return (
      <Grid {...args} isContainer>
        <ItemList labelPrefix={faker.lorem.paragraph()} length={3} />
      </Grid>
    );
  },
  args: {
    withEqualWidthColumns: true,
    columns: 3,
  },
};
