import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { Modify } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Text } from '@/skin/typography';

import type { FloatingProps } from '../Floating';
import Floating from '../Floating';
import { DEFAULT_SIZE } from '../Floating/constants';
import type { FloatingSize } from '../Floating/types';
import { getSizeClassName } from '../Floating/utils';

import styles from './styles.module.scss';

export type TooltipProps = Modify<FloatingProps, { content: ReactNode }> & {
  size?: FloatingSize;
};

const Tooltip = ({
  children,
  content: contentProps,
  size = DEFAULT_SIZE,
  ...rest
}: TooltipProps) => {
  const content = isString(contentProps) ? (
    <Text size="small" weight="medium" currentColor>
      {contentProps}
    </Text>
  ) : (
    contentProps
  );

  return (
    <Floating
      arrowClassName={styles.arrow}
      className={classNames(styles.Tooltip, getSizeClassName(size))}
      content={content}
      padding={4}
      role="tooltip"
      type="tooltip"
      {...rest}
    >
      {children}
    </Floating>
  );
};

export default Tooltip;
