import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type {
  DataTestId,
  RequiredAtLeastOne,
} from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { IconName, IconProps as SkinIconProps } from '@/skin/displays';
import { Icon as SkinIcon } from '@/skin/displays';
import type { TextProps } from '@/skin/typography';
import { InternalText } from '@/skin/typography/Text';
import { DEFAULT_SIZE } from '@/skin/typography/constants';

import { ICON_SIZES } from './constants';

import styles from './styles.module.scss';

export type TextIconBaseProps = DataTestId &
  Pick<TextProps, 'size' | 'type' | 'whiteSpace'> &
  Pick<SkinIconProps, 'currentColor' | 'className'> & {
    asFragment?: boolean;
    children: ReactNode;
    endIcon?: IconName;
    endIconClassName?: string;
    iconSize?: SkinIconProps['size'];
    startIcon?: IconName;
    startIconClassName?: string;
  };

export type TextIconProps = RequiredAtLeastOne<
  TextIconBaseProps,
  'startIcon' | 'endIcon'
>;

type IconProps = Pick<TextIconProps, 'currentColor' | 'className'> & {
  icon: IconName;
  position: 'start' | 'end';
  size?: TextIconProps['iconSize'];
};

const Icon = ({ icon, position, className, ...rest }: IconProps) => (
  <SkinIcon
    className={classNames(
      stylesToCamelCase(styles, 'icon', position),
      className,
    )}
    name={icon}
    {...rest}
  />
);

const TextIcon = ({
  asFragment,
  children,
  currentColor: currentColorProps,
  'data-testid': testId = 'text-icon',
  endIcon,
  endIconClassName,
  iconSize,
  size = DEFAULT_SIZE,
  startIcon,
  startIconClassName,
  type,
  whiteSpace,
}: TextIconProps) => {
  const currentColor = currentColorProps ?? !!type;

  const content = (
    <>
      {startIcon && (
        <Icon
          className={startIconClassName}
          currentColor={currentColor}
          icon={startIcon}
          position="start"
          size={iconSize || ICON_SIZES[size]}
        />
      )}
      {children}
      {endIcon && (
        <Icon
          className={endIconClassName}
          currentColor={currentColor}
          icon={endIcon}
          position="end"
          size={iconSize || ICON_SIZES[size]}
        />
      )}
    </>
  );

  return asFragment ? (
    content
  ) : (
    <InternalText
      className={styles.TextIcon}
      data-testid={testId}
      size={size}
      type={type}
      whiteSpace={whiteSpace}
    >
      {content}
    </InternalText>
  );
};

export default TextIcon;
