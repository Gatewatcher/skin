import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';

import { ANIMATION_SHARED_CONFIG } from '@/constants';
import { InternalButtonClose } from '@/skin/actions/buttons/ButtonClose';
import { Icon } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { useThemeContext } from '@/skin/navigation/Theme';
import { InternalParagraph } from '@/skin/typography/Paragraph';
import { getColor } from '@/utils';

import Title from './compounds/Title';
import {
  DEFAULT_VARIANT,
  DEFAULT_WITH_CLOSE,
  DEFAULT_WITH_ICON,
  HELPER_ICONS,
} from './constants';
import type { HelperVariant } from './types';

import styles from './styles.module.scss';

export type HelperProps = DataTestId & {
  children: ReactNode;
  onClose?: () => void;
  withClose?: boolean;
  withIcon?: boolean;
  variant?: HelperVariant;
};

const Helper = ({
  children,
  'data-testid': testId = 'helper',
  onClose,
  variant = DEFAULT_VARIANT,
  withClose = DEFAULT_WITH_CLOSE,
  withIcon = DEFAULT_WITH_ICON,
}: HelperProps) => {
  const { theme } = useThemeContext();
  const [isOpened, setIsOpened] = useState(true);
  const transition = useTransition(isOpened, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: ANIMATION_SHARED_CONFIG,
  });

  const handleClose = () => {
    setIsOpened(!isOpened);
    onClose?.();
  };

  return transition(
    (transitionStyles, item) =>
      item && (
        <animated.div
          style={{
            backgroundColor: getColor(variant, {
              variant: theme === 'dark' ? 100 : 50,
            }),
            color: getColor(variant, { variant: 700 }),
            ...transitionStyles,
          }}
          className={styles.Helper}
          data-testid={testId}
        >
          {withIcon && (
            <Icon
              className={styles.icon}
              data-testid="info"
              name={HELPER_ICONS[variant]}
              currentColor
            />
          )}
          <Stack.Item flexGrow={1}>
            {isString(children) ? (
              <InternalParagraph margin={0} currentColor>
                {children}
              </InternalParagraph>
            ) : (
              children
            )}
          </Stack.Item>
          {withClose && (
            <InternalButtonClose
              className={styles.close}
              data-testid="close"
              onClick={handleClose}
            />
          )}
        </animated.div>
      ),
  );
};

Helper.Title = Title;

export default Helper;
