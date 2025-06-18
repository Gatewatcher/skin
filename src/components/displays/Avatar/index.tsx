import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type {
  DataTestId,
  RequiredAtLeastOne,
} from '@gatewatcher/bistoury/utils-types';

import { Stack as SkinStack } from '@/skin/layout';

import Tooltip from '../floating/Tooltip';
import Stack from './compounds/Stack';
import { DEFAULT_SIZE, DEFAULT_WITH_TOOLTIP } from './constants';
import type { AvatarSize } from './types';
import { getAvatarColor } from './utils';

import styles from './styles.module.scss';

export type AvatarBaseProps = DataTestId & {
  colorGenerator?: string;
  image?: string;
  size?: AvatarSize;
  username?: string;
  withTooltip?: boolean;
};

export type AvatarProps = RequiredAtLeastOne<
  AvatarBaseProps,
  'image' | 'username'
>;

const Avatar = ({
  'data-testid': testId = 'avatar',
  image,
  size = DEFAULT_SIZE,
  username = '',
  withTooltip = DEFAULT_WITH_TOOLTIP,
  colorGenerator = username,
}: AvatarProps) => {
  const color = getAvatarColor(colorGenerator);

  const content = (
    <SkinStack
      alignItems="center"
      className={styles.content}
      justifyContent="center"
    >
      {image ? (
        <img
          className={styles.image}
          data-testid={suffixTestId(testId, 'image')}
          src={image}
        />
      ) : (
        <span
          className={styles.text}
          data-testid={suffixTestId(testId, 'text')}
        >
          {username.at(0)}
        </span>
      )}
    </SkinStack>
  );

  return (
    <SkinStack
      className={classNames(
        styles.Avatar,
        stylesToCamelCase(styles, 'size', size),
      )}
      alignItems="center"
      data-testid={testId}
      justifyContent="center"
      style={{ backgroundColor: color }}
    >
      {withTooltip && username ? (
        <Tooltip
          content={username}
          triggerClassName={styles.tooltipTrigger}
          triggerOn="hover"
          withStopPropagation={false}
        >
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </SkinStack>
  );
};

Avatar.Stack = Stack;

export default Avatar;
