import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { withStopPropagation } from 'hocs/withStopPropagation';
import { animated } from 'react-spring';

import { ICON_SIZES_REM } from '@/constants';
import { Icon, Tooltip } from '@/skin/displays';

import type { TransitionConfig } from './hooks';
import { useIconTransition } from './hooks';

import styles from './styles.module.scss';

export type AnimatedCheckProps = DataTestId &
  TransitionConfig & {
    alwaysVisible?: boolean;
    clipTextPreview?: string;
    displayClipTextPreview?: boolean;
    isSuccess: boolean;
    onClick?: () => void;
    show: boolean;
    tooltip?: string;
  };

export function AnimatedCopyIcon({
  alwaysVisible,
  clipTextPreview,
  displayClipTextPreview,
  'data-testid': testId = '',
  isSuccess,
  onClick,
  property,
  show,
  size,
  tooltip,
  transitionSpeed,
}: AnimatedCheckProps) {
  const transition = useIconTransition({
    property,
    show,
    size,
    transitionSpeed,
  });

  const icon = (
    <Icon
      data-testid={isSuccess ? 'success-icon' : 'copy-icon'}
      name={isSuccess ? 'Check' : 'Copy'}
      size={size}
      currentColor
    />
  );

  const content = tooltip ? (
    <Tooltip
      content={
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>{tooltip}</div>
          {displayClipTextPreview && (
            <em
              className={classNames([styles.tooltipPreview, styles.truncate])}
            >
              {clipTextPreview}
            </em>
          )}
        </div>
      }
      safePolygon={false}
      triggerOn="hover"
      withStopPropagation={false}
    >
      {icon}
    </Tooltip>
  ) : (
    icon
  );

  if (alwaysVisible) {
    return withStopPropagation(
      <span
        style={{
          [property]: ICON_SIZES_REM[size],
          ...(property === 'width' && {
            marginLeft: 'var(--spacing-4)',
          }),
        }}
        className={styles.icon}
        data-testid={testId}
        onClick={onClick}
      >
        {content}
      </span>,
    );
  }

  return transition((style, item) => {
    return (
      item &&
      withStopPropagation(
        <animated.span
          className={styles.icon}
          data-testid={testId}
          onClick={onClick}
          style={style}
        >
          {content}
        </animated.span>,
      )
    );
  });
}
