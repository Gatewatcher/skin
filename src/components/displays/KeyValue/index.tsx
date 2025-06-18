import { isString } from '@gatewatcher/bistoury/utils-lang';
import type {
  DataTestId,
  RequiredOnly,
} from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import type { KeyValueEntry } from '../KeyValueDisplay/types';
import { DEFAULT_KEY_VALUE_VARIANT, DEFAULT_VALUE_FALLBACK } from './constants';
import type { KeyValueVariant } from './types';

export type KeyValueProps = DataTestId &
  RequiredOnly<KeyValueEntry, 'label'> & {
    valueFallback?: ReactNode;
    variant?: KeyValueVariant;
  };

const KeyValue = ({
  'data-testid': testId,
  label,
  value: valueProps,
  valueFallback = DEFAULT_VALUE_FALLBACK,
  variant = DEFAULT_KEY_VALUE_VARIANT,
}: KeyValueProps) => {
  if (typeof valueProps === 'boolean') {
    console.warn('Value is a boolan. Please cast to other type');
  }

  const value =
    typeof valueProps !== 'boolean' && typeof valueProps !== 'object'
      ? valueProps?.toString() || valueFallback
      : valueProps || valueFallback;

  return variant === 'column' ? (
    <Stack data-testid={testId} direction="column" gap={2}>
      {label && (
        <Stack.Item>
          {isString(label) ? <Text as="strong">{label}</Text> : label}
        </Stack.Item>
      )}
      <Stack.Item>{isString(value) ? <Text>{value}</Text> : value}</Stack.Item>
    </Stack>
  ) : (
    <Stack data-testid={testId} gap={6}>
      {isString(label) ? <Text as="strong">{label}</Text> : label}
      {isString(value) ? <Text>{value}</Text> : value}
    </Stack>
  );
};

export default KeyValue;
