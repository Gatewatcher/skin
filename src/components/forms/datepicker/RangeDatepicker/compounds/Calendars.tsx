import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { Grid } from '@/skin/layout';

import Calendar from '../../DatepickerBase/components/Calendar';
import InputsContainer from '../../DatepickerBase/components/InputsContainer';
import Navigation from '../../DatepickerBase/components/Navigation';
import { DEFAULT_WITH_INPUTS } from '../constants';

export type CalendarsProps = DataTestId & {
  fromLabel?: string;
  toLabel?: string;
  withInputs?: boolean;
};

const Calendars = ({
  'data-testid': testId = 'datepicker-calendars',
  withInputs = DEFAULT_WITH_INPUTS,
}: CalendarsProps) => (
  <Grid columns={2} data-testid={testId} gap={{ x: 13, y: 9 }} isContainer>
    {withInputs && (
      <Grid colSpan={2} isItem>
        <InputsContainer />
      </Grid>
    )}

    <Grid colSpan={2} isItem>
      <Navigation />
    </Grid>

    <Grid isItem>
      <Calendar type="from" />
    </Grid>
    <Grid isItem>
      <Calendar type="to" />
    </Grid>
  </Grid>
);

export default Calendars;
