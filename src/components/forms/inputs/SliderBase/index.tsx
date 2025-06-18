import { classNames } from '@gatewatcher/bistoury/utils-dom';
import {
  isDefined,
  isFunction,
  isNumber,
} from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { SliderProps as RCSliderProps } from 'rc-slider';
import RCSlider from 'rc-slider';
import type { MarkObj } from 'rc-slider/lib/Marks';
import { Fragment, useMemo } from 'react';

import { Popover, TextIcon } from '@/skin/displays';
import type { InputMeta } from '@/skin/forms';
import { isMark } from '@/skin/forms/inputs/SliderBase/typeUtil';
import { Text } from '@/skin/typography';
import { getColor } from '@/utils';

import {
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_WITH_CONSTANT_INTERVALS,
} from './constants';
import type {
  SliderGradient,
  SliderLabel,
  SliderLabelOptions,
  SliderMark,
} from './types';

import styles from './styles.module.scss';
import './styles.scss';

export type SliderBaseProps = DataTestId &
  Pick<
    RCSliderProps,
    'disabled' | 'max' | 'min' | 'onChange' | 'step' | 'value'
  > & {
    endLabel?: SliderLabel;
    gradient?: SliderGradient;
    leftLabel?: SliderLabel;
    label?: SliderLabel;
    marks?: SliderMark | number[];
    meta?: Partial<InputMeta>;
    rightLabel?: SliderLabel;
    startLabel?: SliderLabel;
    withConstantIntervals?: boolean;
  };

export type SliderBaseInternalProps = Pick<
  RCSliderProps,
  'range' | 'allowCross'
>;

type LabelProps = Pick<SliderLabelOptions, 'max' | 'min' | 'value'> & {
  children: SliderLabel;
};
const Label = ({ children, ...rest }: LabelProps) => {
  return isFunction(children) ? <>{children(rest)}</> : <>{children}</>;
};

const SliderBase = ({
  allowCross = false,
  'data-testid': testId = 'slider-base',
  disabled,
  endLabel,
  gradient,
  label,
  leftLabel,
  marks: marksProps,
  max = DEFAULT_MAX,
  min = DEFAULT_MIN,
  onChange,
  range,
  rightLabel,
  startLabel,
  step: stepProps,
  value: valueProps,
  withConstantIntervals = DEFAULT_WITH_CONSTANT_INTERVALS,
}: SliderBaseProps & SliderBaseInternalProps) => {
  const value = valueProps ?? min;

  const handleChange = (value: number | number[]) => {
    let newValue = value;

    if (withConstantIntervals) {
      const index = (value as number) - 1;

      newValue = Array.isArray(marksProps)
        ? marksProps[index]
        : parseInt(Object.keys(marksProps || {})[index], 10);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const tempMarks = Array.isArray(marksProps)
    ? marksProps.reduce((acc, value) => ({ ...acc, [value]: value }), {})
    : Object.entries(marksProps || {}).reduce((acc, [key, value]) => {
        if (isMark(value)) {
          acc[key] = {
            label: value.popoverContent ? (
              <Popover content={value.popoverContent} placement="bottom">
                <TextIcon endIcon="CircleHelp" iconSize="small">
                  {value.label}
                </TextIcon>
              </Popover>
            ) : (
              <Text>{value.label}</Text>
            ),
          };
        } else {
          acc[key] = {
            label: <Text>{value}</Text>,
          };
        }

        return acc;
      }, {} as Record<string, MarkObj>);

  const marks = useMemo(() => {
    return !!tempMarks && withConstantIntervals
      ? Object.keys(tempMarks).reduce(
          (acc, key, index) => ({
            ...acc,
            [index + 1]: (tempMarks as Record<string, string>)[key],
          }),
          {},
        )
      : tempMarks;
  }, [tempMarks, withConstantIntervals]);

  let step = stepProps;
  if (stepProps === null || isNumber(stepProps)) {
    step = stepProps;
  } else if (marks) {
    step = null;
  }

  const gradientColor =
    typeof gradient === 'object'
      ? `linear-gradient(${gradient.reversed ? '270' : '90'}deg, ${
          gradient.from || getColor('info', { variant: 300 })
        } 0%, ${gradient.to || getColor('info', { variant: 700 })} 100%)`
      : `linear-gradient(90deg, ${getColor('info', {
          variant: 300,
        })} 0%, ${getColor('info', { variant: 700 })} 100%)`;

  const Container = startLabel || endLabel ? 'section' : Fragment;
  const containerAttributes = {
    ...((startLabel || endLabel) && {
      className: styles.main,
      'data-testid': 'section',
    }),
  };

  const valuePosition = useMemo(() => {
    if (withConstantIntervals) {
      const index = Object.keys(tempMarks || {}).findIndex(
        key => parseInt(key, 10) === valueProps,
      );
      return index + 1;
    }

    return valueProps;
  }, [withConstantIntervals, valueProps, tempMarks]);

  const needResetMarks = useMemo(() => {
    if (!tempMarks) return false;

    const marksAsArray = Object.keys(tempMarks);

    return (
      withConstantIntervals ||
      (min === parseInt(marksAsArray[0], 10) &&
        max === parseInt(marksAsArray.at(-1) as string, 10))
    );
  }, [tempMarks, withConstantIntervals, min, max]);

  return (
    <div
      className={classNames(
        disabled && styles.disabled,
        marksProps && styles.withMarks,
      )}
      data-testid={testId}
    >
      {(label || leftLabel || rightLabel) && (
        <header className={styles.header}>
          {label && (
            <div className={styles.mainLabel}>
              <Label max={max} min={min} value={valueProps ?? value}>
                {label}
              </Label>
            </div>
          )}

          {(leftLabel || rightLabel) && (
            <div className={styles.headerLabels}>
              <span>
                <Label max={max} min={min} value={value}>
                  {leftLabel}
                </Label>
              </span>
              <span>
                {rightLabel && (
                  <Label max={max} min={min} value={value}>
                    {rightLabel}
                  </Label>
                )}
              </span>
            </div>
          )}
        </header>
      )}

      <Container {...containerAttributes}>
        {startLabel && (
          <span className={classNames(styles.label, styles.labelStart)}>
            <Label max={max} min={min} value={value}>
              {startLabel}
            </Label>
          </span>
        )}
        <RCSlider
          {...(isDefined(valueProps)
            ? { value: valuePosition }
            : { value: withConstantIntervals ? 1 : min })}
          className={classNames(
            needResetMarks && 'slider-reset-marks',
            disabled && styles.disabled,
          )}
          styles={{
            rail: { ...(isDefined(gradient) && { background: gradientColor }) },
            track: { ...(isDefined(gradient) && { background: 'none' }) },
          }}
          allowCross={allowCross}
          disabled={disabled}
          marks={marks}
          max={withConstantIntervals ? Object.keys(marks || {}).length : max}
          min={withConstantIntervals ? 1 : min}
          onChange={handleChange}
          range={range}
          step={step}
        />
        {endLabel && (
          <span className={classNames(styles.label, styles.labelEnd)}>
            <Label max={max} min={min} value={value}>
              {endLabel}
            </Label>
          </span>
        )}
      </Container>
    </div>
  );
};

export default SliderBase;
