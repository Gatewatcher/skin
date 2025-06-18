import type { LayoutProps, RankedTester } from '@jsonforms/core';
import { isLayout, rankWith, uiTypeIs } from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';

import { Stack } from '@/skin/layout';

const VerticalLayout = ({
  direction,
  path,
  renderers,
  schema,
  uischema,
  visible,
}: LayoutProps) => {
  if (!visible || !isLayout(uischema)) return;

  return (
    <Stack
      alignItems="stretch"
      data-testid="jsonform-vertical-layout-control"
      direction={direction}
      gap={6}
    >
      {uischema.elements.map((child, index) => (
        <JsonFormsDispatch
          key={`${path}-${index}`}
          path={path}
          renderers={renderers}
          schema={schema}
          uischema={child}
        />
      ))}
    </Stack>
  );
};

const VerticalLayoutRenderer = withJsonFormsLayoutProps(VerticalLayout);

export const verticalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs('VerticalLayout'),
);

export default VerticalLayoutRenderer;
