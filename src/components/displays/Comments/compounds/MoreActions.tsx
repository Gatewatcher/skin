import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { ButtonIcon } from '@/skin/actions';

import Dropdown from '../../floating/Dropdown';

export type CommentsMoreActionsProps = DataTestId & {
  actions: ReactNode;
};

const MoreActions = ({
  actions,
  'data-testid': testId = 'comments-more-actions',
}: CommentsMoreActionsProps) => {
  return (
    <Dropdown
      content={actions}
      data-testid={testId}
      placement="bottom-end"
      triggerOn="click"
    >
      <ButtonIcon
        icon="OverflowMenuVertical"
        size="small"
        type="neutral"
        variant="ghosted"
      />
    </Dropdown>
  );
};

export default MoreActions;
