import { useInternalFormContext } from '../contexts/contexts';

export const useCurrentForm = () => {
  const { form } = useInternalFormContext();

  return form;
};
