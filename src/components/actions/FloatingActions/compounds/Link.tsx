import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { LinkProps } from '@/skin/actions';
import { LinkIcon } from '@/skin/actions';

import Tooltip from '../../../displays/floating/Tooltip';
import type { IconName } from '../../../displays/icons/types';

import styles from '../styles.module.scss';

export type FloatingActionsActionProps = DataTestId &
  Pick<LinkProps, 'to'> & {
    icon?: IconName;
    label?: ReactNode;
  };

const Link = ({
  'data-testid': testId = 'floating-actions-link',
  icon = 'ExternalLink',
  label,
  to,
}: FloatingActionsActionProps) => {
  return (
    <Tooltip
      content={label}
      data-testid={testId}
      isDisabled={!label}
      triggerClassName={styles.Link}
    >
      <LinkIcon
        data-testid={testId}
        icon={icon}
        size="small"
        to={to}
        variant="secondary"
      />
    </Tooltip>
  );
};

export default Link;
