import type { FieldHelpersProps } from './FieldHelpers';
import FieldHelpers from './FieldHelpers';
import type { FormProps } from './Form';
import Form from './Form';
import { useCurrentForm } from './Form/hooks/useCurrentForm';
import useForm from './Form/hooks/useForm';
import useValidity from './Form/hooks/useValidity';
import useWatch from './Form/hooks/useWatch';
import type { JsonFormProps } from './JsonForm';
import JsonForm from './JsonForm';
import Wysiwyg, { type WysiwygProps } from './Wysiwyg';
import RangeDatepicker, {
  type RangeDatepickerProps,
} from './datepicker/RangeDatepicker';
import SingleDatepicker, {
  type SingleDatepickerProps,
} from './datepicker/SingleDatepicker';
import DropdownMultiSelect, {
  type DropdownMultiSelectProps,
} from './dropdownSelect/DropdownMultiSelect';
import DropdownSelect, {
  type DropdownSelectProps,
} from './dropdownSelect/DropdownSelect';
import AdvancedFilter, {
  type AdvancedFilterItemType,
  type AdvancedFilterProps,
  type AdvancedFilters,
} from './inputs/AdvancedFilter/AdvancedFilter';
import ChatBox, {
  type ChatBoxProps as InputChatBoxProps,
} from './inputs/ChatBox';
import Checkbox, {
  type CheckboxProps as InputCheckboxProps,
} from './inputs/Checkbox';
import ColorPalette from './inputs/ColorPalette';
import Conditioner from './inputs/Conditioner';
import type { ConditionerContextType } from './inputs/Conditioner/context';
import type {
  Operator as ConditionOperator,
  Operators as ConditionOperators,
  ConditionType as ConditionerConditionType,
  LogicalGroupType as ConditionerLogicalGroupType,
} from './inputs/Conditioner/types';
import CronScheduler, { type CronSchedulerProps } from './inputs/CronScheduler';
import Date, { type DateProps as InputDateProps } from './inputs/Date';
import Dropzone, {
  type DropzoneProps as InputDropzoneProps,
} from './inputs/Dropzone';
import { useDropzone } from './inputs/Dropzone/contexts';
import Email, { type EmailProps as InputEmailProps } from './inputs/Email';
import File, {
  type FileChangeEvent as InputFileChangeEvent,
  type FileChangeEventParams as InputFileChangeEventParams,
  type FileProps as InputFileProps,
} from './inputs/File';
import FileImage, {
  type FileImageProps as InputFileImageProps,
} from './inputs/FileImage';
import Markdown, {
  type MarkdownProps as InputMarkdownProps,
} from './inputs/Markdown';
import Number, { type NumberProps as InputNumberProps } from './inputs/Number';
import Password, {
  type PasswordProps as InputPasswordProps,
} from './inputs/Password';
import PinCode, {
  type PinCodeProps as InputPinCodeProps,
} from './inputs/PinCode';
import Radio, { type RadioProps as InputRadioProps } from './inputs/Radio';
import Range, { type RangeProps as InputRangeProps } from './inputs/Range';
import SelectableCard, {
  type SelectableCardProps,
} from './inputs/SelectableCard';
import SelectableGrid, {
  type SelectableGridChangeEvent as InputSelectableGridChangeEvent,
  type SelectableGridProps as InputSelectableGridProps,
} from './inputs/SelectableGrid';
import Slider, { type SliderProps as InputSliderProps } from './inputs/Slider';
import Switch, { type SwitchProps as InputSwitchProps } from './inputs/Switch';
import Text, { type TextProps as InputTextProps } from './inputs/Text';
import TextArea, {
  type TextAreaProps as InputTextAreaProps,
} from './inputs/TextArea';
import Url, { type UrlProps as InputUrlProps } from './inputs/Url';
import MultiSelect, {
  type MultiSelectProps as InputMultiSelectProps,
} from './inputs/select/MultiSelect';
import Select, {
  type SelectProps as InputSelectProps,
} from './inputs/select/Select';
import type {
  NewMultiValue as SelectMultiValue,
  Option as SelectOption,
  OptionGroup as SelectOptionGroup,
  OptionsOrGroups as SelectOptionsOrGroups,
  NewSingleValue as SelectSingleValue,
} from './inputs/select/SelectBase/types';
import type {
  Choice,
  ChoicePrimitiveValue,
  InputMeta,
  InputProps,
  InputSharedProps,
  TextAreaSharedProps,
} from './inputs/types';
import Upload, {
  type UploadProps as InputUploadProps,
} from './inputs/uploads/Upload';
import Uploader, {
  type UploaderProps as InputUploaderProps,
} from './inputs/uploads/Uploader';
import SearchBar, { type SearchBarProps } from './search/SearchBar';
import SearchBarWithSuggestions, {
  type SearchBarWithSuggestionsProps,
} from './search/SearchBarWithSuggestions';

