import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId, XOR } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { ElevationProps } from '@/hocs';
import { withElevation } from '@/hocs';
import { useThemeContext } from '@/skin/navigation/Theme';
import { Text } from '@/skin/typography';
import { getColor } from '@/utils';

import Icon from '../icons/Icon';
import type { IconName } from '../icons/types';
import { BADGE_ICONS, BADGE_TEXT_SIZES, DEFAULT_SIZE } from './constants';
import type { BadgeSize, BadgeType } from './types';

import styles from './styles.module.scss';

export type BadgeProps = XOR<
  { children: ReactNode },
  { icon: IconName | boolean }
> &
  DataTestId &
  ElevationProps & {
    isLoading?: boolean;
    loader?: ReactNode;
    size?: BadgeSize;
    type: BadgeType;
  };

const Badge = ({
  children,
  'data-testid': testId = 'badge',
  elevation,
  icon,
  isLoading,
  loader = '...',
  size = DEFAULT_SIZE,
  type,
}: BadgeProps) => {
  const { theme } = useThemeContext();
  const content = icon ? (
    <Icon
      name={icon === true ? BADGE_ICONS[type] : icon}
      size={size}
      currentColor
    />
  ) : (
    <Text
      data-testid={suffixTestId(testId, 'text')}
      size={BADGE_TEXT_SIZES[size]}
      type={type}
      whiteSpace="nowrap"
      currentColor
      overflowHidden
      textEllipsis
    >
      {children}
    </Text>
  );

  return withElevation(
    <span
      className={classNames(
        styles.Badge,
        stylesToCamelCase(styles, 'size', size),
        icon && styles.icon,
      )}
      style={{
        backgroundColor: getColor(type, {
          variant: theme === 'dark' ? 100 : 50,
        }),
        color: getColor(type, { variant: 700 }),
      }}
      data-testid={testId}
    >
      {isLoading ? loader : content}
    </span>,
    elevation,
  );
};

export default Badge;
