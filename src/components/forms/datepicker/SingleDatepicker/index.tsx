import { memo } from 'react';

import type { DatepickerBaseProps } from '../DatepickerBase';
import DatepickerBase from '../DatepickerBase';
import Actions from '../DatepickerBase/compounds/Actions';
import Apply from '../DatepickerBase/compounds/Apply';
import Clear from '../DatepickerBase/compounds/Clear';
import Close from '../DatepickerBase/compounds/Close';
import Footer from '../DatepickerBase/compounds/Footer';
import Main from '../DatepickerBase/compounds/Main';
import Calendar from './compounds/Calendar';

export type SingleDatepickerProps = DatepickerBaseProps<'single'>;

const SingleDatepicker = ({
  'data-testid': testId = 'single-datepicker',
  ...rest
}: SingleDatepickerProps) => {
  return <DatepickerBase data-testid={testId} mode="single" {...rest} />;
};

SingleDatepicker.Actions = memo(Actions);
SingleDatepicker.Apply = memo(Apply);
SingleDatepicker.Calendar = memo(Calendar);
SingleDatepicker.Clear = memo(Clear);
SingleDatepicker.Close = memo(Close);
SingleDatepicker.Footer = memo(Footer);
SingleDatepicker.Main = memo(Main);

export default SingleDatepicker;
