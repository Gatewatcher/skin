import type { DataTestId, TestId } from '@gatewatcher/bistoury/utils-types';

import type { ExtraElementProps } from '../InputBase';
import InputBase from '../InputBase';
import type { InputBaseRenderProps } from '../InputBaseLabel';
import InputBaseLabel from '../InputBaseLabel';
import type { InputSharedProps } from '../types';

export const TEST_ID: TestId = 'input-email';

export type EmailProps = DataTestId & InputSharedProps & ExtraElementProps;

const Email = ({
  'data-testid': testId = TEST_ID,
  preventAutocomplete,
  ...props
}: EmailProps) => {
  return (
    <InputBaseLabel
      {...props}
      data-testid={testId}
      preventAutocomplete={preventAutocomplete}
    >
      {(props: InputBaseRenderProps) => (
        <InputBase {...props}>
          {props => (
            <input type={preventAutocomplete ? 'text' : 'email'} {...props} />
          )}
        </InputBase>
      )}
    </InputBaseLabel>
  );
};

export default Email;
