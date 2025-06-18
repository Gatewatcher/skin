import { animated } from 'react-spring';

import { Icon } from '@/skin/displays';

import type { ButtonCopyToClipboardProps } from './';
import { useIconTransition } from './hooks';

import styles from './styles.module.scss';

export type AnimatedCheckProps = {
  isSuccess: boolean;
  size: NonNullable<ButtonCopyToClipboardProps['size']>;
} & Pick<ButtonCopyToClipboardProps, 'endIcon'>;

export function AnimatedCheck({
  isSuccess,
  size,
  endIcon,
}: AnimatedCheckProps) {
  const transition = useIconTransition({
    isSuccess,
    size,
    endIcon,
  });

  return transition(
    (style, item) =>
      item && (
        <animated.span
          className={styles.animatedIcon}
          data-testid="success-icon"
          style={style}
        >
          <Icon name="Check" currentColor />
        </animated.span>
      ),
  );
}
