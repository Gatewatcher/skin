import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import Avatar from '../Avatar';
import { DEFAULT_AVATAR_USERNAME_SIZE, TEXT_SIZES } from './constants';
import type { AvatarUsernameSize } from './types';

export type AvatarUsernameProps = DataTestId & {
  colorGenerator?: string;
  image?: string;
  size?: AvatarUsernameSize;
  username: string;
  usernameElement?: (username: string) => ReactNode;
};

const AvatarUsername = ({
  'data-testid': testId = 'avatar-username',
  image,
  size = DEFAULT_AVATAR_USERNAME_SIZE,
  username,
  usernameElement: usernameElementProps,
  colorGenerator = username,
}: AvatarUsernameProps) => {
  const usernameElement = usernameElementProps ? (
    usernameElementProps(username)
  ) : (
    <Text size={TEXT_SIZES[size]}>{username}</Text>
  );

  return (
    <Stack alignItems="center" data-testid={testId} gap={4}>
      <Avatar
        colorGenerator={colorGenerator}
        image={image}
        size={size}
        username={username}
        withTooltip={false}
      />
      {usernameElement}
    </Stack>
  );
};

export default AvatarUsername;
