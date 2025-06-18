import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isDefined } from '@gatewatcher/bistoury/utils-lang';

import type { DropdownProps } from '@/skin/displays';
import { Dropdown } from '@/skin/displays';

import NavigationItemAvatar from './compounds/Avatar';
import NavigationItemAvatarButton from './compounds/AvatarButton';
import NavigationItemAvatarLink from './compounds/AvatarLink';
import Grid from './compounds/Grid';
import Group from './compounds/Group';
import Header from './compounds/Header';
import Link from './compounds/Link';
import Links from './compounds/Links';
import Trigger from './compounds/Trigger';

import styles from './styles.module.scss';

export type NavigationItemProps = Pick<
  DropdownProps,
  | 'data-testid'
  | 'onOpen'
  | 'onClose'
  | 'children'
  | 'content'
  | 'placement'
  | 'padding'
>;

const NavigationItem = ({
  children,
  placement = 'bottom',
  'data-testid': testId = 'navigation-item',
  padding,
  ...rest
}: NavigationItemProps) => {
  return (
    <Dropdown
      className={classNames(
        styles.NavigationItem,
        isDefined(padding) && styles.NavigationItemResetPadding,
      )}
      data-testid={testId}
      maxHeight="fit"
      minWidth="fit"
      padding={padding}
      placement={placement}
      strategy="fixed"
      triggerOn={['click', 'focus']}
      withBorder={false}
      {...rest}
    >
      {children}
    </Dropdown>
  );
};

NavigationItem.Avatar = NavigationItemAvatar;
NavigationItem.AvatarDropdown = NavigationItem.AvatarDropdownLink =
  NavigationItemAvatarLink;
NavigationItem.AvatarDropdownButton = NavigationItemAvatarButton;
NavigationItem.Grid = Grid;
NavigationItem.Group = Group;
NavigationItem.Header = Header;
NavigationItem.Links = Links;
NavigationItem.Link = Link;
NavigationItem.Trigger = Trigger;

export default NavigationItem;
