import type { AffixProps } from './Affix';
import Affix from './Affix';

export type SuffixProps = AffixProps;

const Suffix = (props: SuffixProps) => {
  return <Affix data-testid="suffix" type="suffix" {...props} />;
};

export default Suffix;
