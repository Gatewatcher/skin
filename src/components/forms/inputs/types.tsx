import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type {
  CSSProperties,
  ComponentProps,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import type { LabelProps } from '@/skin/displays';

import type { FormInstance, Meta } from '../Form/interface';
import type { LabelDirection } from './InputBaseLabel/types';
import type { READONLY_MODE_VARIANTS } from './constants';

export type InputMeta = Meta & {
  helpers: string[];
};

export type InputProps = ComponentPropsWithRef<'input'>;
export type InputPropsWithoutRef = ComponentPropsWithoutRef<'input'>;

export type ReadonlyModeVariant = typeof READONLY_MODE_VARIANTS[number];

export type InputReadonlyMode = {
  enabled?: boolean;
  label?: string | ((options: Record<string, unknown>) => string);
  value?: ReactNode | ((options: Record<string, unknown>) => ReactNode);
  valueFallback?: string;
  variant?: ReadonlyModeVariant;
};

export type InputAndTextAreaSharedProps = Pick<
  LabelProps,
  'withRequiredMark' | 'label'
> & {
  fitContent?: boolean;
  htmlFor?: string;
  labelDirection?: LabelDirection;
  meta?: Partial<InputMeta>;
  readonlyMode?: InputReadonlyMode;
  tooltip?: ReactNode;
  withLabel?: boolean;
  withCopyPaste?: boolean;
};

export type InputSharedProps = DataTestId &
  Omit<ComponentProps<'input'>, 'style' | 'children' | 'label' | 'ref'> &
  InputAndTextAreaSharedProps & {
    form?: FormInstance;
    preventAutocomplete?: boolean;
    flexGrow?: number;
  };

export type TextAreaSharedProps = DataTestId &
  Omit<ComponentProps<'textarea'>, 'type' | 'style' | 'children' | 'label'> &
  InputAndTextAreaSharedProps & {
    autoGrow?: boolean;
    form?: FormInstance;
    styling?: Pick<CSSProperties, 'resize'>;
    flexGrow?: number;
  };

export type ChoicePrimitiveValue = string | number | boolean;
export type ChoiceValue = {
  label?: string;
  value: ChoicePrimitiveValue;
};

export type Choice = ChoicePrimitiveValue &
  ChoiceValue &
  Record<string, ChoicePrimitiveValue>;
