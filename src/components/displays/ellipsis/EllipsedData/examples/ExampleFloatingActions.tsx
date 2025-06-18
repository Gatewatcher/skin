import type { ReactNode } from 'react';

import FloatingActions from '@/skin/actions/FloatingActions';

type ExampleFloatingActionsProps = {
  children: ReactNode;
  header?: ReactNode;
};

export const ExampleFloatingActions = ({
  children,
  header,
}: ExampleFloatingActionsProps) => {
  return (
    <FloatingActions
      content={
        <FloatingActions.Content>
          {header}
          <FloatingActions.Actions>
            <FloatingActions.Button icon="Edit" label="Edit" />
            <FloatingActions.Button
              icon="Delete"
              label="Delete"
              type="danger"
            />
            <FloatingActions.CopyToClipboard clipText="Lorem ipsum" />
          </FloatingActions.Actions>
        </FloatingActions.Content>
      }
      placement="top-start"
    >
      {children}
    </FloatingActions>
  );
};
