import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ChangeEvent } from 'react';

import type { InputSharedProps } from '@/skin/forms';
import InputBaseLabel from '@/skin/forms/inputs/InputBaseLabel';
import { Grid } from '@/skin/layout';

import ColorChoice from './components/ColorChoice';
import { COLOR_PALETTE_THEME_COLORS } from './constants';
import type { PickableColor } from './types';

import styles from './styles.module.scss';

export type ColorPaletteProps = DataTestId &
  Omit<InputSharedProps, 'value'> & {
    onColorChange?: (color: PickableColor | undefined) => void;
    value?: PickableColor;
  };

const ColorPalette = ({
  'data-testid': testId = 'input-color-palette',
  onChange,
  onColorChange,
  value,
  ...rest
}: ColorPaletteProps) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    color: PickableColor,
  ) => {
    onChange?.(event);
    onColorChange?.(color);
  };

  return (
    <InputBaseLabel
      data-testid={testId}
      name="color"
      value={value}
      withFormatting={false}
      {...rest}
    >
      {props => (
        <Grid className={styles.ColorPalette} columns={5} gap={5} isContainer>
          {COLOR_PALETTE_THEME_COLORS.map(color => (
            <Grid key={color} className={styles.ColorInput} isItem>
              <ColorChoice
                defaultChecked={color === value}
                {...props}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event, color)
                }
                value={color}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </InputBaseLabel>
  );
};

export default ColorPalette;
