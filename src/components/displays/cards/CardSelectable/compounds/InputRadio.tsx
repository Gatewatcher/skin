import { Input, type InputRadioProps } from '@/skin/forms';

export type CardSelectableInputRadioProps = InputRadioProps;

export const InputRadio = (props: CardSelectableInputRadioProps) => {
  return <Input.Radio {...props} withLabel={false} />;
};
