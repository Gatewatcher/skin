import type { Mode as DateMode } from '@gatewatcher/bistoury/utils-date';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { MouseEventHandler, ReactElement } from 'react';

import { ButtonClose } from '@/skin/actions';
import { Chip, DateTime } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { OverflownText, Title } from '@/skin/typography';

import { DEFAULT_DATE_MODE } from './constants';
import type { NotificationType } from './types';

import styles from './styles.module.scss';

export type NotificationProps = DataTestId & {
  content: string;
  date?: string;
  dateFormat?: string;
  dateMode?: DateMode;
  link?: ReactElement;
  onClose?: MouseEventHandler;
  title: string;
  type?: NotificationType;
};

const Notification = ({
  'data-testid': testId = 'notification',
  content,
  link,
  date,
  dateFormat,
  dateMode = DEFAULT_DATE_MODE,
  onClose,
  title,
  type,
}: NotificationProps) => {
  return (
    <Stack
      className={styles.Notification}
      data-testid={testId}
      direction="column"
      gap={2}
      padding={{ y: 6 }}
    >
      <Stack
        alignItems="center"
        as="header"
        className={styles.header}
        justifyContent="space-between"
      >
        <Title as="h5">{title}</Title>

        <div className={styles.close}>
          {onClose && <ButtonClose onClick={onClose} />}
        </div>
      </Stack>

      <Stack className={styles.content} gap={6} justifyContent="space-between">
        <Stack.Item className={styles.NotificationContent}>
          <OverflownText>{content}</OverflownText>
        </Stack.Item>
        {date && (
          <Stack.Item flexShrink={0}>
            <DateTime date={date} format={dateFormat} mode={dateMode} />
          </Stack.Item>
        )}
      </Stack>

      {(!!type || !!link) && (
        <Stack
          alignItems="center"
          as="footer"
          className={styles.footer}
          justifyContent="space-between"
          margin={{ top: 2 }}
        >
          {type && <Chip type={type}>{type}</Chip>}
          {link}
        </Stack>
      )}
    </Stack>
  );
};

export default Notification;
