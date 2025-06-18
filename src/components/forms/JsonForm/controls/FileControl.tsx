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
  isFileControl,
} from '../utils';

// FIXME when a single file is selected, we cannot select another one directly

const FileControl = ({
  enabled,
  label,
  path,
  required,
  uischema,
}: ControlProps) => {
  const value = useWatch(path);

  useRegisterSubFieldPath(path);

  return (
    <Stack data-testid="jsonform-file-control" direction="column" gap={6}>
      <Form.Field
        {...getFieldPropsFromUiSchema(uischema)}
        messageVariables={{ name: label }}
        name={path}
        required={required}
        type="file"
      >
        <Input.File
          {...getInputPropsFromUiSchema(uischema)}
          disabled={!enabled}
          label={label}
          startIcon="Upload"
        />
      </Form.Field>
      <FilesList files={value ? [value] : []}>
        {file => <FilesList.Item key={file.id} file={file} />}
      </FilesList>
    </Stack>
  );
};

const FileControlRenderer = withJsonFormsControlProps(FileControl);

export const fileControlTester: RankedTester = rankWith(
  2, // Override the custom text control
  isFileControl,
);

export default FileControlRenderer;
