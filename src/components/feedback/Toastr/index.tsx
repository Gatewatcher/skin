import type { ReactNode } from 'react';
import { useRef } from 'react';

import Toasts from './compounds/Toasts';
import { DEFAULT_MAX, DEFAULT_TOAST_METHOD_REF } from './constants';
import type { ToastrContextType } from './context';
import { ToastrContext } from './context';
import type { ToastrOffset, ToastrPosition } from './types';

export type ToastrSharedProps = {
  max?: number;
  offset?: ToastrOffset;
  position?: ToastrPosition;
};

export type ToastrProps = ToastrSharedProps & {
  children: ReactNode;
};

const Toastr = ({
  children,
  max = DEFAULT_MAX,
  offset,
  position = 'bottom-left',
}: ToastrProps) => {
  const setToastRef = useRef(DEFAULT_TOAST_METHOD_REF);

  const contextValue: ToastrContextType = {
    setToastRef,
    max,
  };

  return (
    <ToastrContext.Provider value={contextValue}>
      <Toasts offset={offset} position={position} />
      {children}
    </ToastrContext.Provider>
  );
};

export default Toastr;
