import type { FormProps } from '.';
import Form from '.';
import ApiErrorExample from './examples/ApiErrorExample';
import ContextExample from './examples/ContextExample';
import DependenciesExample from './examples/DependenciesExample';
import GroupExample from './examples/GroupExample';
import InitialValuesExample from './examples/InitialValuesExample';
import ListExample from './examples/ListExample';
import PreserveExample from './examples/PreserveExample';
import SectionExample from './examples/SectionExample';
import UseFormExample from './examples/UseFormExample';
import UseFormIsUnchangedExample from './examples/UseFormIsUnchangedExample';
import UseWatchExample from './examples/UseWatchExample';
import UseWatchListExample from './examples/UseWatchListExample';
import ValidateExample from './examples/ValidateExample';
import ValidatePerfExample from './examples/ValidatePerfExample';
import WithFileExample from './examples/WithFileExample';

export default {
  title: 'forms/Form',
  component: Form,
} as FormProps;

export const Context = () => <ContextExample />;
export const Dependencies = () => <DependenciesExample />;
export const List = () => <ListExample />;
export const Preserve = () => <PreserveExample />;
export const Validate = () => <ValidateExample />;
export const ValidatePerf = () => <ValidatePerfExample />;
export const UseForm = () => <UseFormExample />;
export const UseWatch = () => <UseWatchExample />;
export const UseWatchList = () => <UseWatchListExample />;
export const InitialValues = () => <InitialValuesExample />;
export const Group = () => <GroupExample />;
export const WithFile = () => <WithFileExample />;
export const ApiError = () => <ApiErrorExample />;
export const Section = () => <SectionExample />;
export const UseFormIsUnchanged = () => <UseFormIsUnchangedExample />;
