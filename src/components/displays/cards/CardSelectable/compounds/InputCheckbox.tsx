import { Input, type InputCheckboxProps } from '@/skin/forms';

export type CardSelectableInputRadioProps = InputCheckboxProps;

export const InputCheckbox = (props: CardSelectableInputRadioProps) => {
  return <Input.Checkbox {...props} />;
};
