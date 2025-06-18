export type OptionChangeHandler = (
  name: string,
  value: string | undefined,
) => void;

export type Options = Record<string, string>;
export type OptionsChangeHandler = (options: Options) => void;
