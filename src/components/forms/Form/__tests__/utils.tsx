import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { ByRoleMatcher, ByRoleOptions } from '@testing-library/dom';
import { screen, waitFor } from '@testing-library/dom';
import type { ChangeEvent, ReactElement } from 'react';
import { cloneElement } from 'react';

import type { FieldProps } from '../compounds/Field';
import Field from '../compounds/Field';

type InfoFieldProps = FieldProps & {
  children?: ReactElement;
};

export const Input = ({
  value = '',
  ...props
}: {
  value?: string;
  'data-testid'?: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) => <input {...props} value={value} />;
export const getInput = () => screen.getByRole('textbox');

type Value = string | number;
export const expectToBeVisibleByRole = async ({
  role,
  options,
}: {
  role: ByRoleMatcher;
  options?: ByRoleOptions;
}) => {
  const element = await screen.findByRole(role, options);
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
};

export const expectToBeVisibleByTestId = async ({
  testId,
}: {
  testId: string;
  value: Value;
}) => {
  return await expectToBeVisibleInTheDocument(testId);
};

export const expectToBeVisibleByText = async ({ text }: { text: string }) => {
  return await expectToBeVisibleInTheDocument(text, screen.findByText);
};

export const expectToHaveValueByRole = async ({
  role,
  options,
  value,
}: {
  role: ByRoleMatcher;
  options?: ByRoleOptions;
  value: Value;
}) => {
  const element = await screen.findByRole(role, options);
  expect(element).toHaveValue(value);
};

export const expectToHaveValueByTestId = async ({
  testId,
  value,
}: {
  testId: string;
  value: Value;
}) => {
  const element = await screen.findByTestId(testId);
  expect(element).toHaveValue(value);
};

export const expectToHaveValueByText = async ({
  text,
  value,
}: {
  text: string;
  value: Value;
}) => {
  const element = await screen.findByText(text);
  expect(element).toHaveValue(value);
};

export const matchError = async (
  error?: boolean | string,
  warning?: boolean | string,
) => {
  // Error
  if (error) {
    await waitFor(() => {
      expect(screen.queryByTestId('errors-1')).toBeTruthy();
    });
  } else {
    await waitFor(() => {
      expect(screen.queryByTestId('errors-1')).toBeFalsy();
    });
  }

  if (error && typeof error !== 'boolean') {
    await expectToBeVisibleByText({ text: error });
  }

  // Warning
  if (warning) {
    await waitFor(() => {
      expect(screen.queryByTestId('warning-1')).toBeTruthy();
    });
  } else {
    await waitFor(() => {
      expect(screen.queryByTestId('warning-1')).toBeFalsy();
    });
  }

  if (warning && typeof warning !== 'boolean') {
    await expectToBeVisibleByText({ text: warning });
  }
};

const InfoField = ({ children, ...props }: InfoFieldProps) => (
  <Field {...props}>
    {(control, info) => {
      const { errors, warnings, validating } = info;

      return (
        <div>
          {children ? (
            cloneElement(children, control)
          ) : (
            <Input data-testid={props['data-testid']} {...control} />
          )}
          <ul className="errors">
            {errors.map((error, index) => (
              <li key={index} data-testid={`errors-${index + 1}`}>
                {error}
              </li>
            ))}
          </ul>
          <ul className="warnings">
            {warnings.map((warning, index) => (
              <li key={index} data-testid={`warning-${index + 1}`}>
                {warning}
              </li>
            ))}
          </ul>
          {validating && (
            <span className="validating" data-testid="validating" />
          )}
        </div>
      );
    }}
  </Field>
);

export default InfoField;
