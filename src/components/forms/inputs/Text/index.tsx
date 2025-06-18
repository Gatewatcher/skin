import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { memo } from 'react';

import CopySuffix from '../../affixes/CopySuffix';
import type { ExtraElementProps } from '../InputBase';
import InputBase from '../InputBase';
import type { InputBaseRenderProps } from '../InputBaseLabel';
import InputBaseLabel from '../InputBaseLabel';
import type { InputSharedProps } from '../types';

export type TextProps = DataTestId & InputSharedProps & ExtraElementProps;

const Text = ({
  'data-testid': testId = 'input-text',
  ...props
}: TextProps) => {
  return (
    <InputBaseLabel {...props} data-testid={testId}>
      {(props: InputBaseRenderProps) => (
        <InputBase {...props}>
          {props => <input type="text" {...props} />}
        </InputBase>
      )}
    </InputBaseLabel>
  );
};

Text.CopySuffix = memo(CopySuffix);

export default Text;
