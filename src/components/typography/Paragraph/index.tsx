import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { CSSProperties, Ref } from 'react';

import type { Spacings } from '@/hocs';
import { withSpacing } from '@/hocs';
import { useTypeColor } from '@/hooks';

import { DEFAULT_SIZE, DEFAULT_WEIGHT } from '../constants';
import type { TypographyProps, TypographyVariantsProps } from '../types';
import { getVariantClassNames } from '../utils';

import styles from './styles.module.scss';

export type ParagraphProps = TypographyProps &
  TypographyVariantsProps & {
    maxLines?: number;
    ref?: Ref<HTMLParagraphElement>;
  };

type InternalParagraphProps = Spacings & {
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLParagraphElement>;
};

export const InternalParagraph = ({
  alignment,
  children,
  className,
  currentColor,
  'data-testid': testId = 'paragraph',
  margin,
  maxLines,
  overflowWrap,
  padding,
  ref,
  size = DEFAULT_SIZE,
  transform,
  type,
  weight = DEFAULT_WEIGHT,
  whiteSpace,
  wordBreak,
  ...rest
}: ParagraphProps & InternalParagraphProps) => {
  const color = useTypeColor({ type, currentColor });

  return withSpacing(
    <p
      ref={ref}
      className={classNames(
        styles.Paragraph,
        maxLines && styles.maxLines,
        getVariantClassNames({
          alignment,
          overflowWrap,
          size,
          transform,
          weight,
          whiteSpace,
          wordBreak,
        }),
        className,
      )}
      style={{
        color,
        ...(maxLines && {
          lineClamp: maxLines,
          WebkitLineClamp: maxLines,
        }),
      }}
      data-testid={testId}
      {...rest}
    >
      {children}
    </p>,
    { margin, padding },
  );
};

const Paragraph = (props: ParagraphProps) => <InternalParagraph {...props} />;

export default Paragraph;
