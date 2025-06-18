import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { CSSProperties } from 'react';

import { useThemeContext } from '@/skin/navigation/Theme';
import type { Theme } from '@/skin/navigation/Theme';

import type { ChipBaseProps } from '../ChipBase';
import ChipBase from '../ChipBase';

export type ChipCustomProps = ChipBaseProps & {
  backgroundColor?: string | ((theme: Theme) => string);
  color?: string | ((theme: Theme) => string);
};

const ChipCustom = ({ backgroundColor, color, ...rest }: ChipCustomProps) => {
  const { theme } = useThemeContext();

  const style: CSSProperties = {
    backgroundColor: isFunction(backgroundColor)
      ? backgroundColor(theme)
      : backgroundColor,
    color: isFunction(color) ? color(theme) : color,
  };

  return <ChipBase style={style} {...rest} />;
};

export default ChipCustom;
