import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isFunction, isString } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ComponentProps, ReactNode } from 'react';

import { InfoTooltip } from '@/skin/displays';
import { Stack } from '@/skin/layout';

import ObfuscatedText from '../ObfuscatedText';
import ComplexLabel, { type ObjectLabel } from './ComplexLabel';
import SimpleLabel from './SimpleLabel';
import { DEFAULT_WITH_REQUIRED_MARK } from './constants';

import styles from './styles.module.scss';

type LabelChildRenderProps = {
  labelText: ReactNode;
};

export type LabelProps = DataTestId &
  Omit<ComponentProps<'label'>, 'children'> & {
    children?: ReactNode | ((options: LabelChildRenderProps) => ReactNode);
    isRequired?: boolean;
    label?: string | ObjectLabel;
    name?: string;
    obfuscated?: boolean;
    tooltip?: ReactNode;
    withRequiredMark?: boolean;
  };

const Label = ({
  children,
  className,
  'data-testid': testId = 'label',
  isRequired,
  label: labelProps,
  name,
  obfuscated = false,
  tooltip,
  withRequiredMark = DEFAULT_WITH_REQUIRED_MARK,
  ...rest
}: LabelProps) => {
  const label = labelProps ?? name;
  const shouldMarkRequired = !!isRequired && withRequiredMark;

  if (!label && !children) {
    return null;
  }

  if (!label && isString(children)) {
    const text = isRequired ? `${children} *` : children;
    return obfuscated ? <ObfuscatedText text={text} /> : text;
  }

  const labelNode = (
    <Stack alignItems="center" as="span" data-testid={testId} gap={2}>
      {!!label && isString(label) && (
        <SimpleLabel
          isRequired={shouldMarkRequired}
          label={label}
          obfuscated={obfuscated}
        />
      )}
      {!!label && !isString(label) && (
        <ComplexLabel
          isRequired={shouldMarkRequired}
          label={label}
          obfuscated={obfuscated}
        />
      )}
      {tooltip && <InfoTooltip info={tooltip} />}
    </Stack>
  );

  return (
    <label
      aria-label={isString(label) ? label : label?.primary}
      className={classNames(styles.Label, className)}
      data-testid={testId}
      {...rest}
    >
      {!children && labelNode}
      {isFunction(children) &&
        children({ labelText: label ? labelNode : null })}
      {!!children && !isFunction(children) && (
        <>
          {labelNode}
          {isString(children) && obfuscated ? (
            <ObfuscatedText text={children} />
          ) : (
            children
          )}
        </>
      )}
    </label>
  );
};

export default Label;
