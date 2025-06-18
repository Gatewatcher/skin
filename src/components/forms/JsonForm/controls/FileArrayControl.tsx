import type { ControlProps, RankedTester } from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { FilesList } from '@/skin/feedback';
import { Form, Input, useWatch } from '@/skin/forms';
import { Stack } from '@/skin/layout';

import { useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  isFileArrayControl,
} from '../utils';

// FIXME when a single file is selected, we cannot select another one directly

const FileArrayControl = ({
  enabled,
  label,
  path,
  required,
  uischema,
}: ControlProps) => {
  const value = useWatch(path);

  useRegisterSubFieldPath(path);

  return (
    <Stack data-testid="jsonform-file-array-control" direction="column" gap={6}>
      <Form.Field
        {...getFieldPropsFromUiSchema(uischema)}
        messageVariables={{ name: label }}
        name={path}
        required={required}
        type="files"
      >
        <Input.File
          {...getInputPropsFromUiSchema(uischema)}
          disabled={!enabled}
          label={label}
          multiple={true}
          startIcon="Upload"
        />
      </Form.Field>
      <FilesList files={value ?? []}>
        {file => <FilesList.Item key={file.id} file={file} />}
      </FilesList>
    </Stack>
  );
};

const FileArrayControlRenderer = withJsonFormsControlProps(FileArrayControl);

export const fileArrayControlTester: RankedTester = rankWith(
  5, // Override the custom array control
  isFileArrayControl,
);

export default FileArrayControlRenderer;
