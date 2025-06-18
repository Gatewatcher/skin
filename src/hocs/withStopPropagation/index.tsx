import type { MouseEvent, ReactElement } from 'react';
import { cloneElement } from 'react';

export type WithStopPropagationProps = {
  onClick: (event: MouseEvent) => void;
};

export const withStopPropagation = <T extends WithStopPropagationProps>(
  BaseComponent: ReactElement<T>,
) => {
  return cloneElement(BaseComponent, {
    ...BaseComponent.props,
    onClick: (event: MouseEvent) => {
      event.stopPropagation();
      BaseComponent.props.onClick?.(event);
    },
  });
};
