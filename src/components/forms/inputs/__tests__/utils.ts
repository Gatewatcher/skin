import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { RenderResult } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const ERRORS = ['Some error'];
const HELPERS = ['Some helper'];
const WARNINGS = ['Some warning'];

export const expectHintsToBeInTheDocument = async <T extends object>(
  renderComponent: (props: T) => RenderResult,
) => {
  renderComponent({
    meta: {
      errors: ERRORS,
      helpers: HELPERS,
      warnings: WARNINGS,
    },
  } as T);
  await expectToBeVisibleInTheDocument(ERRORS.join(''), screen.getByText);
  await expectToBeVisibleInTheDocument(HELPERS.join(''), screen.getByText);
  await expectToBeVisibleInTheDocument(WARNINGS.join(''), screen.getByText);
};

export const expectRequiredToBeInTheDocument = async <T extends object>(
  renderComponent: (props: T) => RenderResult,
) => {
  const INPUT_NAME = 'input-name';
  const { unmount } = renderComponent({
    label: 'label',
    required: false,
    name: INPUT_NAME,
  } as T);
  await expectNotToBeVisibleInTheDocument('label *', screen.queryByText);
  unmount();

  renderComponent({
    label: 'label',
    required: true,
    name: INPUT_NAME,
  } as T);
  await expectToBeVisibleInTheDocument('label *', screen.getByText);
  unmount();

  renderComponent({
    label: 'label',
    rules: [{ required: true }],
    name: INPUT_NAME,
  } as T);
  await expectToBeVisibleInTheDocument('label *', screen.getByText);
};

export const expectLabelToBeInTheDocument = async <T extends object>(
  renderComponent: (props: T) => RenderResult,
) => {
  const INPUT_NAME = 'input-name';
  renderComponent({ name: INPUT_NAME } as T);
  await expectToBeVisibleInTheDocument(INPUT_NAME, screen.getByLabelText);
};

export const expectToBeReadonly = async <T extends object>(
  renderComponent: (props: T) => RenderResult,
  props: T,
  getInput: () => Promise<HTMLElement>,
) => {
  const { unmount: unmountReadonly } = renderComponent({
    readOnly: true,
    ...props,
  } as T);
  const input = await getInput();
  expect(input).toHaveAttribute('readonly');
  unmountReadonly();

  const { unmount } = renderComponent({
    readOnly: false,
    readonlyMode: { enabled: true, label: 'testlabel' },
    ...props,
  });
  await expectToBeVisibleInTheDocument('testlabel', screen.findByText);
  unmount();

  const { unmount: unmountKeyValue } = renderComponent({
    label: 'label',
    value: 'value',
    readOnly: false,
    readonlyMode: { enabled: true, variant: 'keyValue' },
    ...props,
  });
  await expectToBeVisibleInTheDocument('input-readonly');
  await expectToBeVisibleInTheDocument('label', screen.findByText);
  await expectToBeVisibleInTheDocument('value', screen.findByText);
  unmountKeyValue();

  const { unmount: unmountDefaultValueFallback } = renderComponent({
    label: 'label',
    value: undefined,
    readOnly: false,
    readonlyMode: { enabled: true, variant: 'keyValue' },
    ...props,
  });

  await expectToBeVisibleInTheDocument('input-readonly');
  await expectToBeVisibleInTheDocument('label', screen.findByText);
  await expectToBeVisibleInTheDocument('-', screen.findByText);
  unmountDefaultValueFallback();

  renderComponent({
    label: 'label',
    value: undefined,
    readOnly: false,
    readonlyMode: {
      enabled: true,
      variant: 'keyValue',
      valueFallback: 'fallback',
    },
    ...props,
  });
  await expectToBeVisibleInTheDocument('input-readonly');
  await expectToBeVisibleInTheDocument('label', screen.findByText);
  await expectToBeVisibleInTheDocument('fallback', screen.findByText);
};

export const expectTypeToCallOnChange = async <T extends object>(
  renderComponent: (props: T) => RenderResult,
  props: T,
  getInput: () => Promise<HTMLElement>,
) => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  renderComponent({ onChange: onChangeMock, ...props });
  const input = await getInput();
  expect(input).not.toBeDisabled();
  await user.type(input, '1');
  expect(onChangeMock).toHaveBeenCalledTimes(1);
};

export const expectTypeNotToCallOnChange = async <T extends object>(
  renderComponent: (props: T) => RenderResult,
  props: T,
  getInput: () => Promise<HTMLElement>,
) => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  renderComponent({ onChange: onChangeMock, disabled: true, ...props } as T);
  const inputDisabled = await getInput();
  expect(inputDisabled).toBeDisabled();
  await user.type(inputDisabled, 'p');
  expect(onChangeMock).toHaveBeenCalledTimes(0);
};

export const expectClickToCallOnChange = async <T extends object>(
  renderComponent: (props: T) => RenderResult,
  props: T,
  getInput: () => Promise<HTMLElement>,
) => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  renderComponent({ onChange: onChangeMock, ...props });
  const input = await getInput();
  expect(input).not.toBeDisabled();
  await user.click(input);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
};

export const expectClickNotToCallOnChange = async <T extends object>(
  renderComponent: (props: T) => RenderResult,
  props: T,
  getInput: () => Promise<HTMLElement>,
) => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  renderComponent({ onChange: onChangeMock, disabled: true, ...props } as T);
  const input = await getInput();
  expect(input).toBeDisabled();
  await user.click(input);
  expect(onChangeMock).toHaveBeenCalledTimes(0);
};
