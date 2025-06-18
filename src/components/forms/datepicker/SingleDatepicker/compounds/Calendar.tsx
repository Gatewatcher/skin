import { Stack } from '@/skin/layout';

import CalendarBase from '../../DatepickerBase/components/Calendar';
import Navigation from '../../DatepickerBase/components/Navigation';

const Calendar = () => {
  return (
    <Stack direction="column" gap={7}>
      <Navigation />

      <CalendarBase />
    </Stack>
  );
};

export default Calendar;
