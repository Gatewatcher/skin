import type { Mode as DateMode } from '@gatewatcher/bistoury/utils-date';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { DateTimeAbsolute, DateTimeRelative } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import { Title } from '@/skin/typography';

import Accordion from '../Accordion';
import Markdown from '../Markdown';
import { DEFAULT_DATE_MODE, TEST_ID } from './constants';

type ChangelogRawType = {
  version: string;
  date: string;
  data: string;
};

export type ChangelogProps = DataTestId & {
  changelog: ChangelogRawType[];
  dateMode?: DateMode;
};

const Changelog = ({
  changelog,
  'data-testid': testId = TEST_ID,
  dateMode = DEFAULT_DATE_MODE,
}: ChangelogProps) => {
  const DateTime =
    dateMode === 'absolute' ? DateTimeAbsolute : DateTimeRelative;

  return (
    <Accordion.Group data-testid={testId}>
      {changelog?.map(raw => (
        <Accordion
          key={raw.version}
          title={
            <Stack flexGrow={1} justifyContent="space-between">
              <Title as="h5">{raw.version}</Title>
              <DateTime as="span" date={raw.date} />
            </Stack>
          }
        >
          <Markdown>{raw.data}</Markdown>
        </Accordion>
      ))}
    </Accordion.Group>
  );
};

export default Changelog;
