import { withoutKey } from '@gatewatcher/bistoury/utils-lang';
import type { Ref } from 'react';

import type { LinkExternalProps } from '../LinkExternal';
import LinkExternal from '../LinkExternal';
import type { LinkInternalProps } from '../LinkInternal';
import LinkInternal from '../LinkInternal';
import { isExternalLink } from '../utils';

export type LinkProps = LinkInternalProps &
  LinkExternalProps & {
    isExternal?: boolean;
    isInline?: boolean;
    ref?: Ref<HTMLAnchorElement>;
  };

const Link = ({
  isExternal,
  to,
  withIcon,
  isInline = false,
  ref,
  ...rest
}: LinkProps) => {
  const isAnExternalLink = isExternalLink(to) || isExternal;

  if (!isAnExternalLink) {
    return <LinkInternal ref={ref} inline={isInline} to={to} {...rest} />;
  }

  const externalProps = withoutKey(rest, [
    'preventScrollReset',
    'relative',
  ]) as Omit<LinkExternalProps, 'to' | 'variant'>;

  return (
    <LinkExternal
      ref={ref}
      inline={isInline}
      to={to}
      withIcon={withIcon}
      {...externalProps}
    />
  );
};

export default Link;
