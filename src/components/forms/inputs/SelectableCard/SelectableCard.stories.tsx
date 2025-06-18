import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { withControlledValue } from '@/hocs';
import type { GridProps } from '@/skin/layout';
import { addInlineRadio, addNumber } from '@/storybook';

import type { SelectableCardProps } from '.';
import SelectableCard from '.';
import { SELECTABLE_CARD_TYPE } from './constants';

type Story = StoryObj<typeof SelectableCard>;

const FORM_FIELD_NAME = 'name';

export default {
  title: 'forms/inputs/SelectableCard',
  component: SelectableCard,
  args: {
    disabled: false,
    type: 'radio',
    columns: 2,
  },
  argTypes: {
    ...addInlineRadio<SelectableCardProps>('type', SELECTABLE_CARD_TYPE),
    ...addNumber<GridProps>('columns', { min: 1 }),
    ...addNumber<GridProps>('rows', { min: 1 }),
    ...addNumber<GridProps>('colSpan', { min: 1 }),
    ...addNumber<GridProps>('rowSpan', { min: 1 }),
  },
  parameters: {
    controls: { exclude: /^label/ },
  },
} as Meta<typeof SelectableCard>;

const ControlledSelectableCard = withControlledValue(SelectableCard, {
  valuePropName: 'value',
});

const Template: StoryFn<typeof SelectableCard> = (
  args: SelectableCardProps,
) => (
  <>
    <ControlledSelectableCard {...args}>
      {Component => (
        <>
          <Component
            description="Lorem ipsum dolor sit amesLorem ipsum dolor sit amesLorem ipsu."
            label="Lorem"
            name={FORM_FIELD_NAME}
            value="Lorem"
          />
          <Component
            description="Lorem ipsum dolor sit amesLorem ipsum dolor sit amesLorem ipsu."
            label="Ipsum"
            name={FORM_FIELD_NAME}
            value="Ipsum"
          />
        </>
      )}
    </ControlledSelectableCard>
  </>
);

export const Default: Story = {
  render: Template,
};

export const Disabled: Story = {
  render: Template,

  args: {
    disabled: true,
  },
};

export const Checkbox: Story = {
  render: Template,

  args: {
    type: 'checkbox',
  },
};

export const CheckboxDisabled: Story = {
  render: Template,

  args: {
    disabled: true,
    type: 'checkbox',
  },
};
