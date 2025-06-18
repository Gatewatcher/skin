export const splitStringHalf = (string: string) => {
  return string.length < 2
    ? [string]
    : [string.slice(0, string.length / 2), string.slice(string.length / 2)];
};
