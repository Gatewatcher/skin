import { useDrawerContext } from '../context';

export type UseDrawerContainerReturn = {
  setOffsetTop: (offsetTop: number) => void;
  offsetTop: number;
};

/**
 * @deprecated This function will be unused after removing the Drawer.
 *
 * Will be removed 01/05/2025.
 */
export const useDrawerContainer = (): UseDrawerContainerReturn => {
  const { offsetTop, setOffsetTop } = useDrawerContext();

  return {
    offsetTop,
    setOffsetTop,
  };
};
