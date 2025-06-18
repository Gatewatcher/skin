import type { AffixProps } from './Affix';
import Affix from './Affix';

export type PrefixProps = AffixProps;

const Prefix = (props: PrefixProps) => {
  return <Affix data-testid="prefix" type="prefix" {...props} />;
};

export default Prefix;
