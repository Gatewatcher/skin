import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Icon } from '@/skin/displays';
import { useThemeContext } from '@/skin/navigation/Theme';
import { getColor } from '@/utils';

import { DEFAULT_SIZE, DEFAULT_VARIANT, HINT_ICONS } from './constants';
import type { HintSize, HintVariant } from './types';

import styles from './styles.module.scss';

export type HintProps = DataTestId & {
  children: ReactNode | ReactNode[];
  variant?: HintVariant;
  joinOperator?: string;
  size?: HintSize;
};

const Hint = ({
  children,
  'data-testid': testId = 'Hint',
  variant = DEFAULT_VARIANT,
  joinOperator = '\n',
  size = DEFAULT_SIZE,
}: HintProps) => {
  const { theme } = useThemeContext();

  const hints: ReactNode[] = Array.isArray(children)
    ? children.filter(child => child)
    : [children];
  if (!hints.length) {
    return <></>;
  }

  return (
    <div
      className={classNames(
        styles.Hint,
        stylesToCamelCase(styles, 'variant', variant),
        stylesToCamelCase(styles, 'size', size),
      )}
      style={{
        color: getColor(variant, { variant: theme === 'light' ? 600 : 400 }),
      }}
      data-testid={testId}
    >
      <Icon
        className={styles.icon}
        name={HINT_ICONS[variant]}
        size="small"
        currentColor
      />
      {hints?.join(joinOperator)}
    </div>
  );
};

export default Hint;
