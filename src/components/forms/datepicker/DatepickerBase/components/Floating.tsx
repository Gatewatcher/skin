import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';

import type { DropdownProps } from '@/skin/displays';
import { Dropdown } from '@/skin/displays';

import type { FloatingProps } from '../../DatepickerBase/';

export type DatepickerFloating = DataTestId &
  Pick<DropdownProps, 'content'> &
  Omit<FloatingProps, 'trigger'> & {
    children?: ReactElement;
  };

const Floating = ({
  children,
  content,
  'data-testid': testId = 'datepicker-floating',
  ...rest
}: DatepickerFloating) => {
  return (
    <Dropdown
      content={content}
      data-testid={testId}
      maxHeight="fit"
      padding={9}
      placement="bottom-start"
      {...rest}
    >
      <>{children}</>
    </Dropdown>
  );
};

export default Floating;
