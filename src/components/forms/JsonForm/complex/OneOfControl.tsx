import { first } from '@gatewatcher/bistoury/utils-lang';
import type { CombinatorRendererProps, RankedTester } from '@jsonforms/core';
import { createCombinatorRenderInfos, rankWith } from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsOneOfProps } from '@jsonforms/react';
import { useState } from 'react';

import { Input } from '@/skin/forms';

import {
  OneOfContextProvider,
  useInitialOptionValue,
  useRegisterOption,
} from '../contexts';
import { extractOneOfSubSchemaNames, isOneOfRefControl } from '../utils';

// @jsonforms/material-renderers/src/complex/MaterialOneOfRenderer.tsx
// OneOf uses a VerticalLayout to render the sub-forms.

const OneOfControl = ({
  enabled,
  description,
  label,
  path,
  renderers,
  rootSchema,
  schema,
  uischema,
  uischemas,
}: CombinatorRendererProps) => {
  const oneOfRenderInfos =
    schema.oneOf &&
    createCombinatorRenderInfos(
      schema.oneOf,
      rootSchema,
      'oneOf',
      uischema,
      path,
      uischemas,
    );

  const subSchemaNames = extractOneOfSubSchemaNames(schema);
  const selectOptions = oneOfRenderInfos?.map((oneOfRenderInfo, index) => ({
    label: oneOfRenderInfo.schema.title ?? oneOfRenderInfo.label,
    value: subSchemaNames[index],
  }));
  const defaultOption = selectOptions && first(selectOptions)?.value;
  const initialOption = useInitialOptionValue(path) ?? defaultOption;
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    initialOption,
  );

  useRegisterOption(path, selectedOption);

  const selectedIndex = selectOptions?.findIndex(
    ({ value }) => value === selectedOption,
  );

  return (
    <OneOfContextProvider onChange={setSelectedOption}>
      {({ onChangeWithCleanup }) => (
        <>
          <Input.Select
            data-testid="jsonform-one-of-control"
            disabled={!enabled}
            info={description}
            isClearable={false}
            label={label}
            onChange={onChangeWithCleanup}
            options={selectOptions}
            value={selectedOption}
            preventAutocomplete
          />
          {oneOfRenderInfos?.map(
            (oneOfRenderInfo, oneOfIndex) =>
              selectedIndex === oneOfIndex && (
                <JsonFormsDispatch
                  key={oneOfIndex}
                  renderers={renderers}
                  schema={oneOfRenderInfo.schema}
                  uischema={oneOfRenderInfo.uischema}
                />
              ),
          )}
        </>
      )}
    </OneOfContextProvider>
  );
};

const OneOfControlRenderer = withJsonFormsOneOfProps(OneOfControl);

export const oneOfControlTester: RankedTester = rankWith(
  3, // Override the custom select control
  isOneOfRefControl,
);

export default OneOfControlRenderer;
