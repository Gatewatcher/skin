import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { ArrayControlProps, RankedTester } from '@jsonforms/core';
import { isPrimitiveArrayControl, rankWith } from '@jsonforms/core';
import { withJsonFormsArrayControlProps } from '@jsonforms/react';

import { ButtonIcon } from '@/skin/actions';
import { InfoTooltip } from '@/skin/displays';
import { Form, Input } from '@/skin/forms';
import { Stack } from '@/skin/layout';
import { List } from '@/skin/listings';
import { Title } from '@/skin/typography';

import { useRegisterSubFieldPath } from '../hooks';
import {
  getFieldPropsFromUiSchema,
  getInputPropsFromUiSchema,
  getRulesFromSchema,
} from '../utils';

const ArrayControl = ({
  label,
  description,
  path,
  schema,
  uischema,
}: ArrayControlProps) => {
  const rules = getRulesFromSchema(schema);

  useRegisterSubFieldPath(path);

  return (
    <Form.List name={path}>
      {(fields, { add, remove }) => {
        const handleAddField = () => add('', fields.length);

        return (
          <Stack
            alignItems="stretch"
            data-testid={`jsonform-${schema.type}-array-control`}
            direction="column"
            gap={6}
          >
            <Stack gap={2}>
              <Title as="h5">{label}</Title>
              {description && <InfoTooltip info={description} />}
            </Stack>
            <List data={fields} emptyElement={<></>}>
              {({ key, ...field }, { index }) => (
                <Form.Field
                  {...getFieldPropsFromUiSchema(uischema)}
                  {...field}
                  key={key}
                  messageVariables={{ name: label }}
                  rules={rules}
                >
                  {(control, meta) => {
                    const Cell = isString(schema.type)
                      ? getCellComponent(schema.type)
                      : null;

                    return (
                      <Stack gap={6}>
                        <Stack.Item flexGrow={1}>
                          {Cell && (
                            <Cell
                              {...getInputPropsFromUiSchema(uischema)}
                              meta={{ errors: meta.errors }}
                              pattern={schema.pattern}
                              placeholder={uischema.options?.placeholder}
                              tooltip={schema.description}
                              {...control}
                              preventAutocomplete
                            />
                          )}
                        </Stack.Item>
                        <ButtonIcon
                          icon="Delete"
                          onClick={() => remove(index)}
                        />
                      </Stack>
                    );
                  }}
                </Form.Field>
              )}
            </List>
            <ButtonIcon icon="Add" onClick={handleAddField} />
          </Stack>
        );
      }}
    </Form.List>
  );
};

const getCellComponent = (type: string) => {
  if (type === 'number') return Input.Number;
  return Input.Text;
};

const ArrayControlRenderer = withJsonFormsArrayControlProps(ArrayControl);

export const arrayControlTester: RankedTester = rankWith(
  1,
  isPrimitiveArrayControl,
);

export default ArrayControlRenderer;
