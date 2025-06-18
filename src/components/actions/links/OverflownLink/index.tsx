import { useRef } from 'react';

import type { UseIsOverflownOptions } from '@/hooks';
import { useIsOverflown } from '@/hooks';
import type { TooltipProps } from '@/skin/displays';
import { Tooltip } from '@/skin/displays';

import type { LinkProps } from '../Link';
import Link from '../Link';

import styles from './styles.module.scss';

export type OverflownLinkProps = UseIsOverflownOptions &
  Pick<TooltipProps, 'placement'> &
  LinkProps & {
    isDisabled?: boolean;
  };

const OverflownLink = ({
  children,
  'data-testid': testId = 'overflown-link',
  isDisabled,
  placement,
  withWatchScreenResize,
  ...rest
}: OverflownLinkProps) => {
  const ref = useRef(null);

  const isOverflown = useIsOverflown(ref, {
    ...(withWatchScreenResize && { withWatchScreenResize }),
  });

  return (
    <Tooltip
      content={children}
      data-testid={testId}
      isDisabled={isDisabled || !isOverflown}
      placement={placement}
      triggerClassName={styles.OverflownLink}
    >
      <Link ref={ref} data-testid={testId} {...rest}>
        {children}
      </Link>
    </Tooltip>
  );
};

export default OverflownLink;
