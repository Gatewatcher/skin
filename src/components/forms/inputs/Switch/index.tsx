import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import { useMemo } from 'react';

import { Icon, type IconName, ObfuscatedText } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';
import type { ColorsWithNeutral } from '@/types';
import { getColor } from '@/utils';

import type { InputBaseRenderProps } from '../InputBaseLabel';
import InputBaseLabel from '../InputBaseLabel';
import { getInputBaseRenderProps } from '../InputBaseLabel/utils';
import type { InputSharedProps } from '../types';
import {
  DEFAULT_CHECKED_ICON_COLOR,
  DEFAULT_UNCHECKED_ICON_COLOR,
} from './constants';
import type { IconColor } from './types';

import styles from './styles.module.scss';

export type SwitchProps = InputSharedProps & {
  checkedIcon?: IconName;
  checkedIconColor?: IconColor;
  endLabel?: string;
  uncheckedIcon?: IconName;
  uncheckedIconColor?: IconColor;
  startLabel?: string;
};

export type IconIndicatorProps = {
  icon: IconName;
  position: 'start' | 'end';
};

const IconIndicator = ({ icon, position }: IconIndicatorProps) => {
  return (
    <Icon
      className={classNames(
        styles.icon,
        stylesToCamelCase(styles, 'icon', position),
      )}
      name={icon}
      size="small"
      currentColor
    />
  );
};

const Switch = (props: SwitchProps) => {
  const {
    checked,
    checkedIcon,
    checkedIconColor = DEFAULT_CHECKED_ICON_COLOR,
    'data-testid': testId = 'switch',
    endLabel,
    uncheckedIcon,
    uncheckedIconColor = DEFAULT_UNCHECKED_ICON_COLOR,
    startLabel,
    preventAutocomplete,
    ...rest
  } = props;

  const colorTemp = checked ? checkedIconColor : uncheckedIconColor;
  const color = useMemo(
    () => getColor(colorTemp as ColorsWithNeutral) || colorTemp,
    [colorTemp],
  );

  return (
    <InputBaseLabel
      renderReadonlyMode={({ readonlyMode, ...props }) => (
        <Text data-testid={suffixTestId(testId, 'readonly')}>
          {isFunction(readonlyMode.label)
            ? readonlyMode.label(props)
            : readonlyMode.label}
        </Text>
      )}
      checked={checked}
      className={styles.container}
      preventAutocomplete={preventAutocomplete}
      withLabel={false}
      {...rest}
    >
      {(props: InputBaseRenderProps) => (
        <Stack
          className={classNames(
            styles.Switch,
            props.disabled && styles.disabled,
          )}
          alignItems="center"
          data-testid={testId}
          gap={4}
        >
          {!!startLabel &&
            (preventAutocomplete ? (
              <ObfuscatedText text={startLabel} />
            ) : (
              startLabel
            ))}

          <input type="checkbox" {...getInputBaseRenderProps(props)} />
          <Stack.Item flexShrink={0}>
            <Stack alignItems="center" data-testid="icons" style={{ color }}>
              {checkedIcon && (
                <IconIndicator icon={checkedIcon} position="start" />
              )}
              {uncheckedIcon && (
                <IconIndicator icon={uncheckedIcon} position="end" />
              )}
            </Stack>
          </Stack.Item>

          {!!endLabel &&
            (preventAutocomplete ? (
              <ObfuscatedText text={endLabel} />
            ) : (
              endLabel
            ))}
        </Stack>
      )}
    </InputBaseLabel>
  );
};

export default Switch;
