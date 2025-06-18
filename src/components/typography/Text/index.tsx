import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { CSSProperties } from 'react';
import { forwardRef } from 'react';

import type { Spacings } from '@/hocs';
import { withSpacing } from '@/hocs';
import { useThemeColor, useTypeColor } from '@/hooks';
import type { ThemeColor } from '@/types';

import { DEFAULT_SIZE, DEFAULT_WEIGHT } from '../constants';
import type { TypographyGenericProps, TypographyVariantsProps } from '../types';
import { getVariantClassNames } from '../utils';
import type { TEXT_TAGS } from './constants';
import { DEFAULT_TAG, DEFAULT_TEXT_DISPLAY } from './constants';
import type { TextDisplay } from './types';

import styles from './styles.module.scss';

export type TextTag = typeof TEXT_TAGS[number];

export type TextProps = TypographyGenericProps<TextTag> &
  TypographyVariantsProps & {
    color?: ThemeColor | 'transparent';
    display?: TextDisplay;
    italic?: boolean;
    underline?: boolean;
  } & Spacings;

export type InternalTextProps = {
  className?: string;
  style?: CSSProperties;
};

export const InternalText = forwardRef<
  HTMLElement,
  TextProps & InternalTextProps
>(
  (
    {
      alignment,
      as: Component = DEFAULT_TAG,
      children,
      className,
      currentColor,
      color: colorProps,
      'data-testid': testId = 'text',
      display = DEFAULT_TEXT_DISPLAY,
      italic,
      overflowHidden,
      overflowWrap,
      underline,
      size = DEFAULT_SIZE,
      style,
      type,
      textEllipsis,
      transform,
      weight = DEFAULT_WEIGHT,
      whiteSpace,
      wordBreak,
      ...rest
    },
    ref,
  ) => {
    const typeColor = useTypeColor({ type, currentColor });
    const themeColor = useThemeColor({ color: colorProps, currentColor });

    return withSpacing(
      <Component
        ref={ref}
        className={classNames(
          styles.Text,
          styles[Component],
          italic && styles.italic,
          overflowHidden && styles.overflowHidden,
          underline && styles.underline,
          textEllipsis && styles.textEllipsis,
          alignment && styles.alignment,
          getVariantClassNames({
            alignment,
            overflowWrap,
            size,
            transform,
            weight,
            whiteSpace,
            wordBreak,
          }),
          stylesToCamelCase(styles, 'display', display),
          className,
        )}
        data-testid={testId}
        style={{ color: themeColor || typeColor, ...style }}
        {...rest}
      >
        {children}
      </Component>,
      rest,
    );
  },
);

const Text = forwardRef<HTMLElement, TextProps>((props, ref) => (
  <InternalText ref={ref} {...props} />
));

export default Text;
