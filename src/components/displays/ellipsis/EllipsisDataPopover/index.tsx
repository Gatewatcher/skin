import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { memo } from 'react';

import { Stack } from '@/skin/layout';

import Popover from '../../floating/Popover';
import type { Children, EllipsisDataBaseProps } from '../EllipsisDataBase';
import EllipsisDataBase from '../EllipsisDataBase';
import BadgeCount from '../EllipsisDataBase/compounds/BadgeCount';

import styles from '../EllipsisDataBase/styles.module.scss';

export type EllipsisDataPopoverProps<T> = EllipsisDataBaseProps<T>;

const EllipsisDataPopover = <T,>({
  'data-testid': testId = 'ellipsis-data-popover',
  ...props
}: EllipsisDataPopoverProps<T>) => {
  const { children, triggerClassName } = props;

  return (
    <EllipsisDataBase
      {...props}
      floating={{
        content: ({ slicedData: { rest }, ellipsis }) => (
          <Stack
            direction={ellipsis?.direction}
            wrap="wrap"
            {...ellipsis?.containerProps}
          >
            {rest?.map(ellipsis.children || (children as Children<T>))}
          </Stack>
        ),
        wrapper: ({ children, content }) => (
          <Popover
            content={content}
            data-testid={testId}
            triggerClassName={classNames(styles.trigger, triggerClassName)}
          >
            {children}
          </Popover>
        ),
      }}
      data-testid={testId}
    />
  );
};

EllipsisDataPopover.BadgeCount = memo(BadgeCount);

export default EllipsisDataPopover;
