import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { RequiredOnly } from '@gatewatcher/bistoury/utils-types';

import type { AvatarProps, AvatarUsernameProps } from '@/skin/displays';
import { Avatar, AvatarUsername } from '@/skin/displays';

import { useSidenavContext } from '../context';

import styles from '../styles.module.scss';

export type SideNavAvatarProps = RequiredOnly<
  AvatarProps | AvatarUsernameProps,
  'username'
>;

const SideNavAvatar = ({
  'data-testid': testId = 'side-nav-avatar',
  username,
  ...rest
}: SideNavAvatarProps) => {
  const { isOpened } = useSidenavContext();
  const sharedProps = {
    'data-testid': testId,
  };

  return (
    <span className={classNames(styles.Link, !isOpened && styles.LinkClosed)}>
      <span
        className={classNames(
          styles.LinkNav,
          !isOpened && styles.LinkNavClosed,
        )}
        {...sharedProps}
      >
        {!isOpened ? (
          <Avatar
            {...rest}
            size="medium"
            username={username}
            withTooltip={false}
          />
        ) : (
          <AvatarUsername {...rest} size="medium" username={username} />
        )}
      </span>
    </span>
  );
};

export default SideNavAvatar;
