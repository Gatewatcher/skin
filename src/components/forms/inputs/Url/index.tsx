import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import Prefix from '../../affixes/Prefix';
import Suffix from '../../affixes/Suffix';
import InputBase from '../InputBase';
import type { InputBaseRenderProps } from '../InputBaseLabel';
import InputBaseLabel from '../InputBaseLabel';
import type { InputSharedProps } from '../types';
import { removeAffixes } from './utils';

export type UrlProps = DataTestId &
  InputSharedProps & {
    prefix?: string;
    suffix?: string;
  };

const Url = ({
  'data-testid': testId = 'input-url',
  prefix,
  suffix,
  onChange,
  value: valueProps,
  defaultValue,
  ...props
}: UrlProps) => {
  const [value, setValue] = useState(
    removeAffixes((defaultValue || valueProps || '') as string, {
      prefix,
      suffix,
    }),
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(removeAffixes(event.target.value, { prefix, suffix }));
    onChange?.(event);
  };

  return (
    <InputBaseLabel
      data-testid={testId}
      onChange={handleChange}
      value={value}
      {...props}
    >
      {(renderProps: InputBaseRenderProps) => (
        <InputBase
          elementAfter={suffix && <Suffix>{suffix}</Suffix>}
          elementBefore={prefix && <Prefix>{prefix}</Prefix>}
          {...renderProps}
        >
          {inputProps => <input type="text" {...inputProps} />}
        </InputBase>
      )}
    </InputBaseLabel>
  );
};

export default Url;
