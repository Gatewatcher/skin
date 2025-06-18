import { Stack } from '@/skin/layout';

import Inputs from './Inputs';

const InputsContainer = () => {
  return (
    <Stack direction="column">
      <Inputs label="From" type="from" />
      <Inputs label="To" type="to" />
    </Stack>
  );
};

export default InputsContainer;
