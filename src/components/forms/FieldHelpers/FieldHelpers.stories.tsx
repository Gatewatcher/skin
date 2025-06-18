import type { Meta } from '@storybook/react';

import FieldHelpers from '.';

export default {
  title: 'forms/FieldHelpers',
  component: FieldHelpers,
} as Meta<typeof FieldHelpers>;

export const Default = {
  args: {
    errors: ['Erreur 1', 'Erreur 2'],
    helpers: ['Helper 1', 'Helper 2'],
    warnings: ['Warning 1', 'Warning 2'],
  },
};
