import type { MouseEvent, ReactElement } from 'react';
import { cloneElement } from 'react';

export type WithStopPropagationProps = {
  onClick: (event: MouseEvent) => void;
};

export const withStopPropagation = <T extends WithStopPropagationProps>(
  BaseComponent: ReactElement<T>,
) => {
  const props = BaseComponent.props;
  return cloneElement(BaseComponent, {
    ...props,
    onClick: (event: MouseEvent) => {
      event.stopPropagation();
      props.onClick?.(event);
    },
  });
};
