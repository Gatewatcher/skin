import { format } from '@gatewatcher/bistoury/utils-date';
import { first, isFunction, last } from '@gatewatcher/bistoury/utils-lang';
import { consoleWarn } from '@gatewatcher/bistoury/utils-log';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';
import {
  Component,
  Fragment,
  cloneElement,
  isValidElement,
  useContext,
} from 'react';

import type { InputFileChangeEventParams, SelectOption } from '@/skin/forms';

import type {
  EventArgs,
  FieldEntity,
  FieldType,
  FormInstance,
  InternalFormInstance,
  InternalNamePath,
  Meta,
  NamePath,
  NotifyInfo,
  Rule,
  RuleError,
  RuleObject,
  Store,
  StoreValue,
  ValidateOptions,
} from '../../interface';
import toChildrenArray from '../../utils/toArray';
import { toArray } from '../../utils/typeUtil';
import { validateRules } from '../../utils/validateUtil';
import {
  containsNamePath,
  defaultGetValueFromEvent,
  getNamePath,
  getValue,
  trimValue,
} from '../../utils/valueUtil';
import GroupContext from '../Group/GroupContext';
import FieldContext, { HOOK_MARK } from './FieldContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EMPTY_ERRORS: any[] = [];

export type ShouldUpdate<Values = unknown> =
  | boolean
  | ((
      prevValues: Values,
      nextValues: Values,
      info: { source?: string },
    ) => boolean);

