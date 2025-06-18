import { FILE_EXTENSION_REGEXP } from './constants';

export const splitFilename = (filename: string) => {
  if (!filename) {
    return [filename, ''];
  }

  const match = filename.match(FILE_EXTENSION_REGEXP);

  if (!match) {
    return [filename, ''];
  }
  return [filename.replace(FILE_EXTENSION_REGEXP, ''), match[0]];
};
