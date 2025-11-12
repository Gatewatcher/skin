import { ButtonClose } from '@/skin/actions';

import { useSidePanel } from '../Provider';

const Close = () => {
  const { close } = useSidePanel();

  return <ButtonClose onClick={close} />;
};

export default Close;