const requireUpdate = (
  shouldUpdate: ShouldUpdate,
  prev: StoreValue,
  next: StoreValue,
  prevValue: StoreValue,
  nextValue: StoreValue,
  info: NotifyInfo,
): boolean => {
  if (isFunction(shouldUpdate)) {
    return shouldUpdate(
      prev,
      next,
      'source' in info ? { source: info.source } : {},
    );
  }
  return prevValue !== nextValue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChildProps = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InternalFieldProps<Values = any> {
  children?:
    | ReactElement
    | ((
        control: ChildProps,
        meta: Meta,
        form: FormInstance<Values>,
      ) => ReactNode);

  // Set up `dependencies` field.
  // When dependencies field update and current field is touched,
  // will trigger validate rules and render.
  dependencies?: NamePath[];
  getValueFromEvent?: (...args: EventArgs) => StoreValue;
  name?: InternalNamePath;
  normalize?: (
    value: StoreValue,
    prevValue: StoreValue,
    allValues: Store,
  ) => StoreValue;
  rules?: Rule[];
  shouldUpdate?: ShouldUpdate<Values>;
  trigger?: string;
  validateTrigger?: string | string[] | false;
  validateFirst?: boolean | 'parallel';
  valuePropName?: string;
  getValueProps?: (value: StoreValue) => Record<string, unknown>;
  messageVariables?: Record<string, string>;
  initialValue?: unknown;
  onReset?: () => void;
  onMetaChange?: (meta: Meta & { destroy?: boolean }) => void;
  preserve?: boolean;

  /** @private Passed by Form.List props. Do not use since it will break by path check. */
  isListField?: boolean;

  /** @private Passed by Form.List props. Do not use since it will break by path check. */
  isList?: boolean;

  /** @private Pass context as prop instead of context api
   *  since class component can not get context in constructor */
  fieldContext?: InternalFormInstance;
  isGroupField?: boolean;

  type?: FieldType;
  required?: boolean;
}

export type FieldProps<Values = unknown> = Omit<
  InternalFieldProps<Values>,
  'name' | 'fieldContext' | 'isGroupField'
> &
  DataTestId & {
    name?: NamePath;
  };

export interface FieldState {
  resetCount: number;
}

// We use Class instead of Hooks here since it will cost much code by using Hooks.
class Field
  extends Component<InternalFieldProps, FieldState>
  implements FieldEntity
{
  public static contextType = FieldContext;

  public static defaultProps = {
    trigger: 'onChange',
    valuePropName: 'value',
  };

  public state = {
    resetCount: 0,
  };

  private cancelRegisterFunc:
    | ((
        isListField?: boolean,
        preserve?: boolean,
        namePath?: InternalNamePath,
      ) => void)
    | null = null;

  private mounted = false;

  // Follow state should not management in State since it will async update by React.
  // This makes first render of form can not get correct state value.
  private touched = false;

  // Mark when touched & validated. Currently only used for `dependencies`.
  // Note that we do not think field with `initialValue` is dirty
  // but this will be by `isFieldDirty` func.
  private dirty = false;

  private validatePromise: Promise<RuleError[]> | null = null;

  private prevValidating = false;

  private errors: string[] = EMPTY_ERRORS;
  private warnings: string[] = EMPTY_ERRORS;

  // ============================== Subscriptions ==============================
  constructor(props: InternalFieldProps) {
    super(props);

    // Register on init
    if (props.fieldContext) {
      const { getInternalHooks }: InternalFormInstance = props.fieldContext;
      const { initEntityValue } = getInternalHooks(HOOK_MARK) || {};
      initEntityValue?.(this as FieldEntity);
    }
  }

  public componentDidMount() {
    const { shouldUpdate, fieldContext } = this.props;

    this.mounted = true;

    // Register on init
    if (fieldContext) {
      const { getInternalHooks }: InternalFormInstance = fieldContext;
      const { registerField } = getInternalHooks(HOOK_MARK) || {};
      this.cancelRegisterFunc = registerField?.(this as FieldEntity) || null;
    }

    // One more render for component in case fields not ready
    if (shouldUpdate === true) {
      this.reRender();
    }
  }

  public componentWillUnmount() {
    this.cancelRegister();
    this.triggerMetaEvent(true);
    this.mounted = false;
  }

  public cancelRegister = () => {
    const { preserve, isListField, name } = this.props;

    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc(
        isListField,
        preserve,
        getNamePath(name as NamePath),
      );
    }
    this.cancelRegisterFunc = null;
  };

  // ================================== Utils ==================================
  public getNamePath = (): InternalNamePath => {
    const { name, fieldContext } = this.props;
    const { prefixName = [] }: InternalFormInstance =
      fieldContext as InternalFormInstance;

    return name !== undefined ? [...prefixName, ...name] : [];
  };

  public getRules = (): RuleObject[] => {
    const { rules = [], fieldContext } = this.props;

    const formattedRules = rules.map((rule: Rule): RuleObject => {
      if (isFunction(rule)) {
        return rule(fieldContext as FormInstance);
      }
      return rule;
    });

    if (this.props.required) {
      formattedRules[0] = {
        ...formattedRules[0],
        required: true,
      };
    }

    return formattedRules;
  };

  public reRender() {
    if (!this.mounted) return;
    this.forceUpdate();
  }

  public refresh = () => {
    if (!this.mounted) return;

    // Clean up current node.
    this.setState(({ resetCount }) => ({
      resetCount: resetCount + 1,
    }));
  };

  public triggerMetaEvent = (destroy?: boolean) => {
    const { onMetaChange } = this.props;

    onMetaChange?.({ ...this.getMeta(), destroy });
  };

  // ========================= Field Entity Interfaces =========================
  // Trigger by store update. Check if need update the component
  public onStoreChange: FieldEntity['onStoreChange'] = (
    prevStore,
    namePathList,
    info,
  ) => {
    const { shouldUpdate, dependencies = [], onReset } = this.props;
    const { store } = info;
    const namePath = this.getNamePath();
    const prevValue = this.getValue(prevStore);
    const curValue = this.getValue(store);

    const namePathMatch =
      namePathList && containsNamePath(namePathList, namePath);

    // `setFieldsValue` is a quick access to update related status
    if (
      info.type === 'valueUpdate' &&
      info.source === 'external' &&
      prevValue !== curValue
    ) {
      this.touched = true;
      this.dirty = true;
      this.validatePromise = null;
      this.errors = EMPTY_ERRORS;
      this.warnings = EMPTY_ERRORS;
      this.triggerMetaEvent();
    }

    switch (info.type) {
      case 'reset':
        if (!namePathList || namePathMatch) {
          // Clean up state
          this.touched = false;
          this.dirty = false;
          this.validatePromise = null;
          this.errors = EMPTY_ERRORS;
          this.warnings = EMPTY_ERRORS;
          this.triggerMetaEvent();

          onReset?.();

          this.refresh();
          return;
        }
        break;

      // In case field with `preserve = false` nest deps like:
      // - A = 1 => show B
      // - B = 1 => show C
      // - Reset A, need clean B, C
      case 'remove': {
        if (shouldUpdate) {
          this.reRender();
          return;
        }
        break;
      }

      case 'setField': {
        if (namePathMatch) {
          const { data } = info;

          if ('touched' in data) {
            this.touched = !!data.touched;
          }
          if ('validating' in data && !('originRCField' in data)) {
            this.validatePromise = data.validating ? Promise.resolve([]) : null;
          }
          if ('errors' in data) {
            this.errors = data.errors || EMPTY_ERRORS;
          }
          if ('warnings' in data) {
            this.warnings = data.warnings || EMPTY_ERRORS;
          }
          this.dirty = true;

          this.triggerMetaEvent();

          this.reRender();
          return;
        }

        // Handle update by `setField` with `shouldUpdate`
        if (
          shouldUpdate &&
          !namePath.length &&
          requireUpdate(
            shouldUpdate,
            prevStore,
            store,
            prevValue,
            curValue,
            info,
          )
        ) {
          this.reRender();
          return;
        }
        break;
      }

      case 'dependenciesUpdate': {
        // Trigger when marked `dependencies` updated. Related fields will all update
        const dependencyList = dependencies.map(getNamePath);
        // No need for `namePathMath` check and `shouldUpdate` check, since `valueUpdate` will be
        // emitted earlier and they will work there
        // If set it may cause unnecessary twice rerendering
        if (
          dependencyList.some(dependency =>
            containsNamePath(info.relatedFields, dependency),
          )
        ) {
          this.reRender();
          return;
        }
        break;
      }

      default:
        // 1. If `namePath` exists in `namePathList`, means it's related value and should update
        //      For example <List name="list"><Field name={['list', 0]}></List>
        //      If `namePathList` is [['list']] (List value update), Field should be updated
        //      If `namePathList` is [['list', 0]] (Field value update), List shouldn't be updated
        // 2.
        //   2.1 If `dependencies` is set, `name` is not set and `shouldUpdate` is not set,
        //       don't use `shouldUpdate`. `dependencies` is view as a shortcut if `shouldUpdate`
        //       is not provided
        //   2.2 If `shouldUpdate` provided, use customize logic to update the field
        //       else to check if value changed
        if (
          namePathMatch ||
          ((!dependencies.length || namePath.length || shouldUpdate) &&
            requireUpdate(
              shouldUpdate as ShouldUpdate,
              prevStore,
              store,
              prevValue,
              curValue,
              info,
            ))
        ) {
          this.reRender();
          return;
        }
        break;
    }

    if (shouldUpdate === true) {
      this.reRender();
    }
  };

  public validateRules = (options?: ValidateOptions): Promise<RuleError[]> => {
    // We should fix namePath & value to avoid developer change then by form function
    const namePath = this.getNamePath();
    const currentValue = trimValue(this.getValue());

    // Force change to async to avoid rule OOD under renderProps field
    const rootPromise = Promise.resolve().then(() => {
      if (!this.mounted) {
        return [];
      }

      const { validateFirst = false, messageVariables } = this.props;
      const { triggerName } = (options || {}) as ValidateOptions;

      let filteredRules = this.getRules();
      filteredRules = filteredRules
        .filter(Boolean)
        .filter((rule: RuleObject) => {
          const { type } = rule;
          if (type === 'number' || type === 'integer' || type === 'float') {
            rule.transform ??= value => parseInt(value, 10);
          }

          const { validateTrigger } = rule;
          if (!validateTrigger || !triggerName) {
            return true;
          }
          const triggerList = toArray(validateTrigger);
          return triggerList.includes(triggerName);
        });

      const promise = validateRules(
        namePath,
        currentValue,
        filteredRules,
        options as ValidateOptions,
        validateFirst,
        messageVariables,
      );

      promise
        .catch(e => e)
        .then((ruleErrors: RuleError[] = EMPTY_ERRORS) => {
          if (this.validatePromise === rootPromise) {
            this.validatePromise = null;

            // Get errors & warnings
            const nextErrors: string[] = [];
            const nextWarnings: string[] = [];
            ruleErrors.forEach?.(
              ({ rule: { warningOnly }, errors = EMPTY_ERRORS }) => {
                if (warningOnly) {
                  nextWarnings.push(...errors);
                } else {
                  nextErrors.push(...errors);
                }
              },
            );

            this.errors = nextErrors;
            this.warnings = nextWarnings;
            this.triggerMetaEvent();

            this.reRender();
          }
        });

      return promise;
    });

    this.validatePromise = rootPromise;
    this.dirty = true;
    this.errors = EMPTY_ERRORS;
    this.warnings = EMPTY_ERRORS;
    this.triggerMetaEvent();

    // Force trigger re-render since we need sync renderProps with new meta
    this.reRender();

    return rootPromise;
  };

  public isFieldValidating = () => !!this.validatePromise;

  public isFieldTouched = () => this.touched;

  public isFieldDirty = () => {
    // Touched or validate or has initialValue
    if (this.dirty || this.props.initialValue !== undefined) {
      return true;
    }

    // Form set initialValue
    const { fieldContext } = this.props;
    const { getInitialValue } = fieldContext?.getInternalHooks(HOOK_MARK) || {};
    if (getInitialValue?.(this.getNamePath()) !== undefined) {
      return true;
    }

    return false;
  };

  public getErrors = () => this.errors;

  public getWarnings = () => this.warnings;

  public isListField = () => !!this.props.isListField;

  public isList = () => !!this.props.isList;

  public isPreserve = () => !!this.props.preserve;

  // ============================= Child Component =============================
  public getMeta = (): Meta => {
    // Make error & validating in cache to save perf
    this.prevValidating = this.isFieldValidating();
    const namePath = this.getNamePath();

    const meta: Meta = {
      touched: this.isFieldTouched(),
      validating: this.prevValidating,
      errors: this.errors,
      warnings: this.warnings,
      name: (this.props.isGroupField || this.props.isListField
        ? last(namePath)
        : namePath) as InternalNamePath,
      rules: this.getRules(),
    };

    return meta;
  };

  // Only return validate child node. If invalidate, will do nothing about field.
  public getOnlyChild = (
    children:
      | ReactNode
      | ((control: ChildProps, meta: Meta, context: FormInstance) => ReactNode),
  ): { child: ReactNode | null; isFunction: boolean } => {
    // Support render props
    if (isFunction(children)) {
      const meta = this.getMeta();
      return {
        ...this.getOnlyChild(
          children(
            this.getControlled(),
            meta,
            this.props.fieldContext as InternalFormInstance,
          ),
        ),
        isFunction: true,
      };
    }

    // Filed element only
    const childList = toChildrenArray(children);
    if (childList.length !== 1 || !isValidElement(childList[0])) {
      return { child: childList, isFunction: false };
    }

    return { child: childList[0], isFunction: false };
  };

  // ============================== Field Control ==============================
  public getValue = (store?: Store) => {
    const { getFieldsValue } = this.props.fieldContext as FormInstance;
    const namePath = this.getNamePath();
    return getValue(store || getFieldsValue(true), namePath);
  };

  public getControlled = (childProps: ChildProps = {}) => {
    const {
      trigger,
      validateTrigger,
      getValueFromEvent,
      normalize,
      valuePropName: valuePropNameProps,
      getValueProps,
      fieldContext,
      type,
    } = this.props;

    let normalizeFn = normalize;
    let getValueFromEventFn = getValueFromEvent;
    let getValuePropsFn = getValueProps;
    const valuePropName = type === 'checked' ? 'checked' : valuePropNameProps;

    if (type === 'date') {
      getValuePropsFn ??= (value: StoreValue) => ({
        [valuePropName as string]: value ? format(value, 'YYYY-MM-DD') : value,
      });
    }

    const mergedValidateTrigger =
      validateTrigger !== undefined
        ? validateTrigger
        : fieldContext?.validateTrigger;

    const namePath = this.getNamePath();
    const { getInternalHooks, getFieldsValue } =
      fieldContext as InternalFormInstance;
    const { dispatch } = getInternalHooks(HOOK_MARK) || {};
    const value = this.getValue() ?? '';

    const mergedGetValueProps =
      getValuePropsFn ||
      ((val: StoreValue) => ({ [valuePropName as string]: val }));

    const originTriggerFunc = childProps[trigger as string];

    const control = {
      ...childProps,
      ...mergedGetValueProps(value),
    };

    // Add trigger
    control[trigger as string] = (...args: EventArgs) => {
      // Mark as touched
      this.touched = true;
      this.dirty = true;

      this.triggerMetaEvent();

      if (type === 'select') {
        normalizeFn ??= (item: SelectOption) => item?.value;
      } else if (type === 'multiSelect') {
        normalizeFn ??= (items: SelectOption[]) =>
          items.map(item => item.value);
      } else if (type === 'url') {
        normalizeFn ??= value => `https://${value}`;
      } else if (type === 'number') {
        normalizeFn ??= value => parseInt(value, 10);
      } else if (type === 'file') {
        getValueFromEventFn ??= (event: InputFileChangeEventParams) =>
          first(event.files);
      } else if (type === 'files') {
        getValueFromEventFn ??= (event: InputFileChangeEventParams) =>
          event.files;
      }

      let newValue: StoreValue;
      if (getValueFromEventFn) {
        newValue = getValueFromEventFn(...args);
      } else {
        newValue = defaultGetValueFromEvent(valuePropName as string, ...args);
      }

      if (normalizeFn) {
        newValue = normalizeFn(newValue, value, getFieldsValue(true));
      }

      dispatch?.({
        type: 'updateValue',
        namePath,
        value: newValue,
      });

      if (originTriggerFunc) {
        originTriggerFunc(...args);
      }
    };

    // Add validateTrigger
    const validateTriggerList: string[] = toArray(mergedValidateTrigger || []);

    validateTriggerList.forEach((triggerName: string) => {
      // Wrap additional function of component, so that we can get latest value from store
      const originTrigger = control[triggerName];
      control[triggerName] = (...args: EventArgs) => {
        if (originTrigger) {
          originTrigger(...args);
        }

        // Always use latest rules
        const { rules } = this.props;
        if (
          (rules && rules.length) ||
          this.errors.length ||
          this.props.required
        ) {
          // We dispatch validate to root,
          // since it will update related data with other field with same name
          dispatch?.({
            type: 'validateField',
            namePath,
            triggerName,
          });
        }
      };
    });

    return control;
  };

  public render() {
    const { resetCount } = this.state;
    const { children } = this.props;

    const { child, isFunction } = this.getOnlyChild(children);

    // Not need to `cloneElement` since user can handle this in render function self
    let returnChildNode: ReactNode;
    if (isFunction) {
      returnChildNode = child;
    } else if (isValidElement(child)) {
      returnChildNode = cloneElement(child as ReactElement, {
        ...this.getControlled((child as ReactElement).props),
        meta: { ...this.getMeta(), helpers: child.props?.meta?.helpers },
        form: this.props.fieldContext as InternalFormInstance,
      });
    } else {
      consoleWarn('`children` of Field is not valid ReactElement.');
      returnChildNode = child;
    }

    return <Fragment key={resetCount}>{returnChildNode}</Fragment>;
  }
}

const WrapperField = <Values = unknown,>({
  name,
  ...restProps
}: FieldProps<Values>) => {
  const fieldContext = useContext(FieldContext);
  const groupContext = useContext(GroupContext);

  const namePath = name !== undefined ? getNamePath(name) : undefined;

  let key = 'keep';
  if (!restProps.isListField) {
    key = `_${(namePath || []).join('_')}`;
  }

  // Warning if it's a directly list field.
  // We can still support multiple level field preserve.
  if (
    restProps.preserve === false &&
    restProps.isListField &&
    (namePath?.length || 0) <= 1
  ) {
    consoleWarn('`preserve` should not apply on Form.List fields.');
  }

  return (
    <Field
      key={key}
      name={namePath}
      {...restProps}
      fieldContext={fieldContext}
      isGroupField={groupContext?.isGroupField}
    />
  );
};

export default WrapperField;
