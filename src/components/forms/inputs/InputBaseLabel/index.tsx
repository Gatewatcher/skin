import { format } from '@gatewatcher/bistoury/utils-date';
import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isFunction, withoutKey } from '@gatewatcher/bistoury/utils-lang';
import type {
  AriaRole,
  ChangeEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import { useMemo } from 'react';

import type { LabelProps } from '@/skin/displays/Label';
import Label from '@/skin/displays/Label';
import FieldHelpers from '@/skin/forms/FieldHelpers';
import type { RuleObject } from '@/skin/forms/Form/interface';
import { Stack } from '@/skin/layout';

import {
  DEFAULT_READONLY_MODE,
  DEFAULT_RENDER_READONLY_MODE,
} from '../constants';
import type {
  InputReadonlyMode,
  InputSharedProps,
  TextAreaSharedProps,
} from '../types';
import {
  DEFAULT_LABEL_DIRECTION,
  DEFAULT_WITH_FORMATTING,
  DEFAULT_WITH_LABEL,
  STRING_RULES_TO_ATTRIBUTES,
  VALID_PROPS_RULES,
} from './constants';

import styles from './styles.module.scss';

export type InputBaseLabelProps = (InputSharedProps | TextAreaSharedProps) & {
  children: (props: InputBaseRenderProps) => ReactElement;
  preventAutocomplete?: boolean;
  renderReadonlyMode?: (props: InputBaseRenderProps) => ReactNode;
  withFormatting?: boolean;
};

export type InputBaseRenderExtraProps = {
  fitContent?: boolean;
  withLabel?: boolean;
  withErrors: boolean;
};

export type InputBaseRenderProps = InputBaseRenderExtraProps & {
  disabled: boolean;
  name: string;
  label: LabelProps['label'];
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  preventAutocomplete?: boolean;
  readOnly: boolean;
  required: boolean;
  role?: AriaRole;
  value: string | number | readonly string[] | undefined;
  readonlyMode: InputReadonlyMode;
  flexGrow?: number;
};

const InputBaseLabel = (props: InputBaseLabelProps) => {
  const {
    children,
    className,
    'data-testid': testId = 'input-base-label',
    disabled = false,
    fitContent,
    flexGrow,
    form,
    htmlFor,
    label,
    labelDirection = DEFAULT_LABEL_DIRECTION,
    meta,
    name: nameProps,
    onChange,
    placeholder,
    preventAutocomplete,
    readOnly,
    readonlyMode = DEFAULT_READONLY_MODE,
    renderReadonlyMode = DEFAULT_RENDER_READONLY_MODE,
    required,
    role,
    tooltip,
    value,
    withFormatting = DEFAULT_WITH_FORMATTING,
    withLabel = DEFAULT_WITH_LABEL,
    withRequiredMark,
    ...rest
  } = props;

  const { errors, warnings, helpers, rules } = meta || {};
  const name = nameProps ?? meta?.name?.toString() ?? '';

  const isRequired =
    required !== undefined
      ? required
      : !!(
          rules &&
          rules.some(rule => {
            if (
              rule &&
              typeof rule === 'object' &&
              rule.required &&
              !rule.warningOnly
            ) {
              return true;
            }
            if (isFunction(rule)) {
              const ruleEntity = (rule as Function)(form);
              return (
                ruleEntity && ruleEntity.required && !ruleEntity.warningOnly
              );
            }
            return false;
          })
        );

  const filterValidationProps = (
    additionalProps: Partial<InputBaseLabelProps>,
    rules?: RuleObject[],
  ) => {
    type ValueType = number | boolean | string;
    type KeyOfInputBaseLabelProps = keyof InputBaseLabelProps;
    type KeyOfRuleObject = keyof RuleObject;

    const validationProps: Record<string, ValueType> = {};
    const reducedRules: RuleObject =
      rules?.reduce((prev, curr) => ({ ...curr, ...prev }), {}) ?? {};

    VALID_PROPS_RULES.forEach(validKey => {
      if (Object.hasOwn(additionalProps, validKey)) {
        validationProps[validKey] =
          additionalProps[validKey as KeyOfInputBaseLabelProps];
      }

      if (reducedRules && Object.hasOwn(reducedRules, validKey)) {
        const rule = reducedRules[validKey as KeyOfRuleObject] as ValueType;

        if (reducedRules.type === 'date') {
          validationProps[validKey] = format(
            rule as string | number,
            'YYYY-MM-DD',
          );
        } else if (reducedRules.type === 'string') {
          const formatKeys =
            STRING_RULES_TO_ATTRIBUTES[
              validKey as keyof Pick<RuleObject, 'len' | 'min' | 'max'>
            ];

          formatKeys.forEach(key => (validationProps[key] = rule));
        } else {
          validationProps[validKey] = rule;
        }
      }
    });

    return validationProps;
  };

  const validationProps = filterValidationProps(rest, rules);

  const renderProps: InputBaseRenderProps = {
    disabled,
    fitContent,
    label,
    name: preventAutocomplete ? '' : name,
    onChange,
    placeholder,
    preventAutocomplete,
    readOnly: readonlyMode.enabled ?? readOnly ?? false,
    required: isRequired,
    role,
    value,
    withErrors: !!errors?.length,
    readonlyMode,
    withLabel,
    flexGrow,
    ...rest,
    ...validationProps,
  };

  const childNode = children(
    withoutKey(renderProps, ['withLabel', 'preventAutocomplete']),
  );

  const isRowDirection =
    labelDirection === 'row' || labelDirection === 'row-reverse';

  const showFieldHelpers = useMemo(
    () => !!(errors?.length || helpers?.length || warnings?.length),
    [errors, helpers, warnings],
  );

  let content;

  if (readonlyMode.enabled) {
    return renderReadonlyMode?.(renderProps);
  }

  if (!withFormatting) {
    content = childNode;
  } else {
    content = htmlFor ? (
      <Stack
        className={className}
        direction={labelDirection}
        flexGrow={flexGrow}
        gap={4}
        {...(isRowDirection && { alignItems: 'center' })}
      >
        {withLabel && (
          <Label
            className={classNames(styles.label, flexGrow && styles.labelGrow)}
            htmlFor={htmlFor}
            isRequired={isRequired}
            label={label}
            name={name}
            obfuscated={preventAutocomplete}
            tooltip={tooltip}
            withRequiredMark={withRequiredMark}
          />
        )}
        {childNode}
      </Stack>
    ) : (
      <Label
        className={classNames(
          className,
          styles.label,
          flexGrow && styles.labelGrow,
        )}
        isRequired={isRequired}
        label={label}
        name={name}
        obfuscated={preventAutocomplete}
        tooltip={tooltip}
        withRequiredMark={withRequiredMark}
      >
        {({ labelText }) => {
          return (
            <Stack
              className={classNames(
                styles.labelTextContainer,
                flexGrow && styles.labelTextContainerGrow,
              )}
              direction={labelDirection}
              gap={4}
            >
              {withLabel && labelText}
              {childNode}
            </Stack>
          );
        }}
      </Label>
    );
  }

  return (
    <Stack
      as="span"
      data-testid={testId}
      direction="column"
      flexGrow={flexGrow}
      gap={4}
    >
      {content}
      {showFieldHelpers && (
        <FieldHelpers errors={errors} helpers={helpers} warnings={warnings} />
      )}
    </Stack>
  );
};

export default InputBaseLabel;
