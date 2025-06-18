import { isFunction, isString } from '@gatewatcher/bistoury/utils-lang';

import { KeyValue } from '@/skin/displays';

import type { InputBaseRenderProps } from './InputBaseLabel';
import type { InputReadonlyMode } from './types';

export const READONLY_MODE_VARIANTS = ['keyValue'] as const;

export const DEFAULT_READONLY_MODE: InputReadonlyMode = {};
export const DEFAULT_WITH_COPY_PASTE = true;

export const DEFAULT_RENDER_READONLY_MODE = (props: InputBaseRenderProps) => {
  const {
    name,
    readonlyMode,
    value: valueProps,
    label: labelProps,
    withLabel,
  } = props;
  const {
    label: labelReadonlyMode,
    value: valueReadonlyMode,
    valueFallback,
  } = readonlyMode;

  const label = isFunction(labelReadonlyMode)
    ? labelReadonlyMode(props)
    : labelReadonlyMode ??
      (isString(labelProps)
        ? labelProps
        : Object.values(labelProps ?? {}).join(' ')) ??
      name;

  const value = isFunction(valueReadonlyMode)
    ? valueReadonlyMode(props)
    : valueReadonlyMode ?? valueProps;

  return (
    <KeyValue
      data-testid="input-readonly"
      label={withLabel ? label : null}
      value={value}
      valueFallback={valueFallback}
    />
  );
};
