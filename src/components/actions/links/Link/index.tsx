import { withoutKey } from '@gatewatcher/bistoury/utils-lang';
import { forwardRef } from 'react';

import type { LinkExternalProps } from '../LinkExternal';
import LinkExternal from '../LinkExternal';
import type { LinkInternalProps } from '../LinkInternal';
import LinkInternal from '../LinkInternal';
import { isExternalLink } from '../utils';

export type LinkProps = LinkInternalProps &
  LinkExternalProps & {
    isExternal?: boolean;
    isInline?: boolean;
  };

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ isExternal, to, withIcon, isInline = false, ...rest }, ref) => {
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
  },
);

export default Link;
