import { classNames } from '@gatewatcher/bistoury/utils-dom';

import { useTypeColor } from '@/hooks';

import type { TypographyGenericProps, TypographyVariantsProps } from '../types';
import { getVariantClassNames } from '../utils';
import type { HEADING_TAGS } from './constants';
import { DEFAULT_TAG } from './constants';

import styles from './styles.module.scss';

export type HeadingTag = typeof HEADING_TAGS[number];

export type TitleProps = TypographyGenericProps<HeadingTag> &
  Pick<
    TypographyVariantsProps,
    'alignment' | 'overflowWrap' | 'transform' | 'whiteSpace' | 'wordBreak'
  >;

const Title = ({
  alignment,
  as: Component = DEFAULT_TAG,
  children,
  currentColor,
  'data-testid': testId = 'title',
  overflowHidden,
  overflowWrap,
  textEllipsis,
  transform,
  type,
  whiteSpace,
  wordBreak,
  ...rest
}: TitleProps) => {
  const color = useTypeColor({ type, currentColor });

  return (
    <Component
      className={classNames(
        styles.Title,
        styles[Component],
        overflowHidden && styles.overflowHidden,
        textEllipsis && styles.textEllipsis,
        getVariantClassNames({
          alignment,
          overflowWrap,
          transform,
          whiteSpace,
          wordBreak,
        }),
      )}
      data-testid={testId}
      style={{ color }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Title;
