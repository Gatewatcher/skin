import { isFunction } from '@gatewatcher/bistoury/utils-lang';

import { useThemeContext } from '@/skin/navigation/Theme';
import type { Theme } from '@/skin/navigation/Theme';
import type { ColorsScale } from '@/types';
import { getColor } from '@/utils';

import type { TextProps } from '../Text';
import { InternalText } from '../Text';
import { DEFAULT_VARIANT } from './constants';

export type NeutralTextProps = Omit<TextProps, 'color' | 'type'> & {
  variant?: ColorsScale | ((theme: Theme) => ColorsScale);
};

const NeutralText = ({
  currentColor,
  'data-testid': testId = 'neutral-text',
  variant = DEFAULT_VARIANT,
  ...props
}: NeutralTextProps) => {
  const { theme } = useThemeContext();
  const color = getColor('neutral', {
    currentColor,
    variant: isFunction(variant) ? variant(theme) : variant,
  });

  return (
    <InternalText
      currentColor={currentColor}
      data-testid={testId}
      style={{ color }}
      {...props}
    />
  );
};

export default NeutralText;
