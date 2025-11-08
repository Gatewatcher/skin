import { isFunction, isString } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { MouseEvent, Ref } from 'react';

import { withElevation } from '@/hocs';
import { ButtonClose } from '@/skin/actions';
import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import {
  TOAST_ICONS,
  TOAST_ICONS_BY_ICONS,
  TOAST_TYPES_BY_FUNCTIONS,
} from '../constants';
import type {
  Toast as ToastProps,
  ToastTypeAsFunction,
  ToastTypeAsIcon,
} from '../types';

import styles from '../styles.module.scss';

type ToastInternalProps = {
  onRemove: (e: MouseEvent, id: ToastProps['id']) => void;
  ref?: Ref<HTMLDivElement>;
};

const Toast = ({
  content,
  'data-testid': testId,
  id,
  onRemove,
  ref,
  title,
  type,
}: ToastProps & ToastInternalProps) => {
  return withElevation(
    <div
      ref={ref}
      className={styles.Toast}
      data-testid={testId || (type ? suffixTestId('toast', type) : 'toast')}
    >
      <Stack
        alignItems="flex-start"
        gap={2}
        justifyContent="space-between"
        margin={{ bottom: 2 }}
      >
        <Stack alignItems="center" gap={6}>
          {type && (
            <>
              {isFunction(TOAST_ICONS[type]) ? (
                TOAST_TYPES_BY_FUNCTIONS[type as ToastTypeAsFunction]()
              ) : (
                <Icon
                  color={type as ToastTypeAsIcon}
                  name={TOAST_ICONS_BY_ICONS[type as ToastTypeAsIcon]}
                />
              )}
            </>
          )}
          <Text>{title}</Text>
        </Stack>

        <ButtonClose data-testid="close" onClick={ev => onRemove(ev, id)} />
      </Stack>

      {isString(content) ? <Text size="small">{content}</Text> : <>{content}</>}
    </div>,
    1,
  );
};

export default Toast;