export { docToHtml } from './Wysiwyg/utils';
export {
  type GenerateSelectOptionsFromArrayOptions,
  generateCommonSelectOptions,
  generateSelectOptionsFromArray,
  generateSelectOptionsFromObject,
} from './inputs/select/Select/utils';

export type { ListField } from './Form/compounds/List';
export type { FieldsErrors, FormInstance, Rule } from './Form/interface';
export type { Options, OptionsChangeHandler } from './JsonForm/types';

export { createUploadFile } from './inputs/uploads/utils';
export { trimValue } from './Form/utils/valueUtil';

export {
  AdvancedFilter,
  CronScheduler,
  DropdownMultiSelect,
  DropdownSelect,
  FieldHelpers,
  Form,
  JsonForm,
  RangeDatepicker,
  SingleDatepicker,
  SearchBar,
  SearchBarWithSuggestions,
  Wysiwyg,
  useForm,
  useCurrentForm,
  useWatch,
  useValidity,
  useDropzone,
};

export const Input = {
  ChatBox,
  Checkbox,
  ColorPalette,
  Conditioner,
  CronScheduler,
  Date,
  Dropzone,
  Email,
  File,
  FileImage,
  Number,
  Markdown,
  Password,
  PinCode,
  Radio,
  Range,
  Select,
  MultiSelect,
  SelectableCard,
  SelectableGrid,
  Slider,
  Switch,
  Text,
  TextArea,
  Upload,
  Uploader,
  Url,
};

export type {
  AdvancedFilterItemType,
  AdvancedFilters,
  AdvancedFilterProps,
  Choice,
  ChoicePrimitiveValue,
  ConditionerConditionType,
  ConditionerContextType,
  CronSchedulerProps,
  DropdownMultiSelectProps,
  DropdownSelectProps,
  FieldHelpersProps,
  FormProps,
  InputChatBoxProps,
  InputCheckboxProps,
  InputDateProps,
  InputDropzoneProps,
  InputEmailProps,
  InputFileProps,
  InputFileChangeEvent,
  InputFileChangeEventParams,
  InputFileImageProps,
  InputMarkdownProps,
  InputMeta,
  InputMultiSelectProps,
  InputNumberProps,
  InputPinCodeProps,
  InputPasswordProps,
  InputProps,
  InputRadioProps,
  InputRangeProps,
  InputSelectProps,
  InputSelectableGridProps,
  InputSelectableGridChangeEvent,
  InputSharedProps,
  InputSliderProps,
  InputSwitchProps,
  InputTextAreaProps,
  InputTextProps,
  InputUploadProps,
  InputUploaderProps,
  InputUrlProps,
  JsonFormProps,
  ConditionOperators,
  ConditionOperator,
  RangeDatepickerProps,
  SingleDatepickerProps,
  ConditionerLogicalGroupType,
  SelectableCardProps,
  SelectOption,
  SelectOptionGroup,
  SelectOptionsOrGroups,
  SelectMultiValue,
  SelectSingleValue,
  SearchBarProps,
  SearchBarWithSuggestionsProps,
  TextAreaSharedProps,
  WysiwygProps,
};
