import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { InternalText } from '@/skin/typography/Text';

import styles from './styles.module.scss';

export type AffixInternalProps = {
  type: 'prefix' | 'suffix';
};

export type AffixProps = DataTestId & {
  children: ReactNode;
};

const Affix = ({
  type,
  children,
  'data-testid': testId = 'affix',
}: AffixProps & AffixInternalProps) => {
  const classnames = classNames(
    styles.affix,
    stylesToCamelCase(styles, 'affix', type),
  );

  return isString(children) ? (
    <InternalText className={classnames} data-testid={testId}>
      {children}
    </InternalText>
  ) : (
    <div className={classnames} data-testid={testId}>
      {children}
    </div>
  );
};

export default Affix;
