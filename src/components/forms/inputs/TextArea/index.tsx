import type { DataTestId, TestId } from '@gatewatcher/bistoury/utils-types';

import InputBaseLabel from '../InputBaseLabel';
import { getTextareaRenderProps } from '../InputBaseLabel/utils';
import TextAreaBase from '../TextAreaBase';
import { DEFAULT_RENDER_READONLY_MODE } from '../constants';
import type { TextAreaSharedProps } from '../types';

export const TEST_ID: TestId = 'textarea';

export type TextAreaProps = DataTestId & TextAreaSharedProps;

const TextArea = ({
  'data-testid': testId = TEST_ID,
  onChange,
  meta,
  ...props
}: TextAreaProps) => {
  return (
    <InputBaseLabel
      data-testid={testId}
      meta={meta}
      onChange={onChange}
      renderReadonlyMode={DEFAULT_RENDER_READONLY_MODE}
      {...props}
    >
      {inputProps => (
        <TextAreaBase {...getTextareaRenderProps(inputProps)} meta={meta} />
      )}
    </InputBaseLabel>
  );
};

export default TextArea;
