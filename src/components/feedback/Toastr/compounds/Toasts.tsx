import { clamp, isDefined } from '@gatewatcher/bistoury/utils-lang';
import type { MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { animated, useTransition } from 'react-spring';

import { ANIMATION_SHARED_CONFIG, MAX_SPACING } from '@/constants';
import { Stack } from '@/skin/layout';

import type { ToastrProps } from '..';
import { DEFAULT_OFFSET, DEFAULT_POSITION } from '../constants';
import { useToastrContext } from '../context';
import type { Toast as ToastProps } from '../types';
import Toast from './Toast';

import styles from '../styles.module.scss';

export type ToastsProps = Pick<ToastrProps, 'offset' | 'position'>;

const Toasts = ({
  offset = DEFAULT_OFFSET,
  position = DEFAULT_POSITION,
}: ToastsProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const { setToastRef } = useToastrContext();

  const cancelMap = useMemo(() => new Map(), []);
  const refMap = useMemo(() => new Map(), []);

  setToastRef.current = setToasts;

  const removeToast = useCallback((toast: ToastProps) => {
    setToasts(prev => prev.filter(t => t.id !== toast.id));
  }, []);

  const transitions = useTransition(toasts, {
    from: { opacity: 0, height: 0 },
    keys: item => item.id,
    enter: item => async (next, cancel) => {
      cancelMap.set(item.id, cancel);

      await next({
        opacity: 1,
        height: refMap.get(item.id).offsetHeight,
      });

      if (toastHasLifetime(item)) {
        setTimeout(() => {
          item.onDurationEnd?.();
          removeToast(item);
        }, item.duration);
      }
    },
    leave: (item: ToastProps) => async next => {
      cancelMap.delete(item.id);
      refMap.delete(item.id);
      !item.onDurationEnd && item.onClose?.();
      await next({ opacity: 0, config: { duration: 150 } });
      await next({ height: 0, config: { duration: 150 } });
    },
    config: ANIMATION_SHARED_CONFIG,
  });

  const handleRemove = (ev: MouseEvent, item: ToastProps) => {
    ev.stopPropagation();
    removeToast(item);
  };

  const isTop = position.startsWith('top');

  const xProperty = position.split('-')[0];
  const yProperty = position.split('-')[1];

  return (
    <Stack
      style={{
        [xProperty]: `var(--spacing-${clamp(offset.x, 0, MAX_SPACING)})`,
        [yProperty]: `var(--spacing-${clamp(offset.y, 0, MAX_SPACING)})`,
      }}
      as="ul"
      className={styles.Toasts}
      data-testid="toasts"
      direction={isTop ? 'column-reverse' : 'column'}
      gap={4}
      margin={0}
      padding={0}
    >
      {transitions(({ ...styles }, item) => (
        <animated.li key={item.id} style={styles}>
          <Toast
            ref={ref => ref && refMap.set(item.id, ref)}
            onRemove={ev => handleRemove(ev, item)}
            {...item}
          />
        </animated.li>
      ))}
    </Stack>
  );
};

const toastHasLifetime = (toast: ToastProps) => {
  return (
    isDefined(toast.duration) &&
    toast.duration >= 0 &&
    toast.duration < Infinity
  );
};

export default Toasts;
