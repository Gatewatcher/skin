import type { LayoutProps, RankedTester } from '@jsonforms/core';
import { isLabeled, isLayout, rankWith, uiTypeIs } from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';

import { Section } from '@/skin/displays';
import { Stack } from '@/skin/layout';

const GroupLayout = ({
  path,
  renderers,
  schema,
  uischema,
  visible,
}: LayoutProps) => {
  if (!visible || !isLayout(uischema)) return;

  const children = (
    <Stack alignItems="stretch" direction="column" gap={6} wrap="wrap">
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

  return (
    <Section
      data-testid="jsonform-group-control"
      variant={uischema.options?.variant}
    >
      {isLabeled(uischema) && <Section.Title>{uischema.label}</Section.Title>}
      {isLabeled(uischema) ? <Section.Body>{children}</Section.Body> : children}
    </Section>
  );
};

const GroupLayoutRenderer = withJsonFormsLayoutProps(GroupLayout);
export const groupLayoutTester: RankedTester = rankWith(1, uiTypeIs('Group'));

export default GroupLayoutRenderer;
