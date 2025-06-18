import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Hint } from '@/skin/displays';
import type { InputMeta } from '@/skin/forms/inputs/types';
import { Stack } from '@/skin/layout';

export type FieldHelpersProps = DataTestId &
  Partial<Pick<InputMeta, 'errors' | 'helpers' | 'warnings'>>;

const FieldHelpers = ({ errors, helpers, warnings }: FieldHelpersProps) => {
  if (!errors && !helpers && !warnings) {
    return <></>;
  }

  return (
    <Stack direction="column" gap={3}>
      {helpers && <Hint variant="neutral">{helpers}</Hint>}
      {errors && <Hint variant="danger">{errors}</Hint>}
      {warnings && <Hint variant="warning">{warnings}</Hint>}
    </Stack>
  );
};

export default FieldHelpers;
