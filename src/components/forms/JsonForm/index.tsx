import { isDefined } from '@gatewatcher/bistoury/utils-lang';
import type { JsonFormsInitStateProps } from '@jsonforms/react';
import { JsonForms } from '@jsonforms/react';
import { useState } from 'react';

import type { FormInstance } from '@/skin/forms';

import { RENDERERS, UNUSED_DEFAULT_DATA } from './constants';
import { JsonFormContextProvider } from './contexts';
import type {
  OptionChangeHandler,
  Options,
  OptionsChangeHandler,
} from './types';

export type JsonFormProps = Pick<
  JsonFormsInitStateProps,
  'schema' | 'uischema' | 'readonly'
> & {
  onOptionsChange?: OptionsChangeHandler;
  /** Initial selection of the oneOf controls. */
  initialOptions?: Options;
  form?: FormInstance;
};

const DEFAULT_INITIAL_OPTIONS = {};

const JsonForm = ({
  onOptionsChange,
  initialOptions = DEFAULT_INITIAL_OPTIONS,
  readonly,
  schema,
  uischema,
  form,
}: JsonFormProps) => {
  const [selectedOptions, setSelectedOptions] =
    useState<Options>(initialOptions);

  const handleOnOptionChange: OptionChangeHandler = (name, value) => {
    const nextOptions = { ...selectedOptions };

    if (isDefined(value)) {
      nextOptions[name] = value;
    } else {
      delete nextOptions[name];
    }

    setSelectedOptions(nextOptions);
    onOptionsChange?.(nextOptions);
  };

  return (
    <JsonFormContextProvider
      form={form}
      initialOptions={initialOptions}
      onOptionChange={handleOnOptionChange}
    >
      <JsonForms
        data={UNUSED_DEFAULT_DATA}
        readonly={readonly}
        renderers={RENDERERS}
        schema={schema}
        uischema={uischema}
        validationMode="NoValidation"
      />
    </JsonFormContextProvider>
  );
};

export default JsonForm;
