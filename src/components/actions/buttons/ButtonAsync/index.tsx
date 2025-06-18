import type { MouseEvent } from 'react';
import { animated, useTransition } from 'react-spring';

import { ICON_SIZES_REM } from '@/constants';
import { ANIMATION_SHARED_CONFIG } from '@/constants';
import { CircularLoader } from '@/skin/feedback';

import type { ButtonProps } from '../Button';
import Button from '../Button';
import { DEFAULT_SIZE } from '../Button/constants';

import styles from './styles.module.scss';

export type ButtonAsyncProps = ButtonProps & {
  isLoading?: boolean;
};

const ButtonAsync = ({
  children,
  'data-testid': testId = 'button-async',
  disabled,
  isLoading,
  onClick,
  size = DEFAULT_SIZE,
  startIcon,
  ...rest
}: ButtonAsyncProps) => {
  const handleClick = async (ev: MouseEvent<HTMLButtonElement>) => {
    if (!isLoading) {
      onClick?.(ev);
    }
  };

  const transition = useTransition(isLoading, {
    ...(!startIcon && {
      from: { width: '0', marginRight: '0', opacity: 0 },
      enter: {
        width: ICON_SIZES_REM[size],
        marginRight: 'var(--spacing-4)',
        opacity: 1,
      },
      leave: { width: '0', marginRight: '0', opacity: 0 },
    }),
    config: ANIMATION_SHARED_CONFIG,
  });

  return (
    <Button
      startElement={transition(
        (style, item) =>
          item && (
            <animated.div className={styles.isLoading} style={style}>
              <CircularLoader withBackgroundCircle={false} currentColor />
            </animated.div>
          ),
      )}
      data-testid={testId}
      disabled={disabled ?? isLoading}
      onClick={handleClick}
      size={size}
      startIcon={!isLoading ? startIcon : undefined}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonAsync;
