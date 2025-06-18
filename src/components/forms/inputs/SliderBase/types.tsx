import type { ReactNode } from 'react';

export type SliderGradient =
  | true
  | {
      from?: string;
      to?: string;
      reversed?: boolean;
    };

export type Mark = {
  label: ReactNode;
  popoverContent?: ReactNode;
};

export type SliderMark = {
  [index: number]: ReactNode | Mark;
};

export type SliderLabelOptions = {
  value: number | number[];
  min: number;
  max: number;
};
export type SliderLabel =
  | ReactNode
  | ((options: SliderLabelOptions) => ReactNode);
