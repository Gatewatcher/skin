import type { Ref } from 'react';

import type { LinkBaseProps } from '../LinkBase';
import LinkBase from '../LinkBase';
import { DEFAULT_TARGET, DEFAULT_WITH_ICON } from './constants';

export type LinkExternalProps = LinkBaseProps & {
  ref?: Ref<HTMLAnchorElement>;
  withIcon?: boolean | { end?: boolean; start?: boolean };
};

const LinkExternal = ({
  children,
  'data-testid': testId = 'link-external',
  endIcon = 'ExternalLink',
  ref,
  startIcon,
  target = DEFAULT_TARGET,
  withIcon = DEFAULT_WITH_ICON,
  ...rest
}: LinkExternalProps) => {
  const withStartIcon =
    typeof withIcon === 'boolean' ? withIcon : withIcon.start ?? true;
  const withEndIcon =
    typeof withIcon === 'boolean' ? withIcon : withIcon.end ?? true;

  return (
    <LinkBase
      ref={ref}
      data-testid={testId}
      endIcon={withEndIcon ? endIcon : undefined}
      startIcon={withStartIcon ? startIcon : undefined}
      target={target}
      {...rest}
      as="a"
    >
      {children}
    </LinkBase>
  );
};

export default LinkExternal;
