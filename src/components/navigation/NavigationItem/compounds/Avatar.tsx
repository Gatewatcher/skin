import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { RequiredOnly } from '@gatewatcher/bistoury/utils-types';

import type { AvatarProps } from '@/skin/displays';
import { Avatar } from '@/skin/displays';

import styles from '../styles.module.scss';

export type NavigationItemAvatarProps = RequiredOnly<AvatarProps, 'username'>;

const NavigationItemAvatar = ({
  'data-testid': testId = 'navigation-item-avatar',
  username,
  ...rest
}: NavigationItemAvatarProps) => {
  return (
    <span className={classNames(styles.Trigger)} data-testid={testId}>
      <Avatar {...rest} size="large" username={username} withTooltip={false} />
    </span>
  );
};

export default NavigationItemAvatar;
