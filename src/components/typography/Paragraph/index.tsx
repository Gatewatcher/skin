import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { CSSProperties } from 'react';
import { forwardRef } from 'react';

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
  };

type InternalParagraphProps = Spacings & {
  className?: string;
  style?: CSSProperties;
};

export const InternalParagraph = forwardRef<
  HTMLParagraphElement,
  ParagraphProps & InternalParagraphProps
>(
  (
    {
      alignment,
      children,
      className,
      currentColor,
      'data-testid': testId = 'paragraph',
      margin,
      maxLines,
      overflowWrap,
      padding,
      size = DEFAULT_SIZE,
      transform,
      type,
      weight = DEFAULT_WEIGHT,
      whiteSpace,
      wordBreak,
      ...rest
    },
    ref,
  ) => {
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
  },
);

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => <InternalParagraph ref={ref} {...props} />,
);

export default Paragraph;
