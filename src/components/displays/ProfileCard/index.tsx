import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import Avatar from '../Avatar';
import Card from '../cards/Card';

import styles from './styles.module.scss';

export type ProfileCardProps = DataTestId & {
  username: string;
  email: string;
  fullname?: string;
  id?: string;
};

const ProfileCard = ({
  'data-testid': testId,
  username,
  email,
  fullname = '-',
  id,
}: ProfileCardProps) => {
  return (
    <Card className={styles.card} data-testid={testId}>
      <Stack className={styles.header} />

      <Stack gap={6} padding={{ x: 6, y: 7 }}>
        <Avatar
          colorGenerator={id}
          size="xLarge"
          username={username}
          withTooltip={false}
        />

        <Stack direction="column">
          <Stack.Item className={styles.name}>
            <Text weight="semibold" currentColor>
              {fullname}
            </Text>
          </Stack.Item>
          <Stack.Item className={styles.email}>
            <Text size="small" currentColor>
              {email}
            </Text>
          </Stack.Item>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
