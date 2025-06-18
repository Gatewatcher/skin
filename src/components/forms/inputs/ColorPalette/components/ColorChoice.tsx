import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ChangeEventHandler } from 'react';

import { useThemeContrastedColors } from '@/hooks';
import { Tooltip } from '@/skin/displays';
import type { InputBaseRenderProps } from '@/skin/forms/inputs/InputBaseLabel';
import { getInputBaseRenderProps } from '@/skin/forms/inputs/InputBaseLabel/utils';

import { TOOLTIP_DELAY } from '../constants';
import type { PickableColor } from '../types';

import styles from '../styles.module.scss';

export type ColorChoiceProps = DataTestId &
  Omit<InputBaseRenderProps, 'value'> & {
    defaultChecked?: boolean;
    onChange?: ChangeEventHandler;
    value: PickableColor;
  };

const ColorChoice = ({
  defaultChecked,
  disabled,
  value,
  name = 'color',
  ...rest
}: ColorChoiceProps) => {
  const baseColors = useThemeContrastedColors({
    color: value,
    withAlpha: disabled,
  });

  const { backgroundColor } = useThemeContrastedColors({
    color: value,
  });

  const style = {
    ...baseColors,
    ...{ borderColor: baseColors.backgroundColor },
    ...(!disabled && { outlineColor: backgroundColor }),
    ...(disabled && { outline: '0px' }),
  };

  return (
    <Tooltip content={value} delay={TOOLTIP_DELAY}>
      <div>
        <input
          className={styles.ColorChoice}
          defaultChecked={defaultChecked}
          style={style}
          type="radio"
          {...getInputBaseRenderProps({ name, ...rest, value, disabled })}
        />
      </div>
    </Tooltip>
  );
};
export default ColorChoice;
