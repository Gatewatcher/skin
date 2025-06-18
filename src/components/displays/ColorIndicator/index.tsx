import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { useThemeContrastedColors } from 'hooks/colors';

import { DEFAULT_SIZE } from './constants';
import type { ColorIndicatorColor, ColorIndicatorSize } from './types';

import styles from './styles.module.scss';

export type ColorIndicatorProps = DataTestId & {
  color: ColorIndicatorColor;
  size?: ColorIndicatorSize;
};

const ColorIndicator = ({
  color,
  'data-testid': testId = 'color-indicator',
  size = DEFAULT_SIZE,
}: ColorIndicatorProps) => {
  const style = useThemeContrastedColors({ color, withAlpha: false });

  return (
    <div
      className={classNames(
        styles.ColorIndicator,
        stylesToCamelCase(styles, 'size', size),
      )}
      data-testid={testId}
      style={style}
    />
  );
};

export default ColorIndicator;
