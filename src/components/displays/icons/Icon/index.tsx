import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ComponentType, SVGProps } from 'react';
import { useLayoutEffect, useState } from 'react';

import {
  ICON_DEFAULT_SIZE,
  ICON_SIZES_REM,
  TYPES_WITH_NEUTRAL,
} from '@/constants';
import type { IconName } from '@/skin/displays';
import { useThemeContext } from '@/skin/navigation/Theme';
import type { ColorsWithNeutral, IconSize, Type } from '@/types';
import { getColor } from '@/utils';

import { DEFAULT_CURRENT_COLOR } from '../constants';

import styles from './styles.module.scss';

const componentCache = new Map<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
>();

export type IconProps = DataTestId & {
  className?: string;
  color?: ColorsWithNeutral;
  currentColor?: boolean;
  name: IconName;
  size?: IconSize;
};

const Icon = ({
  className,
  color,
  currentColor = DEFAULT_CURRENT_COLOR,
  'data-testid': testId = 'icon',
  name,
  size = ICON_DEFAULT_SIZE,
}: IconProps) => {
  const [Component, setComponent] = useState<
    ComponentType<SVGProps<SVGSVGElement>> | null | undefined
  >(null);

  const remSize = ICON_SIZES_REM[size];
  const iconContainerStyle = {
    height: remSize,
    width: remSize,
  };

  useLayoutEffect(() => {
    if (componentCache.has(name)) {
      setComponent(componentCache.get(name));
      return;
    }

    import(`./../../../../icons/${name}.tsx`).then(importedComponent => {
      const Component = importedComponent.default;
      componentCache.set(name, Component);
      setComponent(Component);
    });
  }, [name]);

  const { theme } = useThemeContext();
  const isType = TYPES_WITH_NEUTRAL.includes(color as Type);

  return (
    <span
      key={name}
      className={classNames(styles.Icon, styles.container, className)}
      data-testid={testId}
      style={iconContainerStyle}
    >
      {Component && (
        <Component
          className={classNames(
            styles.Icon,
            !color && !currentColor && styles.color,
          )}
          color={getColor(color, {
            currentColor,
            ...(theme === 'dark' && isType && { variant: 100 }),
          })}
          data-testid={suffixTestId('icon', name)}
          height={remSize}
          role="img"
          width={remSize}
        />
      )}
    </span>
  );
};

export default Icon;
