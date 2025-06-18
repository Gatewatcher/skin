import type { PropsWithChildren } from 'react';

import { ButtonIcon } from '@/skin/actions';
import { Icon } from '@/skin/displays';
import { Grid, Stack } from '@/skin/layout';
import { NeutralText } from '@/skin/typography';

import { useDatepickerContext } from '../context';

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <NeutralText
      size="small"
      variant={theme => (theme === 'dark' ? 400 : 500)}
      weight="medium"
    >
      {children}
    </NeutralText>
  );
};

export const Navigation = () => {
  const { propGetters, data, mode } = useDatepickerContext();
  const { addOffset, subtractOffset } = propGetters;

  const { calendars } = data;

  const current = calendars[0];
  const previous = calendars?.[1];

  if (mode === 'single') {
    return (
      <Stack justifyContent="space-between">
        <ButtonIcon
          icon="ChevronLeft"
          type="neutral"
          variant="transparent"
          {...subtractOffset({ months: 1 })}
        />
        <Label>{`${current.month} ${current.year}`}</Label>
        <ButtonIcon
          icon="ChevronRight"
          type="neutral"
          variant="transparent"
          {...addOffset({ months: 1 })}
        />
      </Stack>
    );
  }

  return (
    <Grid columns={2} isContainer>
      <Grid isItem>
        <Stack justifyContent="space-between">
          <ButtonIcon
            icon="ChevronLeft"
            type="neutral"
            variant="transparent"
            {...subtractOffset({ months: 1 })}
          />
          <Label>{`${previous.month} ${previous.year}`}</Label>
          <Icon name="Empty" />
        </Stack>
      </Grid>

      <Grid isItem>
        <Stack justifyContent="space-between">
          <Icon name="Empty" />
          <Label>{`${current.month} ${current.year}`}</Label>
          <ButtonIcon
            icon="ChevronRight"
            type="neutral"
            variant="transparent"
            {...addOffset({ months: 1 })}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Navigation;
