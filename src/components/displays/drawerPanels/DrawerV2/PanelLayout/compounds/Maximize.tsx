import { ButtonIcon } from '@/skin/actions';

import { useDrawerV2 } from '../components/LayoutProvider';

const Maximize = () => {
  const { isMaximized, maximize, minimize } = useDrawerV2();

  return (
    <ButtonIcon
      icon={isMaximized ? 'Retract' : 'Expand'}
      onClick={isMaximized ? minimize : maximize}
      variant="ghosted"
    />
  );
};

export default Maximize;
