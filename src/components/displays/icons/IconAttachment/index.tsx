import { stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';

import { ICON_DEFAULT_SIZE } from '@/constants';

import type { IconContainedProps } from '../IconContained';
import { InternalIconContained } from '../IconContained';
import { ICONS } from './constants';

import styles from './styles.module.scss';

export type IconAttachmentProps = Omit<
  IconContainedProps,
  'color' | 'currentColor' | 'name'
> & {
  extension: string;
};

const IconAttachment = ({
  'data-testid': testId = 'icon-attachment',
  extension,
  size = ICON_DEFAULT_SIZE,
  ...rest
}: IconAttachmentProps) => {
  const match = ICONS[extension];

  return (
    <InternalIconContained
      color={match?.color || 'red'}
      data-testid={testId}
      internalClassname={stylesToCamelCase(styles, 'icon', size)}
      name={match?.icon || 'CircleHelp'}
      size={size}
      {...rest}
    />
  );
};

export default IconAttachment;
