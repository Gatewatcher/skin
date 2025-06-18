import { classNames, stylesToCamelCase } from '@gatewatcher/bistoury/utils-dom';
import { withoutKey } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';

import { Stack as SkinStack } from '@/skin/layout';

import type { AvatarProps } from '..';
import Avatar from '..';
import AvatarUsername from '../../AvatarUsername';
import EllipsisDataPopover from '../../ellipsis/EllipsisDataPopover';
import { DEFAULT_SIZE, DEFAULT_STACK_MAX } from '../constants';
import type { AvatarSize } from '../types';

import styles from '../styles.module.scss';

export type AvatarStackProps = DataTestId & {
  children: ReactElement<AvatarProps>[];
  max?: number;
  size?: AvatarSize;
};

const Stack = ({
  children,
  'data-testid': testId = 'avatar-stack',
  max = DEFAULT_STACK_MAX,
  size = DEFAULT_SIZE,
}: AvatarStackProps) => {
  return (
    <EllipsisDataPopover
      containerProps={{
        className: stylesToCamelCase(styles, 'stackSize', size),
      }}
      ellipsis={({ restData }) => (
        <SkinStack direction="column" gap={4}>
          {restData.map((item, index) =>
            item.props.username ? (
              <AvatarUsername
                key={index}
                username={item.props.username}
                {...withoutKey(item.props, ['size'])}
              />
            ) : (
              <Avatar key={index} {...item.props} />
            ),
          )}
        </SkinStack>
      )}
      triggerClassName={classNames(
        styles.Avatar,
        styles.count,
        stylesToCamelCase(styles, 'size', size),
      )}
      countPosition="custom"
      data={children}
      data-testid={testId}
      direction="row"
      limit={max}
    >
      {(item, index) => cloneElement(item, { key: index, size })}
    </EllipsisDataPopover>
  );
};

export default Stack;
