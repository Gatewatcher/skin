import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import ObfuscatedText from '../ObfuscatedText';

export type ObjectLabel = {
  primary: string;
  secondary?: string;
  precision?: string;
};

export type ComplexLabelProps = {
  label: ObjectLabel;
  obfuscated: boolean;
  isRequired: boolean;
};

const ComplexLabel = ({ label, obfuscated, isRequired }: ComplexLabelProps) => {
  const primary = isRequired ? `${label.primary} *` : label.primary;
  const secondary = label.secondary;
  const separator = label.secondary || label.precision ? ' :' : '';
  const precision = label.precision && `(${label.precision})`;

  return (
    <Stack alignItems="baseline" gap={2}>
      <Text transform="capitalizeFirstLetter" weight="medium">
        {obfuscated ? <ObfuscatedText text={primary} /> : primary}
        {separator}
      </Text>
      {secondary && (
        <Text color="green" weight="medium">
          {obfuscated ? <ObfuscatedText text={secondary} /> : secondary}
        </Text>
      )}
      {precision && (
        <Text color="grey" size="small" italic>
          {obfuscated ? <ObfuscatedText text={precision} /> : precision}
        </Text>
      )}
    </Stack>
  );
};

export default ComplexLabel;
