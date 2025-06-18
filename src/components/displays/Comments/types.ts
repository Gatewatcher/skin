export type OnSubmitValues = Record<string, string>;

export type CommentOpenedThreads = Record<string, boolean>;
export type CommentUsername =
  | string
  | { value: string; colorGenerator?: string };
export type CommentOnSubmit = (message: string) => void | Promise<void>;
