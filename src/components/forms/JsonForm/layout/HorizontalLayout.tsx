import type { LayoutProps, RankedTester } from '@jsonforms/core';
import { isLayout, rankWith, uiTypeIs } from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';

import { Stack } from '@/skin/layout';

const HorizontalLayout = ({
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
      data-testid="jsonform-horizontal-layout-control"
      direction={direction}
      gap={10}
      wrap="wrap"
    >
      {uischema.elements.map((child, index) => (
        <Stack.Item key={`${path}-${index}`} flexGrow={1}>
          <JsonFormsDispatch
            path={path}
            renderers={renderers}
            schema={schema}
            uischema={child}
          />
        </Stack.Item>
      ))}
    </Stack>
  );
};

const HorizontalLayoutRenderer = withJsonFormsLayoutProps(HorizontalLayout);

export const horizontalLayoutRendererTester: RankedTester = rankWith(
  1,
  uiTypeIs('HorizontalLayout'),
);

export default HorizontalLayoutRenderer;
