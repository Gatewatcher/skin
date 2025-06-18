import { Text } from '@/skin/typography';

import ObfuscatedText from '../ObfuscatedText';

export type SimpleLabelProps = {
  label: string;
  obfuscated: boolean;
  isRequired: boolean;
};

const SimpleLabel = ({ label, obfuscated, isRequired }: SimpleLabelProps) => {
  const text = isRequired ? `${label} *` : label;

  return (
    <Text transform="capitalizeFirstLetter" weight="medium">
      {obfuscated ? <ObfuscatedText text={text} /> : text}
    </Text>
  );
};

export default SimpleLabel;
